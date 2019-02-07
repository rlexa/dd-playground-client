import { FIELD_WATER, GameDownField } from 'app/module/widget/game-down/data/game-down';
import { modHovering, modInitiative } from 'app/module/widget/game-down/data/game-down-util';

export const checkProblemsOnField = (field: GameDownField) => {
  const ret = <string[]>[];

  if (!field.field) {
    ret.push('field type');
  }

  switch (field.field) {
    case FIELD_WATER:
      if ([...field.entities, field.actor].some(_ => !!_ && !modHovering.mod(_))) {
        ret.push('field type + entity');
      }
      break;
  }

  return ret;
}
export const checkProblems = (fields: GameDownField[]) => (fields || []).map(checkProblemsOnField);

/** @todo what about same-initiative actors */
export const resolveInitiative = (fields: GameDownField[]) => (fields || [])
  .map((_, ii) => ii)
  .filter(ii => fields[ii].actor && modInitiative.mod(fields[ii].actor))
  .sort((aa, bb) => modInitiative.get(fields[bb].actor) - modInitiative.get(fields[aa].actor));
