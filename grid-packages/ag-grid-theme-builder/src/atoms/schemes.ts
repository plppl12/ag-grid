import { atom, useAtomValue, useSetAtom } from 'jotai';
import { allSchemes } from 'model/schemes';
import { Scheme, SchemeOption, SchemeValue } from 'model/schemes/Scheme';
import { Value } from 'model/values';

export const schemeValueAtoms = Object.fromEntries(
  allSchemes.map((scheme) => [scheme.name, atom<SchemeValue | null>(null)]),
);

export const getSchemeValueAtom = (scheme: Scheme) => {
  const schemeValueAtom = schemeValueAtoms[scheme.name];
  if (!schemeValueAtom) {
    throw new Error(`No atom for scheme "${scheme.name}"`);
  }
  return schemeValueAtom;
};

export const schemeValuesAtom = atom((get) =>
  Object.fromEntries(
    allSchemes
      .map((scheme): [string, SchemeValue | null] => [scheme.name, get(getSchemeValueAtom(scheme))])
      .filter(([, value]) => value != null),
  ),
);

export const useSchemeValue = (scheme: Scheme) =>
  useAtomValue(getSchemeValueAtom(scheme)) || scheme.defaultValue;

export const useSetSchemeOption = (scheme: Scheme) => {
  const setter = useSetAtom(getSchemeValueAtom(scheme));
  return (option: SchemeOption | null) =>
    setter((value) => {
      value ||= scheme.defaultValue;
      return option == null ? null : { ...value, option };
    });
};

export const useSetSchemeVariable = (scheme: Scheme) => {
  const setter = useSetAtom(getSchemeValueAtom(scheme));
  return (variableName: string, variableValue: Value | null) =>
    setter((value) => {
      value ||= scheme.defaultValue;
      return { ...value, variables: { ...value.variables, [variableName]: variableValue } };
    });
};
