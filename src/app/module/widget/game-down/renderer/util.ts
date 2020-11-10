import {
  entityBuilding,
  entityForest,
  entityLoot,
  entityMountain,
  FIELD_GROUND,
  FIELD_WATER,
  GameDownColorMap,
  GameDownField,
  GameDownFieldActor,
  GameDownFieldEntity,
  modField,
} from 'src/app/module/widget/game-down/data';
import {Theme, themeColor} from '../theme';

const ENTITY_BUILDING = entityBuilding().name;
const ENTITY_FOREST = entityForest().name;
const ENTITY_LOOT = entityLoot().name;
const ENTITY_MOUNTAIN = entityMountain().name;

export const actorToColor = (data: GameDownFieldActor, theme: Theme<GameDownColorMap>) =>
  !data || !theme ? null : themeColor(theme, (_) => (data.isNpc ? _.actorNpc : _.actorPc));

export const entityToColor = (data: GameDownFieldEntity, theme: Theme<GameDownColorMap>) =>
  !data || !theme
    ? null
    : themeColor(theme, (_) =>
        data.name === ENTITY_BUILDING
          ? _.entityBuilding
          : data.name === ENTITY_FOREST
          ? _.entityForest
          : data.name === ENTITY_LOOT
          ? _.entityLoot
          : data.name === ENTITY_MOUNTAIN
          ? _.entityMountain
          : null,
      );

const fieldValueToColor = (field: string, theme: Theme<GameDownColorMap>) =>
  !theme ? null : themeColor(theme, (_) => (field === FIELD_GROUND ? _.fieldGround : field === FIELD_WATER ? _.fieldWater : null));
export const fieldToColor = (field: GameDownField, theme: Theme<GameDownColorMap>) => fieldValueToColor(modField.get(field), theme);
