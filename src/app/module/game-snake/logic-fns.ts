import {not, processIf} from 'src/app/game';
import {
  fnAddFirst,
  fnAnd,
  fnCompose,
  fnDefault,
  fnFirst,
  fnFlip,
  fnGte,
  fnHead,
  fnInvert,
  fnIs,
  fnLen,
  fnLift1,
  fnLift2,
  fnLift2to2,
  fnLift2x2,
  fnMerge,
  fnMod,
  fnMult,
  fnNot,
  fnPipe,
  fnRandomInt,
  fnSame,
  fnSome,
  fnSum,
  fnTail,
  fnThenElseIf,
  fnTIdentity,
  fnWhileDo,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from 'src/app/util/fns';

const increment = fnSum(1);

export interface Vector {
  x: number;
  y: number;
}

const vectorX = fnWrapKey<Vector, 'x'>('x');
const vectorY = fnWrapKey<Vector, 'y'>('y');

const getX = fnWrapGet(vectorX);
const getY = fnWrapGet(vectorY);

const setX = fnWrapSet(vectorX);
const setY = fnWrapSet(vectorY);

const makeVector = (x: number) => (y: number) => fnCompose(setX(x), setY(y))(null);
const vecZero = makeVector(0)(0);
const vecRight = makeVector(1)(0);

const isVecSameX = fnLift2to2(fnSame)(getX)(getX);
const isVecSameY = fnLift2to2(fnSame)(getY)(getY);

const sumVecX = fnLift2to2(fnSum)(getX)(getX);
const sumVecY = fnLift2to2(fnSum)(getY)(getY);

export const equalVectors = fnLift2x2(fnAnd)(isVecSameX)(isVecSameY);
export const sumVectors = fnLift2x2(makeVector)(sumVecX)(sumVecY);
export const isZeroVector = equalVectors(vecZero);
export const includesVector = fnSome(equalVectors);

export interface SnakeState {
  positions: Vector[];
  direction: Vector;
}

const wrapSnakeDirection = fnWrapKey<SnakeState, 'direction'>('direction');
const wrapSnakePositions = fnWrapKey<SnakeState, 'positions'>('positions');

const initSnake = fnMerge<SnakeState>({direction: vecRight, positions: [vecZero]});

export interface Food {
  position: Vector;
}

const wrapFoodPosition = fnWrapKey<Food, 'position'>('position');

export interface Map {
  food?: Food;
  height?: number;
  snake?: SnakeState;
  width?: number;
}

const wrapMapFood = fnWrapKey<Map, 'food'>('food');
const wrapMapHeight = fnWrapKey<Map, 'height'>('height');
const wrapMapSnake = fnWrapKey<Map, 'snake'>('snake');
const wrapMapWidth = fnWrapKey<Map, 'width'>('width');

const initMap = (from: Preset): Map => ({
  food: null,
  width: from.width,
  height: from.height,
  snake: initSnake(),
});

export interface Scene {
  map: Map;
}

const wrapSceneMap = fnWrapKey<Scene, 'map'>('map');

const initScene = (from: Preset): Scene => ({map: initMap(from)});

export interface Preset {
  height?: number;
  width?: number;
}

const initPreset = fnMerge<Preset>({height: 15, width: 15});

export type funcRender = (game: Game) => void;

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  inputDirection?: Vector;
  scene: Scene;
  state: GameState;
}

const gameInputDirection = fnWrapKey<Game, 'inputDirection'>('inputDirection');
const gameScene = fnWrapKey<Game, 'scene'>('scene');
const gameState = fnWrapKey<Game, 'state'>('state');

const gameSceneMap = fnWrapIn(gameScene)(wrapSceneMap);
const gameSceneMapFood = fnWrapIn(gameSceneMap)(wrapMapFood);
const gameSceneMapFoodPosition = fnWrapIn(gameSceneMapFood)(wrapFoodPosition);
const gameSceneMapHeight = fnWrapIn(gameSceneMap)(wrapMapHeight);
const gameSceneMapSnake = fnWrapIn(gameSceneMap)(wrapMapSnake);
const gameSceneMapSnakeDirection = fnWrapIn(gameSceneMapSnake)(wrapSnakeDirection);
const gameSceneMapSnakePositions = fnWrapIn(gameSceneMapSnake)(wrapSnakePositions);
const gameSceneMapWidth = fnWrapIn(gameSceneMap)(wrapMapWidth);

