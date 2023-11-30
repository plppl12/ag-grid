import { Expression } from 'design-system/css-in-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { mapPresentObjectValues } from 'model/utils';
import { allVariableNames } from 'model/variableInfo';

export const valueAtomsByVariableName = Object.fromEntries(
  allVariableNames.map((variableName) => [variableName, atom<Expression | null>(null)]),
);

export const allValueAtoms = Object.values(valueAtomsByVariableName);

const getVariableValueAtom = (variableName: string) => {
  const atom = valueAtomsByVariableName[variableName];
  if (!atom) {
    throw new Error(`Invalid variable name "${variableName}"`);
  }
  return atom;
};

export const useVariableValueAtom = (variableName: string) => {
  return useAtom(getVariableValueAtom(variableName));
};

export const valuesAtom = atom((get) =>
  mapPresentObjectValues(valueAtomsByVariableName, (atom) => get(atom)),
);

export const useVariableValues = (): Record<string, Expression | undefined> =>
  useAtomValue(valuesAtom);
