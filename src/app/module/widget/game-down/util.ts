import { ACTOR_BOT_ARTILLERY, ACTOR_BOT_HEAVY, ACTOR_BOT_TANK, ACTOR_BUG_BARFER, ACTOR_BUG_CRAWLER, ACTOR_BUG_FLIER, ACTOR_BUG_SPITTER, DEF_GameDownStateField, DEF_GameDownStateFields, ENTITY_BUILDING, ENTITY_FOREST, ENTITY_LOOT, ENTITY_MOUNTAIN, FIELD_WATER, GAME_DOWN_FIELD_W, VARIANT_BUILDING_DOUBLE } from 'app/rx-state/state/state-game-down';

const WW = GAME_DOWN_FIELD_W;

export const build_Situation_1 = () => {
  const fields = [...DEF_GameDownStateFields];

  fields[0 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[0 * WW + 5] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[0 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };
  fields[0 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  fields[1 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[1 * WW + 1] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[1 * WW + 4] = { ...DEF_GameDownStateField, actor: ACTOR_BOT_ARTILLERY };
  fields[1 * WW + 5] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[1 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  fields[2 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[2 * WW + 1] = { ...DEF_GameDownStateField, entities: [ENTITY_BUILDING] };
  fields[2 * WW + 4] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST], actor: ACTOR_BOT_HEAVY };

  fields[3 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[3 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };
  fields[3 * WW + 3] = { ...DEF_GameDownStateField, actor: ACTOR_BOT_TANK };
  fields[3 * WW + 5] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_BARFER };

  fields[4 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[4 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[4 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[5 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[5 * WW + 1] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[5 * WW + 5] = { ...DEF_GameDownStateField, entities: [{ ...ENTITY_BUILDING, variant: VARIANT_BUILDING_DOUBLE }] };
  fields[5 * WW + 6] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_FLIER };

  fields[6 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 2] = { ...DEF_GameDownStateField, entities: [ENTITY_LOOT] };
  fields[6 * WW + 3] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_SPITTER };
  fields[6 * WW + 4] = { ...DEF_GameDownStateField, actor: ACTOR_BUG_CRAWLER };
  fields[6 * WW + 6] = { ...DEF_GameDownStateField, entities: [ENTITY_FOREST] };

  fields[7 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 7] = { ...DEF_GameDownStateField, entities: [ENTITY_MOUNTAIN] };

  return fields;
}
