import { atom, useAtomValue } from 'jotai';
import { renderSchemeCss } from 'model/render';
import { chromeColorScheme } from 'model/schemes/chromeColorScheme';
import { chromeColorAtom } from './schemes';
import { themeClassAtom } from './theme';

// TODO remove - old version using variables
// const renderedCssAtom = atom((get) => {
//   const parentTheme = get(parentThemeAtom);
//   const themeClass = get(themeClassAtom);
//   const values = get(valuesAtom);

//   return addCssDocs({
//     parentTheme,
//     themeClass,
//     content: renderCss({ className: themeClass, values }),
//   });
// });

const renderedCssAtom = atom((get) => {
  const className = get(themeClassAtom);
  const chromeColor = get(chromeColorAtom);

  return renderSchemeCss({
    className,
    schemeValues: [
      {
        scheme: chromeColorScheme,
        option: chromeColor,
      },
    ],
  });
});

export const useRenderedCss = () => useAtomValue(renderedCssAtom);
