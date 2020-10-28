import {
  fnAddFirst,
  fnArr,
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
  fnMerge,
  fnMod,
  fnMult,
  fnNotFn,
  fnOrFns,
  fnProcess,
  fnProcessIf,
  fnRandomInt,
  fnSame,
  fnSome,
  fnSum,
  fnTail,
  fnTIdentity,
  fnWhileDo,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from 'src/app/util/fns';
import {equalVectors, includesVector, isZeroVector, makeVector, sumVectors, Vector, vecZero} from 'src/app/util/fns-vector';

const increment = fnSum(1);

const vecRight = makeVector(1)(0);

export interface SnakeState {
  direction: Vector;
  positions: Vector[];
}

const snakeDirection = fnWrapKey<SnakeState, 'direction'>('direction');
const setSnakeDirection = fnWrapSet(snakeDirection);

const snakePositions = fnWrapKey<SnakeState, 'positions'>('positions');
const setSnakePositions = fnWrapSet(snakePositions);

const makeSnake = (direction: Vector) => (positions: Vector[]) =>
  fnCompose(setSnakeDirection(direction), setSnakePositions(positions))(null);

const initSnake = fnMerge<SnakeState>(makeSnake(vecRight)(fnArr(vecZero)));

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

const mapFood = fnWrapKey<Map, 'food'>('food');
const mapHeight = fnWrapKey<Map, 'height'>('height');
const mapSnake = fnWrapKey<Map, 'snake'>('snake');
const mapWidth = fnWrapKey<Map, 'width'>('width');

const initMap = (from: Preset): Map => ({
  food: null,
  width: from.width,
  height: from.height,
  snake: initSnake(null),
});

export interface Scene {
  map: Map;
}

const sceneMap = fnWrapKey<Scene, 'map'>('map');

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

const gameSceneMap = fnWrapIn(gameScene)(sceneMap);
const gameSceneMapFood = fnWrapIn(gameSceneMap)(mapFood);
const gameSceneMapFoodPosition = fnWrapIn(gameSceneMapFood)(wrapFoodPosition);
const gameSceneMapHeight = fnWrapIn(gameSceneMap)(mapHeight);
const gameSceneMapSnake = fnWrapIn(gameSceneMap)(mapSnake);
const gameSceneMapSnakeDirection = fnWrapIn(gameSceneMapSnake)(snakeDirection);
const gameSceneMapSnakePositions = fnWrapIn(gameSceneMapSnake)(snakePositions);
const gameSceneMapWidth = fnWrapIn(gameSceneMap)(mapWidth);

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

const hasFood = fnCompose(fnIs, getFood);
const hasNoFood = fnNotFn(hasFood);
const isFoodInSnake = fnLift2(includesVector)(getSnakePositions)(getFoodPosition);
const isFoodNotInSnake = fnNotFn(isFoodInSnake);
const hasInputDirection = fnCompose(fnIs, getInputDirection);
const isMovingBackwards = fnCompose(isZeroVector, fnLift2(sumVectors)(getInputDirection)(getSnakeDirection));
const isMovingForwards = fnNotFn(isMovingBackwards);
const hasSnake = fnCompose(fnIs, getSnake);
const canSnakeNotGrow = fnLift2(fnGte)(getSnakeSize)(getMapSize);
const canSnakeGrow = fnNotFn(canSnakeNotGrow);
const isSnakeHeadInBody = fnLift2(fnSome(equalVectors))(getSnakeTail)(getSnakeHead);
const whenGameIs = fnLift2to2(fnSame)(fnTIdentity<GameState>())(getState);
const isPlaying = whenGameIs('play');
const isStarting = whenGameIs('start');
const isLost = whenGameIs('lost');
const isWon = whenGameIs('won');

const redFood = fnWrapSet(gameSceneMapFood);
const redFoodPosition = fnWrapSet(gameSceneMapFoodPosition);
const redState = fnWrapSet(gameState);
const redInputDirection = fnWrapSet(gameInputDirection);
const redSnake = fnWrapSet(gameSceneMapSnake);
const redSnakeDirection = fnWrapSet(gameSceneMapSnakeDirection);
const redSnakePositions = fnWrapSet(gameSceneMapSnakePositions);

const clearFood = redFood(null);
const addFood = fnLift1(redFoodPosition)(getRandomFoodPosition);
const loseGame = redState('lost');
const startGame = redState('start');
const playGame = redState('play');
const winGame = redState('won');
const clearInput = redInputDirection(null);
const inputToSnake = fnLift1(redSnakeDirection)(getInputDirection);
const addSnake = redSnake(initSnake(null));
const moveSnake = fnLift1(redSnakePositions)(moveSnakeHead);
const cutTail = fnLift1(redSnakePositions)(cutSnakeTail);

const just = fnProcess;
const doIf = fnProcessIf;
const or = fnOrFns;

const loop = just(
  doIf(hasInputDirection)(
    doIf(isPlaying, hasSnake, isMovingForwards)(inputToSnake),
    doIf(isStarting)(playGame),
    doIf(or(isLost, isWon))(addSnake, clearFood, startGame),
    clearInput,
  ),
  doIf(isPlaying, hasSnake)(
    moveSnake,
    doIf(isFoodNotInSnake)(cutTail),
    doIf(hasFood, isFoodInSnake)(clearFood),
    doIf(hasNoFood, canSnakeGrow)(addFood),
    doIf(isSnakeHeadInBody)(loseGame),
    doIf(canSnakeNotGrow)(winGame),
  ),
);

export const initGame = (from?: Preset): Game => ({inputDirection: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = loop;
export const onInputDirection = (state: Game, inputDirection: Vector): Game => ({...state, inputDirection});
