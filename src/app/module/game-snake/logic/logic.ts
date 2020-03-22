export type Processor<T> = (val: T) => T;
/** Chain processing (B works on result of A) */
export const process = <T>(...processors: Processor<T>[]): Processor<T> => (val: T) =>
  processors.reduce((acc, processor) => processor(acc), val);

const checkIfAnds = <T>(val: T, ...ifAnds: PreFilter<T>[]) => ifAnds.reduce((acc, ifThen) => (acc ? ifThen(val) : acc), true);

export type PreFilter<T> = (val: T) => boolean;
/** AND logic. */
export const processIf = <T>(...ifAnds: PreFilter<T>[]) => (...processors: Processor<T>[]): Processor<T> => (val: T) =>
  checkIfAnds(val, ...ifAnds) ? process(...processors)(val) : val;

/** OR logic. */
export const not = <T>(...ifAnds: PreFilter<T>[]): PreFilter<T> => (val: T) => !checkIfAnds(val, ...ifAnds);

export interface Vector {
  x: number;
  y: number;
}

const equalVectors = (aa: Vector, bb: Vector) => aa.x === bb.x && aa.y === bb.y;
const sumVectors = (aa: Vector, bb: Vector): Vector => ({x: aa.x + bb.x, y: aa.y + bb.y});
const isZeroVector = (vec: Vector) => vec.x === 0 && vec.y === 0;
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

const whenFood: PreFilter<Game> = st => !!st.scene.map.food;
const whenFoodInSnake: PreFilter<Game> = st => includesVector(st.scene.map.snake.positions, st.scene.map.food.position);
const whenInputDirection: PreFilter<Game> = st => !!st.inputDirection;
const whenInputDirectionBackwards: PreFilter<Game> = st => isZeroVector(sumVectors(st.inputDirection, st.scene.map.snake.direction));
const whenSnake: PreFilter<Game> = st => !!st.scene.map.snake;
const whenSnakeBigAsScreen: PreFilter<Game> = st => st.scene.map.snake.positions.length >= st.scene.map.height * st.scene.map.width;
const whenSnakeHeadInBody: PreFilter<Game> = st =>
  st.scene.map.snake.positions.some((ii, index) => index > 0 && equalVectors(ii, st.scene.map.snake.positions[0]));

const whenGameIs = (gameState: GameState): PreFilter<Game> => st => st.state === gameState;
const whenGameIsPlay = whenGameIs('play');
const whenGameIsStart = whenGameIs('start');

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

const redFoodClear: Processor<Game> = state => ({...state, scene: {...state.scene, map: {...state.scene.map, food: null}}});
const redFoodRandomize: Processor<Game> = state => ({
  ...state,
  scene: {...state.scene, map: {...state.scene.map, food: {position: getRandomFoodPosition(state)}}},
});
const redGameLost: Processor<Game> = state => ({...state, state: 'lost'});
const redGameStartOrPlay: Processor<Game> = state => ({...state, state: state.state !== 'start' ? 'start' : 'play'});
const redGameWon: Processor<Game> = state => ({...state, state: 'won'});
const redInputDirectionClear: Processor<Game> = state => ({...state, inputDirection: null});
const redInputDirectionToSnake: Processor<Game> = state => ({
  ...state,
  scene: {...state.scene, map: {...state.scene.map, snake: {...state.scene.map.snake, direction: state.inputDirection}}},
});
const redSnakeHeadMove: Processor<Game> = state => ({
  ...state,
  scene: {
    ...state.scene,
    map: {
      ...state.scene.map,
      snake: {...state.scene.map.snake, positions: [getNewSnakeHeadPosition(state), ...state.scene.map.snake.positions]},
    },
  },
});
const redSnakeInit: Processor<Game> = state => ({...state, scene: {...state.scene, map: {...state.scene.map, snake: initSnake()}}});
const redSnakeTailCut: Processor<Game> = state => ({
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

const processLoop = process(
  processIf(whenInputDirection)(
    processIf(whenGameIsPlay, whenSnake, not(whenInputDirectionBackwards))(redInputDirectionToSnake),
    processIf(whenGameIsStart)(redSnakeInit),
    processIf(not(whenGameIsPlay))(redGameStartOrPlay),
    redInputDirectionClear,
  ),
  processIf(whenGameIsPlay, whenSnake)(
    redSnakeHeadMove,
    processIf(not(whenFood, whenFoodInSnake))(redSnakeTailCut),
    processIf(whenFood, whenFoodInSnake)(redFoodClear),
    processIf(not(whenFood), not(whenSnakeBigAsScreen))(redFoodRandomize),
    processIf(whenSnakeHeadInBody)(redGameLost),
    processIf(whenSnakeBigAsScreen)(redGameWon),
  ),
);

export const initGame = (from?: Partial<Preset>): Game => ({inputDirection: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = processLoop;
export const onInputDirection = (state: Game, inputDirection: Vector): Game => ({...state, inputDirection});
