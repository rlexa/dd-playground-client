import {not, process, processIf} from 'src/app/game';
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
  fnRandomInt,
  fnSame,
  fnSome,
  fnSum,
  fnTail,
  fnThenElseIf,
  fnTIdentity,
  fnTKey,
  fnWhileDo,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from 'src/app/util/fns';

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

const presetKey = fnTKey<Preset>();
const initPreset = fnMerge<Preset>({height: 15, width: 15});

export type funcRender = (game: Game) => void;

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  inputDirection?: Vector;
  scene: Scene;
  state: GameState;
}

const wrapGameInputDirection = fnWrapKey<Game, 'inputDirection'>('inputDirection');
const wrapGameScene = fnWrapKey<Game, 'scene'>('scene');
const wrapGameState = fnWrapKey<Game, 'state'>('state');

const wrapGameSceneMap = fnWrapIn(wrapGameScene)(wrapSceneMap);
const wrapGameSceneMapFood = fnWrapIn(wrapGameSceneMap)(wrapMapFood);
const wrapGameSceneMapFoodPosition = fnWrapIn(wrapGameSceneMapFood)(wrapFoodPosition);
const wrapGameSceneMapHeight = fnWrapIn(wrapGameSceneMap)(wrapMapHeight);
const wrapGameSceneMapSnake = fnWrapIn(wrapGameSceneMap)(wrapMapSnake);
const wrapGameSceneMapSnakeDirection = fnWrapIn(wrapGameSceneMapSnake)(wrapSnakeDirection);
const wrapGameSceneMapSnakePositions = fnWrapIn(wrapGameSceneMapSnake)(wrapSnakePositions);
const wrapGameSceneMapWidth = fnWrapIn(wrapGameSceneMap)(wrapMapWidth);

const gameMap = fnWrapGet(wrapGameSceneMap);
const gameHeight = fnWrapGet(wrapGameSceneMapHeight);
const gameWidth = fnWrapGet(wrapGameSceneMapWidth);
const gameInputDirection = fnWrapGet(wrapGameInputDirection);
const gameFood = fnWrapGet(wrapGameSceneMapFood);
const gameFoodPosition = fnWrapGet(wrapGameSceneMapFoodPosition);
const gameSnake = fnWrapGet(wrapGameSceneMapSnake);
const gameSnakeDirection = fnWrapGet(wrapGameSceneMapSnakeDirection);
const gameSnakePositions = fnWrapGet(wrapGameSceneMapSnakePositions);
const gameSnakeFirst = fnCompose(fnFirst, gameSnakePositions);
const gameSnakeTail = fnCompose(fnTail, gameSnakePositions);
const gameSnakeSize = fnCompose(fnDefault(0), fnLen, gameSnakePositions);
const gameSnakeNextPosition = fnLift2(sumVectors)(gameSnakeFirst)(gameSnakeDirection);
const gameState = fnWrapGet(wrapGameState);

const gameMapSize = fnLift2(fnMult)(gameHeight)(gameWidth);
const gameMapFreeSpace = fnLift2(fnSum)(gameMapSize)(fnCompose(fnInvert, gameSnakeSize));
const gameMapRandomFreeIndex = fnCompose(fnRandomInt, gameMapFreeSpace);

const widthHeightIndexToVector = fnLift2to2(fnLift2(makeVector))(fnFlip(fnMod))(fnFlip(fnMod));

const getRandomFoodPosition = (st: Game): Vector => {
  const indexToVector: (index: number) => Vector = fnLift2(widthHeightIndexToVector)(gameWidth)(gameHeight)(st);
  const indexInSnake = fnCompose(includesVector(gameSnakePositions(st)), indexToVector);
  return fnCompose(indexToVector, fnWhileDo(indexInSnake)(increment), gameMapRandomFreeIndex)(st);
};

const getNewSnakeHeadPosition = (st: Game): Vector => {
  const newPos = gameSnakeNextPosition(st);
  const map = gameMap(st);
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

const moveSnakeHead = fnLift2<Vector[], Vector, Vector[]>(fnAddFirst)(getNewSnakeHeadPosition)(gameSnakePositions);
const cutSnakeTail = fnCompose(fnHead, gameSnakePositions);

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

const getNextState = fnCompose(fnThenElseIf<GameState>('start')<GameState>('play'), fnNot, whenGameIsStart);

const reducerFood = fnWrapSet(wrapGameSceneMapFood);
const reducerFoodPosition = fnWrapSet(wrapGameSceneMapFoodPosition);
const reducerState = fnWrapSet(wrapGameState);
const reducerInputDirection = fnWrapSet(wrapGameInputDirection);
const reducerSnake = fnWrapSet(wrapGameSceneMapSnake);
const reducerSnakeDirection = fnWrapSet(wrapGameSceneMapSnakeDirection);
const reducerSnakePositions = fnWrapSet(wrapGameSceneMapSnakePositions);

const redFoodClear = reducerFood(null);
const redFoodRandomize = fnLift1(reducerFoodPosition)(getRandomFoodPosition);
const redGameLost = reducerState('lost');
const redGameStartOrPlay = fnLift1(reducerState)(getNextState);
const redGameWon = reducerState('won');
const redInputDirectionClear = reducerInputDirection(null);
const redInputDirectionToSnake = fnLift1(reducerSnakeDirection)(gameInputDirection);
const redSnakeInit = reducerSnake(initSnake());
const redSnakeHeadMove = fnLift1(reducerSnakePositions)(moveSnakeHead);
const redSnakeTailCut = fnLift1(reducerSnakePositions)(cutSnakeTail);

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
