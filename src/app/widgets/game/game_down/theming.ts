import { Color, reduceThemes, Theme, THEME_MISSING } from 'app/game';
import { GameDownColorMap } from 'app/redux/game/down';

// DEFAULT

const gd_color_default = <Color<GameDownColorMap>>{
  name: 'default',
  map: <GameDownColorMap>{
    fieldBackground: 'hsla(360, 0%, 77%, 1)',
  }
}

const gd_theme_default = <Theme<GameDownColorMap>>{
  color: gd_color_default,
  name: 'default',
}

// GREEN

const gd_color_green = <Color<GameDownColorMap>>{
  name: 'green',
  map: <GameDownColorMap>{
    fieldGround: 'hsla(111, 48%, 77%, 1)',
    fieldWater: 'hsla(239, 48%, 77%, 1)',
  }
}

const gd_theme_green = <Theme<GameDownColorMap>>{
  color: gd_color_green,
  name: 'green',
}

// EXPORT

export const theme_down_default = reduceThemes('default', [THEME_MISSING as Theme<GameDownColorMap>, gd_theme_default]);

export const themes = [
  theme_down_default,
  reduceThemes('green', [theme_down_default, gd_theme_green]),
];
