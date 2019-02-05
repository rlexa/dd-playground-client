import { Theme, themeColor } from 'app/game';
import { entityBuilding, entityForest, entityLoot, entityMountain, FIELD_GROUND, FIELD_WATER, GameDownColorMap, GameDownStateField, GameDownStateFieldActor, GameDownStateFieldEntity } from 'app/rx-state/state/state-game-down';

const ENTITY_BUILDING = entityBuilding().name;
const ENTITY_FOREST = entityForest().name;
const ENTITY_LOOT = entityLoot().name;
const ENTITY_MOUNTAIN = entityMountain().name;

export const actorToColor = (data: GameDownStateFieldActor, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ => data.isNpc ? _.actorNpc : _.actorPc);

export const entityToColor = (data: GameDownStateFieldEntity, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ =>
    data.name === ENTITY_BUILDING ? _.entityBuilding :
      data.name === ENTITY_FOREST ? _.entityForest :
        data.name === ENTITY_LOOT ? _.entityLoot :
          data.name === ENTITY_MOUNTAIN ? _.entityMountain : null);

export const fieldToColor = (data: GameDownStateField, theme: Theme<GameDownColorMap>) => !data || !theme ? null :
  themeColor(theme, _ => data.field === FIELD_GROUND ? _.fieldGround : data.field === FIELD_WATER ? _.fieldWater : null);
