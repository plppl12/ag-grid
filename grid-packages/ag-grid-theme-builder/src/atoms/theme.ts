import { atom, useAtom, useAtomValue } from 'jotai';
import { alpineTheme } from 'model/themes';

export const parentThemeClassAtom = atom(alpineTheme.class);

export const themeLabelAtom = atom('Custom Theme');
export const useThemeLabelAtom = () => useAtom(themeLabelAtom);

export const themeClassAtom = atom((get) => classFromLabel(get(themeLabelAtom)));

const classFromLabel = (humanName: string) =>
  'ag-theme-' +
  (humanName
    // strip accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    // replace
    .replaceAll(/[^0-9a-z]/gi, ' ')
    .trim()
    .replaceAll(/\s+/g, '-') || 'custom');

export const useThemeClass = () => useAtomValue(themeClassAtom);
