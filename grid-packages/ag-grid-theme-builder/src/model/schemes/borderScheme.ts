import { LiteralValue } from 'model/values';
import { Border } from 'model/values/Border';
import { BorderStyle } from 'model/values/BorderStyle';
import { Color } from 'model/values/Color';
import { Dimension } from 'model/values/Dimension';
import { Scheme } from './Scheme';

const solid1px = new Border(new BorderStyle('solid'), new Dimension(1, 'px'), null);
const none = new Border(new BorderStyle('none'), null, null);

export const borderScheme = new Scheme('border', [
  {
    value: 'full',
    description: 'Border around all elements',
    variables: {
      '--ag-borders-critical': solid1px,
      '--ag-borders-input': solid1px,
      '--ag-borders-secondary': solid1px,
      '--ag-borders-side-button': solid1px,
      '--ag-borders': solid1px,
      '--ag-secondary-border-color': new LiteralValue('var(--ag-border-color)'),
      '--ag-row-border-color': new LiteralValue('var(--ag-border-color)'),
    },
  },
  {
    value: 'two-tone',
    description: 'Border around all elements with lighter borders between rows and widgets',
    variables: {
      '--ag-borders-critical': solid1px,
      '--ag-borders-input': solid1px,
      '--ag-borders-secondary': solid1px,
      '--ag-borders-side-button': solid1px,
      '--ag-borders': solid1px,
    },
  },
  {
    value: 'horizontal-only',
    description: 'Borders between rows and headers',
    variables: {
      '--ag-borders-critical': solid1px,
      '--ag-borders-input': none,
      '--ag-borders-secondary': none,
      '--ag-borders-side-button': none,
      '--ag-borders': none,
    },
  },
  {
    value: 'none',
    variables: {
      '--ag-borders-critical': none,
      '--ag-borders-input': none,
      '--ag-borders-secondary': none,
      '--ag-borders-side-button': none,
      '--ag-borders': none,
      '--ag-row-border-color': Color.parseCss('transparent'),
    },
  },
]);
