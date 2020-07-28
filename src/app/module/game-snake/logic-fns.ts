import {not, PreFilter, process, processIf, processIn} from 'src/app/game';
import {fnAnd, fnCompose, fnKey, fnLift2, fnSame, fnSome, fnSum} from './fns';

const isZero = fnSame(0);

export interface Vector {
  x: number;
  y: number;
}

const vecX = fnKey<Vector>('x');
const vecY = fnKey<Vector>('y');

const isVecXZero = fnCompose(isZero, vecX);
const isVecYZero = fnCompose(isZero, vecY);

// @todo fns research

export const equalVectors = (aa: Vector) => (bb: Vector) => fnAnd(fnSame(vecX(aa))(vecX(bb)))(fnSame(vecY(aa))(vecY(bb)));
export const sumVectors = (aa: Vector) => (bb: Vector): Vector => ({x: fnSum(vecX(aa))(vecX(bb)), y: fnSum(vecY(aa))(vecY(bb))});
export const isZeroVector = fnLift2<Vector, boolean, boolean, boolean>(fnAnd)(isVecXZero)(isVecYZero);
export const includesVector = fnSome(equalVectors);

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

const getRandomFoodPosition = (state: Game): Vector => {
  const snake = state.scene.map.snake;
  let ii = Math.floor(Math.random() * (state.scene.map.width * state.scene.map.height - (snake ? snake.positions.length : 0)));
  let ret: Vector = {x: ii % state.scene.map.width, y: ii % state.scene.map.height};
  while (snake && includesVector(snake.positions)(ret)) {
    ii += 1;
    ret = {x: ii % state.scene.map.width, y: ii % state.scene.map.height};
  }
  return ret;
};

const getNewSnakeHeadPosition = (state: Game): Vector => {
  const snake = state.scene.map.snake;
  const newPos = sumVectors(snake.positions[0])(snake.direction);
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

const whenFood: PreFilter<Game> = (st) => !!st.scene.map.food;
const whenFoodInSnake: PreFilter<Game> = (st) => includesVector(st.scene.map.snake.positions)(st.scene.map.food.position);
const whenInputDirection: PreFilter<Game> = (st) => !!st.inputDirection;
const whenInputDirectionBackwards: PreFilter<Game> = (st) => isZeroVector(sumVectors(st.inputDirection)(st.scene.map.snake.direction));
const whenSnake: PreFilter<Game> = (st) => !!st.scene.map.snake;
const whenSnakeBigAsScreen: PreFilter<Game> = (st) => st.scene.map.snake.positions.length >= st.scene.map.height * st.scene.map.width;
const whenSnakeHeadInBody: PreFilter<Game> = (st) =>
  st.scene.map.snake.positions.some((ii, index) => index > 0 && equalVectors(ii)(st.scene.map.snake.positions[0]));

const whenGameIs = (gameState: GameState): PreFilter<Game> => (st) => fnSame(st.state)(gameState);
const whenGameIsPlay = whenGameIs('play');
const whenGameIsStart = whenGameIs('start');

const inGame = processIn<Game>();
const forFood = inGame((st) => st.scene.map.food);
const forInputDirection = inGame((st) => st.inputDirection);
const forSnake = inGame((st) => st.scene.map.snake);
const forSnakeInputDirection = inGame((st) => st.scene.map.snake.direction);
const forSnakePositions = inGame((st) => st.scene.map.snake.positions);
const forState = inGame((st) => st.state);

const redFoodClear = forFood(() => null);
const redFoodRandomize = forFood((st, top) => ({position: getRandomFoodPosition(top)}));
const redGameLost = forState(() => 'lost');
const redGameStartOrPlay = forState((st) => (st !== 'start' ? 'start' : 'play'));
const redGameWon = forState(() => 'won');
const redInputDirectionClear = forInputDirection(() => null);
const redInputDirectionToSnake = forSnakeInputDirection((st, top) => top.inputDirection);
const redSnakeInit = forSnake(() => initSnake());
const redSnakeHeadMove = forSnakePositions((st, top) => [getNewSnakeHeadPosition(top), ...st]);
const redSnakeTailCut = forSnakePositions((st) => st.slice(0, st.length - 1));

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
