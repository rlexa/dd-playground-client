import { entityBuilding, entityForest, entityLoot, entityMountain, FIELD_WATER, npcBugBarfer, npcBugBomber, npcBugCrawler, npcBugFlyer, npcBugSpitter, ppcBotArtillery, ppcBotHeavy, ppcBotTank, VARIANT_BUILDING_DOUBLE } from 'app/module/widget/game-down/data';
import { DEF_GameDownStateField, DEF_GameDownStateFields, GAME_DOWN_FIELD_W } from 'app/rx-state/state/state-game-down';

const WW = GAME_DOWN_FIELD_W;

export const build_Situation_1 = () => {
  const fields = [...DEF_GameDownStateFields];

  fields[0 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[0 * WW + 2] = { ...DEF_GameDownStateField, entities: [entityForest()] };
  fields[0 * WW + 5] = { ...DEF_GameDownStateField, entities: [entityBuilding()] };
  fields[0 * WW + 6] = { ...DEF_GameDownStateField, entities: [entityMountain()] };
  fields[0 * WW + 7] = { ...DEF_GameDownStateField, entities: [entityMountain()] };

  fields[1 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[1 * WW + 1] = { ...DEF_GameDownStateField, entities: [entityBuilding()] };
  fields[1 * WW + 2] = { ...DEF_GameDownStateField, entities: [entityForest()] };
  fields[1 * WW + 4] = { ...DEF_GameDownStateField, actor: ppcBotArtillery() };
  fields[1 * WW + 5] = { ...DEF_GameDownStateField, entities: [entityBuilding()] };
  fields[1 * WW + 6] = { ...DEF_GameDownStateField, entities: [entityBuilding()] };
  fields[1 * WW + 7] = { ...DEF_GameDownStateField, entities: [entityMountain()] };

  fields[2 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[2 * WW + 1] = { ...DEF_GameDownStateField, entities: [entityBuilding()] };
  fields[2 * WW + 4] = { ...DEF_GameDownStateField, entities: [entityForest()], actor: ppcBotHeavy() };

  fields[3 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[3 * WW + 2] = { ...DEF_GameDownStateField, entities: [entityForest()] };
  fields[3 * WW + 3] = { ...DEF_GameDownStateField, actor: ppcBotTank() };
  fields[3 * WW + 5] = { ...DEF_GameDownStateField, actor: npcBugBarfer() };

  fields[4 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[4 * WW + 1] = { ...DEF_GameDownStateField, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)] };
  fields[4 * WW + 2] = { ...DEF_GameDownStateField, actor: npcBugBomber() };
  fields[4 * WW + 6] = { ...DEF_GameDownStateField, entities: [entityForest()] };

  fields[5 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[5 * WW + 1] = { ...DEF_GameDownStateField, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)] };
  fields[5 * WW + 5] = { ...DEF_GameDownStateField, entities: [entityBuilding(VARIANT_BUILDING_DOUBLE)] };
  fields[5 * WW + 6] = { ...DEF_GameDownStateField, actor: npcBugFlyer() };

  fields[6 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[6 * WW + 2] = { ...DEF_GameDownStateField, entities: [entityLoot()] };
  fields[6 * WW + 3] = { ...DEF_GameDownStateField, actor: npcBugSpitter() };
  fields[6 * WW + 4] = { ...DEF_GameDownStateField, actor: npcBugCrawler() };
  fields[6 * WW + 6] = { ...DEF_GameDownStateField, entities: [entityForest()] };

  fields[7 * WW + 0] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 1] = { ...DEF_GameDownStateField, field: FIELD_WATER };
  fields[7 * WW + 7] = { ...DEF_GameDownStateField, entities: [entityMountain()] };

  return fields;
}
