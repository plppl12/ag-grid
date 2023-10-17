import { atom, useAtomValue } from 'jotai';
import { addCssDocs, renderCss } from 'model/render';
import { parentThemeAtom } from './parentTheme';
import { themeClassAtom } from './theme';
import { valuesAtom } from './values';

const renderedCss = atom((get) => {
  const parentTheme = get(parentThemeAtom);
  const themeClass = get(themeClassAtom);
  const values = get(valuesAtom);

  return addCssDocs({
    parentTheme,
    themeClass,
    content: renderCss({ className: themeClass, values }),
  });
});

export const useRenderedCss = () => useAtomValue(renderedCss);
