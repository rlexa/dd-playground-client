import {FIELD_WATER, GameDownField} from './game-down';
import {modField, modHovering, modInitiative} from './game-down-util';

export const checkProblemsOnField = (field: GameDownField) => {
  const ret: string[] = [];

  const prop = modField.get(field);
  if (!prop) {
    ret.push('field type');
  }

  switch (prop) {
    case FIELD_WATER:
      if ([...field.entities, field.actor].some((entity) => !!entity && !modHovering.find(entity))) {
        ret.push('field type + entity');
      }
      break;
  }

  return ret;
};

export const checkProblems = (fields: GameDownField[]) => (fields || []).map(checkProblemsOnField);

/** @todo what about same-initiative actors */
export const resolveInitiative = (fields: GameDownField[]) =>
  (fields || [])
    .map((_, ii) => ii)
    .filter((ii) => fields[ii].actor && modInitiative.find(fields[ii].actor))
    .sort((aa, bb) => modInitiative.get(fields[bb].actor) - modInitiative.get(fields[aa].actor));
