import { Theme, themeColor } from 'app/game';
import { FIELD_GROUND, FIELD_WATER, GameDownColorMap, GameDownStateField } from 'app/redux/game/down';

export const fieldToColor = (data: GameDownStateField, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ => data.field === FIELD_GROUND ? _.fieldGround : data.field === FIELD_WATER ? _.fieldWater : null);
