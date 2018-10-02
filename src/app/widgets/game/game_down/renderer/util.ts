import { Theme, themeColor } from 'app/game';
import { ENTITY_BUILDING, ENTITY_FOREST, ENTITY_LOOT, ENTITY_MOUNTAIN, FIELD_GROUND, FIELD_WATER, GameDownColorMap, GameDownStateField, GameDownStateFieldEntity } from 'app/redux/game/down';

export const entityToColor = (data: GameDownStateFieldEntity, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ =>
    data.name === ENTITY_BUILDING.name ? _.entityBuilding :
      data.name === ENTITY_FOREST.name ? _.entityForest :
        data.name === ENTITY_LOOT.name ? _.entityLoot :
          data.name === ENTITY_MOUNTAIN.name ? _.entityMountain : null);

export const fieldToColor = (data: GameDownStateField, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ => data.field === FIELD_GROUND ? _.fieldGround : data.field === FIELD_WATER ? _.fieldWater : null);