const getMap = fnWrapGet(gameSceneMap);
const getHeight = fnWrapGet(gameSceneMapHeight);
const getWidth = fnWrapGet(gameSceneMapWidth);
const getInputDirection = fnWrapGet(gameInputDirection);
const getFood = fnWrapGet(gameSceneMapFood);
const getFoodPosition = fnWrapGet(gameSceneMapFoodPosition);
const getSnake = fnWrapGet(gameSceneMapSnake);
const getSnakeDirection = fnWrapGet(gameSceneMapSnakeDirection);
const getSnakePositions = fnWrapGet(gameSceneMapSnakePositions);
const getSnakeHead = fnCompose(fnFirst, getSnakePositions);
const getSnakeTail = fnCompose(fnTail, getSnakePositions);
const getSnakeSize = fnCompose(fnDefault(0), fnLen, getSnakePositions);
const getSnakeNextPosition = fnLift2(sumVectors)(getSnakeHead)(getSnakeDirection);
const getState = fnWrapGet(gameState);

const getMapSize = fnLift2(fnMult)(getHeight)(getWidth);
const getMapFreeSpace = fnLift2(fnSum)(getMapSize)(fnCompose(fnInvert, getSnakeSize));
const getMapRandomFreeIndex = fnCompose(fnRandomInt, getMapFreeSpace);

const widthHeightIndexToVector = fnLift2to2(fnLift2(makeVector))(fnFlip(fnMod))(fnFlip(fnMod));

const getRandomFoodPosition = (st: Game): Vector => {
  const indexToVector: (index: number) => Vector = fnLift2(widthHeightIndexToVector)(getWidth)(getHeight)(st);
  const indexInSnake = fnCompose(includesVector(getSnakePositions(st)), indexToVector);
  return fnCompose(indexToVector, fnWhileDo(indexInSnake)(increment), getMapRandomFreeIndex)(st);
};

const getNewSnakeHeadPosition = (st: Game): Vector => {
  const newPos = getSnakeNextPosition(st);
  const map = getMap(st);
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

const moveSnakeHead = fnLift2<Vector[], Vector, Vector[]>(fnAddFirst)(getNewSnakeHeadPosition)(getSnakePositions);
const cutSnakeTail = fnCompose(fnHead, getSnakePositions);

const whenFood = fnCompose(fnIs, getFood);
const whenFoodInSnake = fnLift2(includesVector)(getSnakePositions)(getFoodPosition);
const whenInputDirection = fnCompose(fnIs, getInputDirection);
const whenInputDirectionBackwards = fnCompose(isZeroVector, fnLift2(sumVectors)(getInputDirection)(getSnakeDirection));
const whenSnake = fnCompose(fnIs, getSnake);
const whenSnakeBigAsScreen = fnLift2(fnGte)(getSnakeSize)(getMapSize);
const whenSnakeHeadInBody = fnLift2(fnSome(equalVectors))(getSnakeTail)(getSnakeHead);
const whenGameIs = fnLift2to2(fnSame)(fnTIdentity<GameState>())(getState);
const whenGameIsPlay = whenGameIs('play');
const whenGameIsStart = whenGameIs('start');

const getNextState = fnCompose(fnThenElseIf<GameState>('start')<GameState>('play'), fnNot, whenGameIsStart);

const reducerFood = fnWrapSet(gameSceneMapFood);
const reducerFoodPosition = fnWrapSet(gameSceneMapFoodPosition);
const reducerState = fnWrapSet(gameState);
const reducerInputDirection = fnWrapSet(gameInputDirection);
const reducerSnake = fnWrapSet(gameSceneMapSnake);
const reducerSnakeDirection = fnWrapSet(gameSceneMapSnakeDirection);
const reducerSnakePositions = fnWrapSet(gameSceneMapSnakePositions);

const redFoodClear = reducerFood(null);
const redFoodRandomize = fnLift1(reducerFoodPosition)(getRandomFoodPosition);
const redGameLost = reducerState('lost');
const redGameStartOrPlay = fnLift1(reducerState)(getNextState);
const redGameWon = reducerState('won');
const redInputDirectionClear = reducerInputDirection(null);
const redInputDirectionToSnake = fnLift1(reducerSnakeDirection)(getInputDirection);
const redSnakeInit = reducerSnake(initSnake());
const redSnakeHeadMove = fnLift1(reducerSnakePositions)(moveSnakeHead);
const redSnakeTailCut = fnLift1(reducerSnakePositions)(cutSnakeTail);

// @todo
const fnAndFns = <T = any>(...ands: ((arg: T) => boolean)[]) => (value: T): boolean => {
  for (const fn of ands) {
    if (!fn?.(value)) {
      return false;
    }
  }
  return true;
};

const processLoop = fnPipe(
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
