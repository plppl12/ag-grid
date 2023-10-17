import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Theme, alpineTheme, getThemeOrThrow } from 'model/themes';

export const parentThemeClassAtom = atom(alpineTheme.class);

export const parentThemeAtom = atom(
  (get) => getThemeOrThrow(get(parentThemeClassAtom)),
  (_, set, update: Theme) => {
    set(parentThemeClassAtom, update.class);
  },
);

export const useParentTheme = () => useAtomValue(parentThemeAtom);
export const useSetParentTheme = () => useSetAtom(parentThemeAtom);
