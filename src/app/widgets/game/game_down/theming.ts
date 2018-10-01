import { Color, reduceThemes, Theme, THEME_MISSING } from 'app/game';
import { GameDownColorMap } from 'app/redux/game/down';

// DEFAULT

const gd_color_invalid = <Color<GameDownColorMap>>{
  name: 'invalid',
  map: <GameDownColorMap>{
    fieldBackground: 'hsla(360, 0%, 77%, 1)',
  }
}

const gd_theme_invalid = <Theme<GameDownColorMap>>{
  color: gd_color_invalid,
  name: 'invalid',
}

// PRESETS

const gd_color_preset = <Color<GameDownColorMap>>{
  name: 'preset',
  map: <GameDownColorMap>{
    fieldWater: 'hsla(239, 48%, 77%, 1)',
  }
}

// COLORS

const gd_color_green = <Color<GameDownColorMap>>{
  name: 'green',
  map: <GameDownColorMap>{
    fieldGround: 'hsla(111, 48%, 77%, 1)',
  }
}

const gd_color_yellow = <Color<GameDownColorMap>>{
  name: 'yellow',
  map: <GameDownColorMap>{
    fieldGround: 'hsla(59, 48%, 77%, 1)',
  }
}

const gd_color_white = <Color<GameDownColorMap>>{
  name: 'white',
  map: <GameDownColorMap>{
    fieldGround: 'hsla(59, 18%, 93%, 1)',
  }
}

// EXPORT

export const theme_down_default = reduceThemes('invalid', [THEME_MISSING as Theme<GameDownColorMap>, gd_theme_invalid, { color: gd_color_preset }]);

export const themes = [
  theme_down_default,
  reduceThemes('forest', [theme_down_default, { color: gd_color_green }]),
  reduceThemes('desert', [theme_down_default, { color: gd_color_yellow }]),
  reduceThemes('iceage', [theme_down_default, { color: gd_color_white }]),
];
