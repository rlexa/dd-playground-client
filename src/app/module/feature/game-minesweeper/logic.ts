import {
  fnAddLast,
  fnCompose,
  fnFilter,
  fnFlip,
  fnIsFn,
  fnLen,
  fnLift1,
  fnLift2,
  fnLift2to2,
  fnLift3,
  fnLift6,
  fnMult,
  fnNotFn,
  fnProcess,
  fnProcessIf,
  fnSame,
  fnSub,
  fnTIdentity,
  fnWrapGet,
  fnWrapIn,
  fnWrapKey,
  fnWrapSet,
} from 'src/app/util/fns';
import {equalVectors, includesVector, Vector} from 'src/app/util/fns-vector';

const toggleVector = (vectors: Vector[]) => (vector: Vector) =>
  includesVector(vectors)(vector) ? fnFilter(fnNotFn(equalVectors(vector)))(vectors) : fnAddLast(vector)(vectors);

function getNeighbourVectorsStraight(vec: Vector, width: number, height: number): Vector[] {
  return [
    {x: vec.x, y: vec.y - 1},
    {x: vec.x - 1, y: vec.y},
    {x: vec.x + 1, y: vec.y},
    {x: vec.x, y: vec.y + 1},
  ].filter((ii) => ii.x >= 0 && ii.x <= width - 1 && ii.y >= 0 && ii.y <= height - 1);
}

export function getNeighbourVectorsAround(vec: Vector, width: number, height: number): Vector[] {
  return [
    {x: vec.x - 1, y: vec.y - 1},
    {x: vec.x, y: vec.y - 1},
    {x: vec.x + 1, y: vec.y - 1},
    {x: vec.x - 1, y: vec.y},
    {x: vec.x + 1, y: vec.y},
    {x: vec.x - 1, y: vec.y + 1},
    {x: vec.x, y: vec.y + 1},
    {x: vec.x + 1, y: vec.y + 1},
  ].filter((ii) => ii.x >= 0 && ii.x <= width - 1 && ii.y >= 0 && ii.y <= height - 1);
}

export interface ClickVector extends Vector {
  alt?: boolean;
}

const clickVectorAlt = fnWrapKey<ClickVector, 'alt'>('alt');

export interface Map {
  height: number;
  mines: number;
  width: number;
}

const mapHeight = fnWrapKey<Map, 'height'>('height');
const mapMines = fnWrapKey<Map, 'mines'>('mines');
const mapWidth = fnWrapKey<Map, 'width'>('width');

export interface Scene {
  clear: Vector[];
  flags: Vector[];
  input?: ClickVector;
  map: Map;
  mines?: Vector[];
}

const sceneClear = fnWrapKey<Scene, 'clear'>('clear');
const sceneFlags = fnWrapKey<Scene, 'flags'>('flags');
const sceneInput = fnWrapKey<Scene, 'input'>('input');
const sceneMap = fnWrapKey<Scene, 'map'>('map');
const sceneMines = fnWrapKey<Scene, 'mines'>('mines');

export interface Preset {
  height: number;
  mines: number;
  width: number;
}

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  input?: ClickVector;
  scene: Scene;
  state: GameState;
}

const gameScene = fnWrapKey<Game, 'scene'>('scene');
const gameInput = fnWrapKey<Game, 'input'>('input');
const gameState = fnWrapKey<Game, 'state'>('state');

const initPreset = (from?: Partial<Preset>): Preset => ({height: 15, width: 15, mines: 8, ...(from || {})});

const initMap = (from: Preset): Map => ({
  height: from.height,
  mines: from.mines,
  width: from.width,
});

const initScene = (from: Preset): Scene => ({clear: [], flags: [], input: null, map: initMap(from), mines: null});

const randomizeMines = (count: number) => (width: number) => (height: number): Vector[] => {
  const mines = Array.from(new Array(count), (_, index) => null);
  const positions = Array.from(new Array(width * height), (_, index) => ({x: index % width, y: Math.floor(index / width)} as Vector));
  mines.forEach((_, index) => {
    const rndIndex = Math.floor(Math.random() * positions.length);
    mines[index] = positions[rndIndex];
    positions.splice(rndIndex, 1);
  });
  return mines;
};

const clearField = (field: Vector) => (clear: Vector[]) => (flags: Vector[]) => (mines: Vector[]) => (width: number) => (
  height: number,
): Vector[] => {
  if (includesVector(clear)(field) || includesVector(flags)(field) || includesVector(mines)(field)) {
    return clear;
  }
  clear = [...clear, field];

  const neighbours = getNeighbourVectorsStraight(field, width, height);

  if (neighbours.every((vec) => !includesVector(flags)(vec) && !includesVector(mines)(vec))) {
    if (field.x > 0) {
      return clearField({x: field.x - 1, y: field.y})(clear)(flags)(mines)(width)(height);
    }
    if (field.x < width - 1) {
      return clearField({x: field.x + 1, y: field.y})(clear)(flags)(mines)(width)(height);
    }
    if (field.y > 0) {
      return clearField({y: field.y - 1, x: field.x})(clear)(flags)(mines)(width)(height);
    }
    if (field.y < height - 1) {
      return clearField({y: field.y + 1, x: field.x})(clear)(flags)(mines)(width)(height);
    }
  }
  return clear;
};

