import { GameDownField } from 'app/module/widget/game-down/data/game-down';
import { modInitiative } from 'app/module/widget/game-down/data/game-down-util';

/** @todo what about same-initiative actors */
export const resolveInitiative = (fields: GameDownField[]) => (fields || [])
  .map((_, ii) => ii)
  .filter(ii => fields[ii].actor && modInitiative.mod(fields[ii].actor))
  .sort((aa, bb) => modInitiative.get(fields[bb].actor) - modInitiative.get(fields[aa].actor));
