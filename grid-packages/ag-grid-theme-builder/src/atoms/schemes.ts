import { atom, useAtom, useAtomValue } from 'jotai';
import { chromeColorScheme } from 'model/schemes/chromeColorScheme';

export const chromeColorAtom = atom(chromeColorScheme.options[0]);

export const useChromeColor = () => useAtomValue(chromeColorAtom);
export const useChromeColorAtom = () => useAtom(chromeColorAtom);
