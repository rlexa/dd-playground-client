import {not, PreFilter, process, processIf, processIn} from 'src/app/game';

export interface Vector {
  x: number;
  y: number;
}

const equalVectors = (aa: Vector, bb: Vector) => aa.x === bb.x && aa.y === bb.y;
const sumVectors = (aa: Vector, bb: Vector): Vector => ({x: aa.x + bb.x, y: aa.y + bb.y});
const isZeroVector = (vec: Vector) => vec.x === 0 && vec.y === 0;
const includesVector = (vecs: Vector[], vec: Vector) => vecs.some(ii => equalVectors(ii, vec));

export interface ClickVector extends Vector {
  alt?: boolean;
}

export interface Map {
  height: number;
  mines: number;
  width: number;
}

export interface Scene {
  map: Map;
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

const initScene = (from: Preset): Scene => ({map: initMap(from)});

const whenInput: PreFilter<Game> = st => !!st.input;

const whenGameIs = (gameState: GameState): PreFilter<Game> => st => st.state === gameState;
const whenGameIsPlay = whenGameIs('play');
const whenGameIsStart = whenGameIs('start');

const inGame = processIn<Game>();
const forInput = inGame(st => st.input);
const forState = inGame(st => st.state);

const redGameLost = forState(() => 'lost');
const redGameStartOrPlay = forState(st => (st !== 'start' ? 'start' : 'play'));
const redGameWon = forState(() => 'won');
const redInputClear = forInput(() => null);

const processLoop = process(
  processIf(whenInput)(processIf(not(whenGameIsPlay))(redGameStartOrPlay), redInputClear),
  processIf(whenGameIsPlay)(),
);

export const initGame = (from?: Partial<Preset>): Game => ({input: null, scene: initScene(initPreset(from)), state: 'start'});
export const processFrame = processLoop;
export const onInput = (state: Game, input: ClickVector): Game => ({...state, input});
