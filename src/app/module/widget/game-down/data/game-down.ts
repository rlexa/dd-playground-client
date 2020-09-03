import {StringToString} from 'src/app/game';
import {copyJson} from 'src/app/util';

export interface GameDownColorMap extends StringToString {
  actorNpc: string;
  actorPc: string;
  entityBuilding: string;
  entityForest: string;
  entityLoot: string;
  entityMountain: string;
  fieldBackground: string;
  fieldGround: string;
  fieldWater: string;
}

export interface GameDownModifier {
  type: string;
  data: any;
}

export interface GameDownModified {
  modifiers?: GameDownModifier[];
}

export interface GameDownFieldEntity extends GameDownModified {
  name: string;
  variant: number;
}

export interface GameDownFieldActor extends GameDownFieldEntity {
  isNpc: boolean;
}

export interface GameDownField extends GameDownModified {
  actor?: GameDownFieldActor;
  entities?: GameDownFieldEntity[];
}

export interface GameDownScene {
  factor: number;
  factorMax: number;
  factorMin: number;
  fields: GameDownField[];
  renderer: string;
  theme: string;
}

export class GameDownModify<T> {
  constructor(public readonly type: string, public readonly def: T = null) {}

  private fFind = (from: GameDownModifier[]) => (!from ? null : from.find((_) => _.type === this.type));

  new = (val: T = this.def): GameDownModifier => ({type: this.type, data: val});

  find = (obj: GameDownModified | GameDownModifier[]) => (!obj ? null : this.fFind(Array.isArray(obj) ? obj : obj.modifiers));

  get = (obj: GameDownModified) => {
    const mod = this.find(obj);
    return !mod ? null : (mod.data as T);
  };

  set = (obj: GameDownModified, val: T = this.def) => {
    if (obj && obj.modifiers) {
      const modifiers = this.modify(obj.modifiers, val);
      if (obj.modifiers !== modifiers) {
        obj = {...obj, modifiers};
      }
    }
    return obj;
  };

  modify = (modifiers: GameDownModifier[], val: T = this.def) => {
    if (modifiers) {
      let mod = this.find(modifiers);
      if (!mod || mod.data !== val) {
        modifiers = copyJson(modifiers);
        mod = this.find(modifiers);
        if (mod) {
          mod.data = val;
        } else {
          modifiers.push(this.new(val));
        }
      }
    }
    return modifiers;
  };
}

export const toMod = <T>(type: string, def: T = null) => new GameDownModify<T>(type, def);

export const DIR_EAST = 'east';
export const DIR_NORTH = 'north';
export const DIR_SOUTH = 'south';
export const DIR_WEST = 'west';
export const DEF_DIRECTION_VALUES = [DIR_NORTH, DIR_EAST, DIR_SOUTH, DIR_WEST];
export const DEF_DIRECTION = DIR_NORTH;

export const FIELD_GROUND = 'ground';
export const FIELD_WATER = 'water';
export const DEF_FIELD_VALUES = [FIELD_GROUND, FIELD_WATER];
export const DEF_FIELD = FIELD_GROUND;

export const VARIANT_DEFAULT = 0;

export const entity = (name: string, variant: number, modifiers: GameDownModifier[]): GameDownFieldEntity => ({name, variant, modifiers});
export const fEntity = (name: string, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) =>
  entity(name, variant, modifiers);
export const actity = (name: string, variant: number, modifiers: GameDownModifier[], isNpc: boolean): GameDownFieldActor => ({
  ...entity(name, variant, modifiers),
  isNpc,
});
export const toActity = (name: string, isNpc: boolean, variant = VARIANT_DEFAULT) => (modifiers: GameDownModifier[] = []) =>
  actity(name, variant, modifiers, isNpc);
export const toNpc = (name: string, variant = VARIANT_DEFAULT) => toActity(name, true, variant);
export const toPpc = (name: string, variant = VARIANT_DEFAULT) => toActity(name, false, variant);