const gameSceneClear = fnWrapIn(gameScene)(sceneClear);
const gameSceneFlags = fnWrapIn(gameScene)(sceneFlags);
const gameSceneMap = fnWrapIn(gameScene)(sceneMap);
const gameSceneMapHeight = fnWrapIn(gameSceneMap)(mapHeight);
const gameSceneMapMines = fnWrapIn(gameSceneMap)(mapMines);
const gameSceneMapWidth = fnWrapIn(gameSceneMap)(mapWidth);
const gameSceneMines = fnWrapIn(gameScene)(sceneMines);
const gameSceneInput = fnWrapIn(gameScene)(sceneInput);
const gameSceneInputAlt = fnWrapIn(gameSceneInput)(clickVectorAlt);

const getClears = fnWrapGet(gameSceneClear);
const getFlags = fnWrapGet(gameSceneFlags);
const getHeight = fnWrapGet(gameSceneMapHeight);
const getInputAlt = fnWrapGet(gameSceneInputAlt);
const getInput = fnWrapGet(gameSceneInput);
const getMines = fnWrapGet(gameSceneMines);
const getMinesCount = fnWrapGet(gameSceneMapMines);
const getPlayerInput = fnWrapGet(gameInput);
const getState = fnWrapGet(gameState);
const getWidth = fnWrapGet(gameSceneMapWidth);

const getArea = fnLift2(fnMult)(getWidth)(getHeight);
const getFreeArea = fnLift2(fnSub)(getArea)(getMinesCount);
const getClearsCount = fnCompose(fnLen, getClears);

const calculateNewMines = fnLift3(randomizeMines)(getMinesCount)(getWidth)(getHeight);
const calculateNewClearsOnClick = fnLift6(clearField)(getInput)(getClears)(getFlags)(getMines)(getWidth)(getHeight);
const calculateNewFlagsOnClick = fnLift2(toggleVector)(getFlags)(getInput);

const clearedEverything = fnLift2(fnSame)(getClearsCount)(getFreeArea);
const clickedWithAlt = fnIsFn(getInputAlt);
const clickedNormally = fnNotFn(clickedWithAlt);
const hasInput = fnIsFn(getInput);
const hasMines = fnIsFn(getMines);
const hasNoMines = fnNotFn(hasMines);
const hasPlayerInput = fnIsFn(getPlayerInput);

const whenClickedOn = fnLift2(fnFlip(includesVector))(getInput);
const clickedClear = whenClickedOn(getClears);
const clickedFlag = whenClickedOn(getFlags);
const clickedMine = whenClickedOn(getMines);
const clickedNotClear = fnNotFn(clickedClear);
const clickedNotFlag = fnNotFn(clickedFlag);
const clickedNotMine = fnNotFn(clickedMine);

const whenGameIs = fnLift2to2(fnSame)(fnTIdentity<GameState>())(getState);
const isPlaying = whenGameIs('play');
const isNotPlaying = fnNotFn(isPlaying);
const isStarting = whenGameIs('start');
const isNotStarting = fnNotFn(isStarting);

const redClears = fnWrapSet(gameSceneClear);
const redFlags = fnWrapSet(gameSceneFlags);
const redInput = fnWrapSet(gameSceneInput);
const redMines = fnWrapSet(gameSceneMines);
const redPlayerInput = fnWrapSet(gameInput);
const redState = fnWrapSet(gameState);

// PROCESSORS

const startGame = redState('start');
const playGame = redState('play');
const winGame = redState('won');
const loseGame = redState('lost');

const clearInput = redInput(null);
const clearPlayerInput = redPlayerInput(null);
const inputToScene = fnLift1(redInput)(getPlayerInput);

const clearClears = redClears([]);
const openClears = fnLift1(redClears)(calculateNewClearsOnClick);
const clearFlags = redFlags([]);
const toggleFlag = fnLift1(redFlags)(calculateNewFlagsOnClick);
const clearMines = redMines(null);
const addMines = fnLift1(redMines)(calculateNewMines);

const just = fnProcess;
const doIf = fnProcessIf;

const loop = just(
  doIf(hasPlayerInput)(
    doIf(isPlaying, hasMines)(inputToScene),
    doIf(isStarting)(playGame),
    doIf(isNotPlaying, isNotStarting)(clearMines, clearFlags, clearClears, startGame),
    clearPlayerInput,
  ),
  doIf(isPlaying)(
    doIf(hasNoMines)(addMines),
    doIf(hasMines, hasInput)(
      doIf(clickedWithAlt, clickedNotClear)(toggleFlag),
      doIf(clickedNormally, clickedNotFlag)(
        doIf(clickedNotMine, clickedNotClear)(openClears, doIf(clearedEverything)(winGame)),
        doIf(clickedMine)(loseGame),
      ),
      clearInput,
    ),
  ),
);

export const initGame = (from?: Partial<Preset>): Game => ({input: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = loop;
export const onInput = (state: Game, input: ClickVector): Game => ({...state, input});
