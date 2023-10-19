import { atom, useAtom, useAtomValue } from 'jotai';
import { mapPresentObjectValues } from 'model/utils';
import { Value } from 'model/values';
import { allVariableNames } from 'model/variableInfo';

export const valueAtomsByVariableName = Object.fromEntries(
  allVariableNames.map((variableName) => [variableName, atom<Value | null>(null)]),
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

export const useVariableValues = () => useAtomValue(valuesAtom);
