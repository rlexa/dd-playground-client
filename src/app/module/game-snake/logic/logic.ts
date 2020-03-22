export type Processor<T> = (val: T) => T;
export const process = <T>(...processors: Processor<T>[]): Processor<T> => (val: T) =>
  processors.reduce((acc, processor) => processor(acc), val);

export type PreFilter<T> = (val: T) => boolean;
export const processIf = <T>(...ifAnds: PreFilter<T>[]) => (...processors: Processor<T>[]): Processor<T> => (val: T) =>
  ifAnds.reduce((acc, ifThen) => (acc ? ifThen(val) : acc), true) ? process(...processors)(val) : val;
export const not = <T>(ifAnd: PreFilter<T>): PreFilter<T> => (val: T) => !ifAnd(val);

export interface Vector {
  x: number;
  y: number;
}

const equalVectors = (aa: Vector, bb: Vector) => aa.x === bb.x && aa.y === bb.y;
const sumVectors = (aa: Vector, bb: Vector): Vector => ({x: aa.x + bb.x, y: aa.y + bb.y});
const isNullVector = (vec: Vector) => vec.x === 0 && vec.y === 0;
const includesVector = (vecs: Vector[], vec: Vector) => vecs.some(ii => equalVectors(ii, vec));

export interface SnakeState {
  positions: Vector[];
  direction: Vector;
}

export interface Food {
  position: Vector;
}

export interface Map {
  food?: Food;
  height: number;
  snake?: SnakeState;
  width: number;
}

export interface Scene {
  map: Map;
}

export interface Preset {
  height: number;
  width: number;
}

export type funcRender = (game: Game) => void;

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  inputDirection?: Vector;
  scene: Scene;
  state: GameState;
}

const initPreset = (from?: Partial<Preset>): Preset => ({height: 15, width: 15, ...(from || {})});

const initSnake = (): SnakeState => ({direction: {x: 1, y: 0}, positions: [{x: 0, y: 0}]});

const initMap = (from: Preset): Map => ({
  food: null,
  width: from.width,
  height: from.height,
  snake: initSnake(),
});

const initScene = (from: Preset): Scene => ({map: initMap(from)});

const whenHasFood: PreFilter<Game> = st => !!st.scene.map.food;
const whenHasInputDirection: PreFilter<Game> = st => !!st.inputDirection;
const whenHasSnake: PreFilter<Game> = st => !!st.scene.map.snake;
const whenWinning: PreFilter<Game> = st => st.scene.map.snake.positions.length >= st.scene.map.height * st.scene.map.width;

const whenInState = (gameState: GameState): PreFilter<Game> => st => st.state === gameState;

const whenFoodInSnake: PreFilter<Game> = st =>
  whenHasFood(st) && whenHasSnake(st) && includesVector(st.scene.map.snake.positions, st.scene.map.food.position);

const getRandomFoodPosition = (state: Game): Vector => {
  const snake = state.scene.map.snake;
  let ii = Math.floor(Math.random() * (state.scene.map.width * state.scene.map.height - (snake ? snake.positions.length : 0)));
  let ret: Vector = {x: ii % state.scene.map.width, y: ii % state.scene.map.height};
  while (snake && includesVector(snake.positions, ret)) {
    ii += 1;
    ret = {x: ii % state.scene.map.width, y: ii % state.scene.map.height};
  }
  return ret;
};

const getNewSnakeHeadPosition = (state: Game): Vector => {
  const snake = state.scene.map.snake;
  const newPos = sumVectors(snake.positions[0], snake.direction);
  const map = state.scene.map;
  if (newPos.x < 0) {
    newPos.x += map.width;
  } else if (newPos.x >= map.width) {
    newPos.x %= map.width;
  }
  if (newPos.y < 0) {
    newPos.y += map.height;
  } else if (newPos.y >= map.height) {
    newPos.y %= map.height;
  }

  return newPos;
};

const redProcessInputDirectionToSnake: Processor<Game> = state =>
  isNullVector(sumVectors(state.inputDirection, state.scene.map.snake.direction))
    ? state
    : {...state, scene: {...state.scene, map: {...state.scene.map, snake: {...state.scene.map.snake, direction: state.inputDirection}}}};

const redSnakeInit: Processor<Game> = state => ({
  ...state,
  scene: {...state.scene, map: {...state.scene.map, snake: initSnake()}},
});

const redProcessInputDirectionToWaitingState: Processor<Game> = state => ({...state, state: state.state !== 'start' ? 'start' : 'play'});

const redInputDirectionClear: Processor<Game> = state => ({...state, inputDirection: null});

const redProcessInputDirection = process(
  processIf(whenHasInputDirection)(
    processIf(whenInState('play'), whenHasSnake)(redProcessInputDirectionToSnake),
    processIf(whenInState('start'))(redSnakeInit),
    processIf(not(whenInState('play')))(redProcessInputDirectionToWaitingState),
  ),
  redInputDirectionClear,
);

const redFoodClear: Processor<Game> = state => ({...state, scene: {...state.scene, map: {...state.scene.map, food: null}}});

const redFoodRandomize: Processor<Game> = state => ({
  ...state,
  scene: {...state.scene, map: {...state.scene.map, food: {position: getRandomFoodPosition(state)}}},
});

const redProcessFood = processIf(whenInState('play'), whenHasSnake)(
  processIf(whenFoodInSnake)(redFoodClear),
  processIf(not(whenHasFood), not(whenWinning))(redFoodRandomize),
);

const redSnakeMoveHead: Processor<Game> = state => ({
  ...state,
  scene: {
    ...state.scene,
    map: {
      ...state.scene.map,
      snake: {...state.scene.map.snake, positions: [getNewSnakeHeadPosition(state), ...state.scene.map.snake.positions]},
    },
  },
});

const redSnakeCutTail: Processor<Game> = state => ({
  ...state,
  scene: {
    ...state.scene,
    map: {
      ...state.scene.map,
      snake: {
        ...state.scene.map.snake,
        positions: state.scene.map.snake.positions.slice(0, state.scene.map.snake.positions.length - 1),
      },
    },
  },
});

const redProcessSnake = processIf(whenInState('play'), whenHasSnake)(redSnakeMoveHead, processIf(not(whenFoodInSnake))(redSnakeCutTail));

const redProcessCheckLost: Processor<Game> = state =>
  !state.scene.map.snake.positions.some((ii, index) => index > 0 && equalVectors(ii, state.scene.map.snake.positions[0]))
    ? state
    : {...state, state: 'lost'};

const redStateWon: Processor<Game> = state => ({...state, state: 'won'});

const redProcessCheckGame = processIf(whenInState('play'), whenHasSnake)(redProcessCheckLost, processIf(whenWinning)(redStateWon));

export const redProcessFrame: Processor<Game> = state =>
  process(redProcessInputDirection, redProcessSnake, redProcessFood, redProcessCheckGame)(state);

export const initGame = (from?: Partial<Preset>): Game => ({inputDirection: null, scene: initScene(initPreset(from)), state: 'start'});

export const onInputDirection = (state: Game, inputDirection: Vector): Game => ({...state, inputDirection});
