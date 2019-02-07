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

export interface GameDownModified {
  modifiers?: GameDownModifier[],
}

export interface GameDownFieldEntity extends GameDownModified {
  name: string,
  variant: number,
}

export interface GameDownFieldActor extends GameDownFieldEntity {
  isNpc: boolean,
}

export interface GameDownField extends GameDownModified {
  actor?: GameDownFieldActor,
  entities?: GameDownFieldEntity[],
  field?: string,
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

export class GameDownModify<T> {
  constructor(public readonly type: string, public readonly def: T = null) { }
  new = (val: T = this.def) => <GameDownModifier>{ type: this.type, data: val };
  get = (obj: GameDownModified) => {
    const mod = this.mod(obj);
    return !mod ? null : mod.data as T;
  }
  mod = (obj: GameDownModified) => !obj || !obj.modifiers ? null : obj.modifiers.find(_ => _.type === this.type);
  set = (obj: GameDownModified, val: T = this.def) => {
    if (obj && obj.modifiers) {
      const mod = this.mod(obj);
      if (mod) {
        mod.data = val;
      } else {
        obj.modifiers.push(this.new(val));
      }
    }
  }
}

export const mod_ = <T>(type: string, def: T = null) => new GameDownModify<T>(type, def);

export const DIR_EAST = 'east';
export const DIR_NORTH = 'north';
export const DIR_SOUTH = 'south';
export const DIR_WEST = 'west';
export const DEF_DirectionValues = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST];
export const DEF_DIRECTION = DIR_NORTH;

export const FIELD_GROUND = 'ground';
export const FIELD_WATER = 'water';
export const DEF_FieldValues = [FIELD_GROUND, FIELD_WATER];
export const DEF_Field = FIELD_GROUND;

export const VARIANT_DEFAULT = 0;

export const entity = (name: string, variant: number, modifiers: GameDownModifier[]) => <GameDownFieldEntity>{ name, variant, modifiers };
export const entity_ = (name: string, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) => entity(name, variant, modifiers);
export const actity = (name: string, variant: number, modifiers: GameDownModifier[], isNpc: boolean) => <GameDownFieldActor>{ ...entity(name, variant, modifiers), isNpc };
export const actity_ = (name: string, isNpc: boolean, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) => actity(name, variant, modifiers, isNpc);
export const npc_ = (name: string, variant = VARIANT_DEFAULT) => actity_(name, true, variant);
export const ppc_ = (name: string, variant = VARIANT_DEFAULT) => actity_(name, false, variant);
