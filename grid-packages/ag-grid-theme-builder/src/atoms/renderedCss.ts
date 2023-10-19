import { atom, useAtomValue } from 'jotai';
import { renderSchemeCss } from 'model/render';
import { schemeValuesAtom } from './schemes';
import { themeClassAtom } from './theme';
import { valuesAtom } from './values';

const renderedCssAtom = atom((get) => {
  const className = get(themeClassAtom);
  const schemeValues = get(schemeValuesAtom);
  const variableValues = get(valuesAtom);

  return renderSchemeCss({
    className,
    variableValues,
    schemeValues,
  });
});

export const useRenderedCss = () => useAtomValue(renderedCssAtom);
