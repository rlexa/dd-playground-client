import { StringToString } from 'app/game';

export interface GameDownColorMap extends StringToString {
  actorNpc: string,
  actorPc: string,
  entityBuilding: string,
  entityForest: string,
  entityLoot: string,
  entityMountain: string,
  fieldBackground: string,
  fieldGround: string,
  fieldWater: string,
}

export interface GameDownModifier {
  type: string,
  data: any,
}

export interface GameDownFieldEntity {
  modifiers: GameDownModifier[],
  name: string,
  variant: number,
}

export interface GameDownFieldActor extends GameDownFieldEntity {
  isNpc: boolean,
}

export interface GameDownField {
  actor?: GameDownFieldActor,
  entities?: GameDownFieldEntity[],
  field?: string,
  modifiers?: GameDownModifier[],
}

export interface GameDownScene {
  factor: number,
  factorMax: number,
  factorMin: number,
  fields: GameDownField[],
  hoveredIndex: number,
  renderer: string,
  selectedIndex: number,
  theme: string,
}

export const FIELD_GROUND = 'ground';
export const FIELD_WATER = 'water';
export const DEF_FieldValues = [FIELD_GROUND, FIELD_WATER];
export const DEF_Field = FIELD_GROUND;

export const VARIANT_DEFAULT = 0;

export const modifier = (type: string, data: any) => <GameDownModifier>{ type, data: [null, undefined, ''].includes(data) ? null : data };
export const modifier_ = (type: string) => (data: any = null) => modifier(type, data);

export const entity = (name: string, variant: number, modifiers: GameDownModifier[]) => <GameDownFieldEntity>{ name, variant, modifiers };
export const entity_ = (name: string, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) => entity(name, variant, modifiers);
export const actity = (name: string, variant: number, modifiers: GameDownModifier[], isNpc: boolean) => <GameDownFieldActor>{ name, variant, modifiers, isNpc };
export const actity_ = (name: string, isNpc: boolean, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) => actity(name, variant, modifiers, isNpc);
export const npc_ = (name: string, variant = VARIANT_DEFAULT) => actity_(name, true, variant);
export const ppc_ = (name: string, variant = VARIANT_DEFAULT) => actity_(name, false, variant);
