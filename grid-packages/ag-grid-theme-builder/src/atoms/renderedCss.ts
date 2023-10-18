import { atom, useAtomValue } from 'jotai';
import { renderSchemeCss } from 'model/render';
import { schemeValuesAtom } from './schemes';
import { themeClassAtom } from './theme';

const renderedCssAtom = atom((get) => {
  const className = get(themeClassAtom);
  const schemeValues = get(schemeValuesAtom);

  return renderSchemeCss({
    className,
    schemeValues: Object.values(schemeValues),
  });
});

export const useRenderedCss = () => useAtomValue(renderedCssAtom);
