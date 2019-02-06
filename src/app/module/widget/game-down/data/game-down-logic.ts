import { GameDownField } from 'app/module/widget/game-down/data/game-down';
import { modInitiative } from 'app/module/widget/game-down/data/game-down-util';

const MOD_INITIATIVE = modInitiative().type;

/** @todo what about same-initiative actors */
export const resolveInitiative = (fields: GameDownField[]) => (fields || [])
  .map((_, ii) => ii)
  .filter(ii => fields[ii].actor && fields[ii].actor.modifiers.find(mod => mod.type === MOD_INITIATIVE))
  .sort((aa, bb) =>
    (fields[bb].actor.modifiers.find(mod => mod.type === MOD_INITIATIVE).data || 0) - (fields[aa].actor.modifiers.find(mod => mod.type === MOD_INITIATIVE).data || 0));
