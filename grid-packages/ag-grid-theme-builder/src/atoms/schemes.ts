import { atom, useAtom } from 'jotai';
import { allSchemes } from 'model/schemes';
import { Scheme, SchemeOption } from 'model/schemes/Scheme';
import { mapPresentObjectValues } from 'model/utils';

export const schemeValueAtomsBySchemeName = Object.fromEntries(
  allSchemes.map((scheme) => [scheme.name, atom<SchemeOption | null>(null)]),
);

export const getSchemeValueAtom = (scheme: Scheme) => {
  const schemeValueAtom = schemeValueAtomsBySchemeName[scheme.name];
  if (!schemeValueAtom) {
    throw new Error(`No atom for scheme "${scheme.name}"`);
  }
  return schemeValueAtom;
};

export const useSchemeValueAtom = (scheme: Scheme) => useAtom(getSchemeValueAtom(scheme));

export const schemeValuesAtom = atom((get) =>
  mapPresentObjectValues(schemeValueAtomsBySchemeName, (atom) => get(atom)),
);
