import {DEF_DIRECTION, DEF_FIELD, fEntity, FIELD_WATER, GameDownField, toMod, toNpc, toPpc, VARIANT_DEFAULT} from './game-down';

export const modBlocking = toMod('blocking');
export const modDamageMaxIncoming = toMod('damage-max-incoming', 1);
export const modDestructible = toMod('destructible');
export const modDirection = toMod('direction', DEF_DIRECTION);
export const modField = toMod('field', DEF_FIELD);
export const modFlammable = toMod('flammable');
export const modHealth = toMod('health', 0);
export const modHealthMax = toMod('health-max', 0);
export const modHovering = toMod('hovering');
export const modInitiative = toMod('initiative', 0);
export const modLootable = toMod('lootable');

export const VARIANT_BUILDING_SINGLE = VARIANT_DEFAULT;
export const VARIANT_BUILDING_DOUBLE = VARIANT_BUILDING_SINGLE + 1;

export const entityBuilding = (variant = VARIANT_DEFAULT) =>
  fEntity('building', variant)([modDirection.new(), modHealth.new(1), modBlocking.new(), modDestructible.new()]);
export const entityForest = (variant = VARIANT_DEFAULT) =>
  fEntity('tree', variant)([modDirection.new(), modHealth.new(1), modDestructible.new(), modFlammable.new()]);
export const entityLoot = (variant = VARIANT_DEFAULT) =>
  fEntity('loot', variant)([modDirection.new(), modHealth.new(1), modDestructible.new(), modLootable.new()]);
export const entityMountain = (variant = VARIANT_DEFAULT) =>
  fEntity(
    'mountain',
    variant,
  )([modDirection.new(), modHealth.new(2), modBlocking.new(), modDamageMaxIncoming.new(), modDestructible.new()]);

const modsHealthy = (val: number) => [modHealthMax.new(val), modHealth.new(val)];
export const ppcBotArtillery = (variant = VARIANT_DEFAULT) =>
  toPpc('bot_artillery', variant)([modDirection.new(), ...modsHealthy(2), modBlocking.new(), modDestructible.new()]);
export const ppcBotHeavy = (variant = VARIANT_DEFAULT) =>
  toPpc('bot_heavy', variant)([modDirection.new(), ...modsHealthy(4), modBlocking.new(), modDestructible.new()]);
export const ppcBotTank = (variant = VARIANT_DEFAULT) =>
  toPpc('bot_tank', variant)([modDirection.new(), ...modsHealthy(3), modBlocking.new(), modDestructible.new()]);

const modsNpcy = ({health = 0, initiative = 0} = {}) => [
  modDirection.new(),
  modBlocking.new(),
  modDestructible.new(),
  modHealth.new(health),
  modInitiative.new(initiative),
];
export const npcBugBarfer = (variant = VARIANT_DEFAULT) => toNpc('bug_barfer', variant)([...modsNpcy({health: 3, initiative: 2})]);
export const npcBugBomber = (variant = VARIANT_DEFAULT) => toNpc('bug_bomber', variant)([...modsNpcy({health: 3, initiative: 1})]);
export const npcBugCrawler = (variant = VARIANT_DEFAULT) => toNpc('bug_crawler', variant)([...modsNpcy({health: 3, initiative: 4})]);
export const npcBugFlyer = (variant = VARIANT_DEFAULT) =>
  toNpc('bug_flier', variant)([...modsNpcy({health: 2, initiative: 5}), modHovering.new()]);
export const npcBugSpitter = (variant = VARIANT_DEFAULT) => toNpc('bug_spitter', variant)([...modsNpcy({health: 2, initiative: 3})]);

// SITUATIONS

export const GAMEDOWN_FIELD_H = 8;
export const GAMEDOWN_FIELD_W = 8;
export const GAMEDOWN_FIELD_Q = GAMEDOWN_FIELD_H * GAMEDOWN_FIELD_W;

export const DEF_SCENE_FACTOR = 1;

const DEF_GDFIELD: GameDownField = {actor: null, entities: [], modifiers: [modField.new()]};
export const DEF_FAMEDOWN_STATE_FIELDS = Array.from(
  Array(GAMEDOWN_FIELD_Q),
  () => ({actor: null, entities: [], modifiers: [modField.new()]} as GameDownField),
);

const WW = GAMEDOWN_FIELD_W;

export const buildSituation1 = () => {
  const fields = [...DEF_FAMEDOWN_STATE_FIELDS];

  fields[0 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[0 * WW + 1] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[0 * WW + 2] = {...DEF_GDFIELD, entities: [entityForest()]};
  fields[0 * WW + 5] = {...DEF_GDFIELD, entities: [entityBuilding()]};
  fields[0 * WW + 6] = {...DEF_GDFIELD, entities: [entityMountain()]};
  fields[0 * WW + 7] = {...DEF_GDFIELD, entities: [entityMountain()]};

  fields[1 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[1 * WW + 1] = {...DEF_GDFIELD, entities: [entityBuilding()]};
  fields[1 * WW + 2] = {...DEF_GDFIELD, entities: [entityForest()]};
  fields[1 * WW + 4] = {...DEF_GDFIELD, actor: ppcBotArtillery()};
  fields[1 * WW + 5] = {...DEF_GDFIELD, entities: [entityBuilding()]};
  fields[1 * WW + 6] = {...DEF_GDFIELD, entities: [entityBuilding()]};
  fields[1 * WW + 7] = {...DEF_GDFIELD, entities: [entityMountain()]};

  fields[2 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[2 * WW + 1] = {...DEF_GDFIELD, entities: [entityBuilding()]};
  fields[2 * WW + 4] = {...DEF_GDFIELD, entities: [entityForest()], actor: ppcBotHeavy()};

  fields[3 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[3 * WW + 2] = {...DEF_GDFIELD, entities: [entityForest()]};
  fields[3 * WW + 3] = {...DEF_GDFIELD, actor: ppcBotTank()};
  fields[3 * WW + 5] = {...DEF_GDFIELD, actor: npcBugBarfer()};

  fields[4 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[4 * WW + 1] = {...DEF_GDFIELD, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)]};
  fields[4 * WW + 2] = {...DEF_GDFIELD, actor: npcBugBomber()};
  fields[4 * WW + 6] = {...DEF_GDFIELD, entities: [entityForest()]};

  fields[5 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[5 * WW + 1] = {...DEF_GDFIELD, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)]};
  fields[5 * WW + 5] = {...DEF_GDFIELD, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)]};
  fields[5 * WW + 6] = {...DEF_GDFIELD, actor: npcBugFlyer()};

  fields[6 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[6 * WW + 1] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[6 * WW + 2] = {...DEF_GDFIELD, entities: [entityLoot()]};
  fields[6 * WW + 3] = {...DEF_GDFIELD, actor: npcBugSpitter()};
  fields[6 * WW + 4] = {...DEF_GDFIELD, actor: npcBugCrawler()};
  fields[6 * WW + 6] = {...DEF_GDFIELD, entities: [entityForest()]};

  fields[7 * WW + 0] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[7 * WW + 1] = {...DEF_GDFIELD, modifiers: modField.modify(DEF_GDFIELD.modifiers, FIELD_WATER)};
  fields[7 * WW + 7] = {...DEF_GDFIELD, entities: [entityMountain()]};

  return fields;
};
