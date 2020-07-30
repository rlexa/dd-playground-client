import {not, process, processIf, processIn} from 'src/app/game';
import {
  fnAnd,
  fnCompose,
  fnDefault,
  fnFirst,
  fnGte,
  fnInvert,
  fnIs,
  fnKey,
  fnLift2,
  fnLift2to2,
  fnLift2x2,
  fnMerge,
  fnMult,
  fnPipe,
  fnRandomInt,
  fnSame,
  fnSome,
  fnSum,
  fnTail,
  fnTIdentity,
  fnTKey,
  fnMod,
  fnFlip,
} from './fns';

const isZero = fnSame(0);
const increment = fnSum(1);

export interface Vector {
  x: number;
  y: number;
}

const makeVector = (x: number) => (y: number) => ({x, y} as Vector);
const vecZero = makeVector(0)(0);
const vecDown = makeVector(0)(1);
const vecLeft = makeVector(-1)(0);
const vecRight = makeVector(1)(0);
const vecUp = makeVector(0)(-1);

const vectorKey = fnTKey<Vector>();
const vecX = vectorKey('x');
const vecY = vectorKey('y');

const isVecSameX = fnLift2to2(fnSame)(vecX)(vecX);
const isVecSameY = fnLift2to2(fnSame)(vecY)(vecY);

const sumVecX = fnLift2to2(fnSum)(vecX)(vecX);
const sumVecY = fnLift2to2(fnSum)(vecY)(vecY);

// @todo fns research

export const equalVectors = fnLift2x2(fnAnd)(isVecSameX)(isVecSameY);
export const sumVectors = fnLift2x2(makeVector)(sumVecX)(sumVecY);
export const isZeroVector = equalVectors(vecZero);
export const includesVector = fnSome(equalVectors);

export interface SnakeState {
  positions: Vector[];
  direction: Vector;
}

const snakeKey = fnTKey<SnakeState>();
const initSnake = fnMerge<SnakeState>({direction: vecRight, positions: [vecZero]});

export interface Food {
  position: Vector;
}

const foodKey = fnTKey<Food>();

export interface Map {
  food?: Food;
  height?: number;
  snake?: SnakeState;
  width?: number;
}

const mapKey = fnTKey<Map>();

const initMap = (from: Preset): Map => ({
  food: null,
  width: from.width,
  height: from.height,
  snake: initSnake(),
});

export interface Scene {
  map: Map;
}

const sceneKey = fnTKey<Scene>();

const initScene = (from: Preset): Scene => ({map: initMap(from)});

export interface Preset {
  height?: number;
  width?: number;
}

const presetKey = fnTKey<Preset>();
const initPreset = fnMerge<Preset>({height: 15, width: 15});

export type funcRender = (game: Game) => void;

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  inputDirection?: Vector;
  scene: Scene;
  state: GameState;
}

const gameKey = fnTKey<Game>();

const gameMap = fnPipe(gameKey('scene'), fnKey('map'));
const gameHeight = fnPipe(gameMap, fnKey('height'));
const gameWidth = fnPipe(gameMap, fnKey('width'));
const gameInputDirection = fnPipe(gameKey('inputDirection'));
const gameFood = fnPipe(gameMap, fnKey('food'));
const gameFoodPosition = fnPipe(gameFood, fnKey('position'));
const gameSnake = fnPipe(gameMap, fnKey('snake'));
const gameSnakeDirection = fnPipe(gameSnake, fnKey('direction'));
const gameSnakePositions = fnPipe(gameSnake, fnKey('positions'));
const gameSnakeFirst = fnPipe(gameSnakePositions, fnFirst);
const gameSnakeTail = fnPipe(gameSnakePositions, fnTail);
const gameSnakeSize = fnPipe(gameSnakePositions, fnKey('length'), fnDefault(0));
const gameState = fnPipe(gameKey('state'));

const gameMapSize = fnLift2(fnMult)(gameHeight)(gameWidth);
const gameMapFreeSpace = fnLift2(fnSum)(gameMapSize)(fnCompose(fnInvert, gameSnakeSize));
const gameMapRandomFreeIndex = fnCompose(fnRandomInt, gameMapFreeSpace);

const widthHeightIndexToVector = fnLift2to2(fnLift2(makeVector))(fnFlip(fnMod))(fnFlip(fnMod));

const getRandomFoodPosition = (st: Game): Vector => {
  const snake = gameSnake(st);
  const height = gameHeight(st);
  const width = gameWidth(st);
  const indexToVector = widthHeightIndexToVector(width)(height);
  let ii = gameMapRandomFreeIndex(st);
  let ret = indexToVector(ii);
  while (includesVector(snake.positions)(ret)) {
    ii = increment(ii);
    ret = indexToVector(ii);
  }
  return ret;
};

const getNewSnakeHeadPosition = (state: Game): Vector => {
  const snake = gameSnake(state);
  const newPos = sumVectors(snake.positions[0])(snake.direction);
  const map = gameMap(state);
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

const whenFood = fnCompose(fnIs, gameFood);
const whenFoodInSnake = fnLift2(includesVector)(gameSnakePositions)(gameFoodPosition);
const whenInputDirection = fnCompose(fnIs, gameInputDirection);
const whenInputDirectionBackwards = fnCompose(isZeroVector, fnLift2(sumVectors)(gameInputDirection)(gameSnakeDirection));
const whenSnake = fnCompose(fnIs, gameSnake);
const whenSnakeBigAsScreen = fnLift2(fnGte)(gameSnakeSize)(gameMapSize);
const whenSnakeHeadInBody = fnLift2(fnSome(equalVectors))(gameSnakeTail)(gameSnakeFirst);
const whenGameIs = fnLift2to2(fnSame)(fnTIdentity<GameState>())(gameState);
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

export const initGame = (from?: Preset): Game => ({inputDirection: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = processLoop;
export const onInputDirection = (state: Game, inputDirection: Vector): Game => ({...state, inputDirection});
