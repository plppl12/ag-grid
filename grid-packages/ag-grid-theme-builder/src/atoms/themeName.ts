import { atom, useAtom } from 'jotai';
import { alpineTheme } from 'model/themes';

export const parentThemeNameAtom = atom(alpineTheme.name);

export const themeNameAtom = atom('Custom Theme');

export const useThemeNameAtom = () => useAtom(themeNameAtom);
