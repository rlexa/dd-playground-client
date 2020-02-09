import {Color, reduceThemes, Theme, THEME_MISSING} from 'src/app/game';
import {GameDownColorMap} from 'src/app/module/widget/game-down/data';

// DEFAULT

const gdColorInvalid: Color<Partial<GameDownColorMap>> = {
  name: 'invalid',
  map: {
    fieldBackground: 'hsla(360, 0%, 77%, 1)',
  },
};

const gdThemeInvalid: Theme<Partial<GameDownColorMap>> = {
  color: gdColorInvalid,
  name: 'invalid',
};

// PRESETS

const gdColorPreset: Color<Partial<GameDownColorMap>> = {
  name: 'preset',
  map: {
    actorNpc: 'hsla(0, 100%, 50%, 1)',
    actorPc: 'hsla(241, 100%, 50%, 1)',
    entityBuilding: 'hsla(273, 48%, 48%, 1)',
    entityForest: 'hsla(111, 48%, 51%, 1)',
    entityLoot: 'hsla(51, 100%, 50%, 1)',
    entityMountain: 'hsla(111, 8%, 53%, 1)',
    fieldWater: 'hsla(239, 48%, 77%, 1)',
  },
};

// COLORS

const gdColorGreen: Color<Partial<GameDownColorMap>> = {
  name: 'green',
  map: {
    fieldGround: 'hsla(111, 48%, 77%, 1)',
  },
};

const gdColorYellow: Color<Partial<GameDownColorMap>> = {
  name: 'yellow',
  map: {
    fieldGround: 'hsla(59, 48%, 77%, 1)',
  },
};

const gdColorWhite: Color<Partial<GameDownColorMap>> = {
  name: 'white',
  map: {
    fieldGround: 'hsla(59, 18%, 93%, 1)',
  },
};

// EXPORT

export const themeDownDefault = reduceThemes('invalid', [THEME_MISSING as Theme<GameDownColorMap>, gdThemeInvalid, {color: gdColorPreset}]);

export const themes = [
  themeDownDefault,
  reduceThemes('green', [themeDownDefault, {color: gdColorGreen}]),
  reduceThemes('yellow', [themeDownDefault, {color: gdColorYellow}]),
  reduceThemes('white', [themeDownDefault, {color: gdColorWhite}]),
];
