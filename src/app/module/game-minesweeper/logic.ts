import {not, PreFilter, process, processIf, processIn} from 'src/app/game';

export interface Vector {
  x: number;
  y: number;
}

const equalVectors = (aa: Vector, bb: Vector) => aa.x === bb.x && aa.y === bb.y;
const sumVectors = (aa: Vector, bb: Vector): Vector => ({x: aa.x + bb.x, y: aa.y + bb.y});
const isZeroVector = (vec: Vector) => vec.x === 0 && vec.y === 0;
const includesVector = (vecs: Vector[], vec: Vector) => vecs.some(ii => equalVectors(ii, vec));
const indexOfVector = (vecs: Vector[], vec: Vector) => vecs.findIndex(ii => equalVectors(ii, vec));

export interface ClickVector extends Vector {
  alt?: boolean;
}

export interface Map {
  height: number;
  mines: number;
  width: number;
}

export interface Scene {
  clear: Vector[];
  flags: Vector[];
  input?: ClickVector;
  map: Map;
  mines?: Vector[];
}

export interface Preset {
  height: number;
  mines: number;
  width: number;
}

export type funcRender = (game: Game) => void;

export type GameState = 'won' | 'lost' | 'start' | 'play';

export interface Game {
  input?: ClickVector;
  scene: Scene;
  state: GameState;
}

const initPreset = (from?: Partial<Preset>): Preset => ({height: 15, width: 15, mines: 8, ...(from || {})});

const initMap = (from: Preset): Map => ({
  height: from.height,
  mines: from.mines,
  width: from.width,
});

const initScene = (from: Preset): Scene => ({clear: [], flags: [], input: null, map: initMap(from), mines: null});

const randomizeMines = (count: number, width: number, height: number): Vector[] => {
  const mines = Array.from(new Array(count), (_, index) => null);
  const positions = Array.from(new Array(width * height), (_, index) => ({x: index % width, y: Math.floor(index / width)} as Vector));
  mines.forEach((_, index) => {
    const rndIndex = Math.floor(Math.random() * positions.length);
    mines[index] = positions[rndIndex];
    positions.splice(rndIndex, 1);
  });
  return mines;
};

const clearField = (field: Vector, clear: Vector[], flags: Vector[], mines: Vector[], width: number, height: number) => {
  if (includesVector(clear, field) || includesVector(flags, field) || includesVector(mines, field)) {
    return clear;
  }
  clear = [...clear, field];

  const neighbours: Vector[] = [
    {x: field.x - 1, y: field.y - 1},
    {x: field.x, y: field.y - 1},
    {x: field.x + 1, y: field.y - 1},
    {x: field.x - 1, y: field.y},
    {x: field.x + 1, y: field.y},
    {x: field.x - 1, y: field.y + 1},
    {x: field.x, y: field.y + 1},
    {x: field.x + 1, y: field.y + 1},
  ].filter(vec => vec.x >= 0 && vec.x <= width - 1 && vec.y >= 0 && vec.y <= height - 1);

  if (neighbours.every(vec => !includesVector(flags, vec) && !includesVector(mines, vec))) {
    if (field.x > 0) {
      clear = clearField({x: field.x - 1, y: field.y}, clear, flags, mines, width, height);
    }
    if (field.x < width - 1) {
      clear = clearField({x: field.x + 1, y: field.y}, clear, flags, mines, width, height);
    }
    if (field.y > 0) {
      clear = clearField({y: field.y - 1, x: field.x}, clear, flags, mines, width, height);
    }
    if (field.y < height - 1) {
      clear = clearField({y: field.y + 1, x: field.x}, clear, flags, mines, width, height);
    }
  }
  return clear;
};

const whenClearAll: PreFilter<Game> = st => st.scene.clear.length === st.scene.map.height * st.scene.map.width - st.scene.map.mines;
const whenInput: PreFilter<Game> = st => !!st.input;
const whenMines: PreFilter<Game> = st => !!st.scene.mines;
const whenSceneInput: PreFilter<Game> = st => !!st.scene.input;
const whenSceneInputAlt: PreFilter<Game> = st => !!st.scene.input.alt;
const whenSceneInputOnClear: PreFilter<Game> = st => includesVector(st.scene.clear, st.scene.input);
const whenSceneInputOnFlag: PreFilter<Game> = st => includesVector(st.scene.flags, st.scene.input);
const whenSceneInputOnMine: PreFilter<Game> = st => includesVector(st.scene.mines, st.scene.input);

const whenGameIs = (gameState: GameState): PreFilter<Game> => st => st.state === gameState;
const whenGameIsPlay = whenGameIs('play');
const whenGameIsStart = whenGameIs('start');

const inGame = processIn<Game>();
const forClear = inGame(st => st.scene.clear);
const forFlags = inGame(st => st.scene.flags);
const forInput = inGame(st => st.input);
const forMines = inGame(st => st.scene.mines);
const forSceneInput = inGame(st => st.scene.input);
const forState = inGame(st => st.state);

const redFlagToggle = forFlags((st, top) =>
  includesVector(st, top.scene.input)
    ? [...st.slice(0, indexOfVector(st, top.scene.input)), ...st.slice(indexOfVector(st, top.scene.input) + 1)]
    : [...st, top.scene.input],
);
const redClear = forClear((st, top) =>
  clearField(top.scene.input, st, top.scene.flags, top.scene.mines, top.scene.map.width, top.scene.map.height),
);
const redClearClear = forClear((st, top) => []);
const redFlagsClear = forFlags((st, top) => []);
const redGameLost = forState(() => 'lost');
const redGamePlay = forState(() => 'play');
const redGameStart = forState(() => 'start');
const redGameWon = forState(() => 'won');
const redInputClear = forInput(() => null);
const redInputToScene = forSceneInput((st, top) => top.input);
const redMinesClear = forMines((st, top) => null);
const redMinesRandomize = forMines((st, top) => randomizeMines(top.scene.map.mines, top.scene.map.width, top.scene.map.height));
const redSceneInputClear = forSceneInput(() => null);

const processLoop = process(
  processIf(whenInput)(
    processIf(whenGameIsPlay, whenMines)(redInputToScene),
    processIf(whenGameIsStart)(redGamePlay),
    processIf(not(whenGameIsPlay), not(whenGameIsStart))(redMinesClear, redFlagsClear, redClearClear, redGameStart),
    redInputClear,
  ),
  processIf(whenGameIsPlay)(
    processIf(not(whenMines))(redMinesRandomize),
    processIf(whenMines, whenSceneInput)(
      processIf(whenSceneInputAlt, not(whenSceneInputOnClear))(redFlagToggle),
      processIf(not(whenSceneInputAlt), not(whenSceneInputOnFlag))(
        processIf(not(whenSceneInputOnMine), not(whenSceneInputOnClear))(redClear, processIf(whenClearAll)(redGameWon)),
        processIf(whenSceneInputOnMine)(redGameLost),
      ),
      redSceneInputClear,
    ),
  ),
);

export const initGame = (from?: Partial<Preset>): Game => ({input: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = processLoop;
export const onInput = (state: Game, input: ClickVector): Game => ({...state, input});
