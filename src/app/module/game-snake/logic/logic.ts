export interface Vector {
  x: number;
  y: number;
}

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

export interface Game {
  inputDirection?: Vector;
  scene: Scene;
  state: 'won' | 'lost' | 'start' | 'play';
}

type Processor<T> = (val: T) => T;

const process = <T>(...processors: Processor<T>[]): Processor<T> => (val: T) => processors.reduce((acc, processor) => processor(acc), val);

const initPreset = (from?: Partial<Preset>): Preset => ({
  height: 10,
  width: 15,
  ...(from || {}),
});

const initSnake = (): SnakeState => ({direction: {x: 1, y: 0}, positions: [{x: 0, y: 0}]});

const initMap = (from: Preset): Map => ({
  food: null,
  width: from.width,
  height: from.height,
  snake: initSnake(),
});

const initScene = (from: Preset): Scene => ({map: initMap(from)});

const equalVectors = (aa: Vector, bb: Vector) => aa.x === bb.x && aa.y === bb.y;
const sumVectors = (aa: Vector, bb: Vector): Vector => ({x: aa.x + bb.x, y: aa.y + bb.y});
const isNullVector = (vec: Vector) => vec.x === 0 && vec.y === 0;
const includesVector = (vecs: Vector[], vec: Vector) => vecs.some(ii => equalVectors(ii, vec));

const isEatingFood = (snake: SnakeState, food: Food) => includesVector(snake.positions, food.position);

const hasWon = (state: Game) =>
  state.scene.map.snake && state.scene.map.snake.positions.length >= state.scene.map.height * state.scene.map.width;

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
  !state.inputDirection ||
  state.state !== 'play' ||
  !state.scene.map.snake ||
  isNullVector(sumVectors(state.inputDirection, state.scene.map.snake.direction))
    ? state
    : {...state, scene: {...state.scene, map: {...state.scene.map, snake: {...state.scene.map.snake, direction: state.inputDirection}}}};

const redProcessInputDirectionToInit: Processor<Game> = state =>
  !state.inputDirection || state.state !== 'start'
    ? state
    : {...state, scene: {...state.scene, map: {...state.scene.map, snake: initSnake()}}};

const redProcessInputDirectionToWaitingState: Processor<Game> = state =>
  !state.inputDirection || state.state === 'play' ? state : {...state, state: state.state !== 'start' ? 'start' : 'play'};

const redProcessClearInputDirection: Processor<Game> = state => ({...state, inputDirection: null});

const redProcessInputDirection = process(
  redProcessInputDirectionToSnake,
  redProcessInputDirectionToInit,
  redProcessInputDirectionToWaitingState,
  redProcessClearInputDirection,
);

const redProcessFoodEat: Processor<Game> = state =>
  state.state !== 'play' || !state.scene.map.food || !state.scene.map.snake || !isEatingFood(state.scene.map.snake, state.scene.map.food)
    ? state
    : {...state, scene: {...state.scene, map: {...state.scene.map, food: null}}};

const redProcessFoodRandom: Processor<Game> = state =>
  state.state !== 'play' || state.scene.map.food || !state.scene.map.snake || hasWon(state)
    ? state
    : {...state, scene: {...state.scene, map: {...state.scene.map, food: {position: getRandomFoodPosition(state)}}}};

const redProcessFood = process(redProcessFoodEat, redProcessFoodRandom);

const redProcessSnakeMove: Processor<Game> = state =>
  state.state !== 'play' || !state.scene.map.snake
    ? state
    : {
        ...state,
        scene: {
          ...state.scene,
          map: {
            ...state.scene.map,
            snake: {...state.scene.map.snake, positions: [getNewSnakeHeadPosition(state), ...state.scene.map.snake.positions]},
          },
        },
      };

const redProcessSnakeSize: Processor<Game> = state =>
  state.state !== 'play' || !state.scene.map.snake || (state.scene.map.food && isEatingFood(state.scene.map.snake, state.scene.map.food))
    ? state
    : {
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
      };

const redProcessSnake = process(redProcessSnakeMove, redProcessSnakeSize);

const redProcessCheckLost: Processor<Game> = state =>
  state.state !== 'play' ||
  !state.scene.map.snake ||
  !state.scene.map.snake.positions.some((ii, index) => index > 0 && equalVectors(ii, state.scene.map.snake.positions[0]))
    ? state
    : {...state, state: 'lost'};

const redProcessCheckWon: Processor<Game> = state =>
  state.state !== 'play' || !state.scene.map.snake || !hasWon(state) ? state : {...state, state: 'won'};

const redProcessCheckGame = process(redProcessCheckLost, redProcessCheckWon);

export const redProcessFrame: Processor<Game> = state =>
  process(redProcessInputDirection, redProcessSnake, redProcessFood, redProcessCheckGame)(state);

export const initGame = (from?: Partial<Preset>): Game => ({inputDirection: null, scene: initScene(initPreset(from)), state: 'start'});

export const onInputDirection = (state: Game, inputDirection: Vector): Game => ({...state, inputDirection});
