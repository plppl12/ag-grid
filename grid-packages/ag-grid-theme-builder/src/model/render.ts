import { VariableValues } from './resolve';
import { SchemeOption } from './schemes/Scheme';

export const renderSchemeCss = ({
  schemeValues,
  className,
}: {
  variableValues: VariableValues;
  schemeValues: Record<string, SchemeOption | null>;
  className: string;
}) => {
  const values: VariableValues = {};
  for (const option of Object.values(schemeValues)) {
    Object.assign(values, option?.variables);
  }

  return addCssDocs({
    themeClass: className,
    // TODO use design system to render
    content: '',
  });
};

export const addCssDocs = ({ themeClass, content }: { themeClass: string; content: string }) => `/*
 * To use your new theme, copy this CSS into your application stylesheets and add
 * the class "${themeClass}" to the div containing the grid:
 * <div id="myGrid" class="${themeClass}"></div>
 * 
 * See https://ag-grid.com/javascript-data-grid/global-style-customisation/
 */

${content}

/*

You can customise the theme more by adding css variables on the theme class:

.${themeClass} {
    --ag-active-color: red;
}

Or by defining selectors that target grid classes, scoped to the theme class to ensure
that your rules override the built-in grid styles:

.${themeClass} .ag-header-cell {
    font-style: italic;
}

*/
`;
