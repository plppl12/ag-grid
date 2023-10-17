import { Color } from 'model/values/Color';
import { Scheme } from './Scheme';

export const chromeColorScheme = new Scheme('chromeColorScheme', [
  {
    value: 'high-contrast',
    label: 'Alpine',
    description: 'High contrast blacks, whites and light greys',
  },
  {
    value: 'low-contrast',
    label: 'Balham',
    description: 'Low contrast shades of grey',
    variables: {
      '--ag-balham-active-color': Color.parseCss('#0091ea'),
      '--ag-foreground-color': Color.parseCss('#000'),
      '--ag-background-color': Color.parseCss('#fff'),
      '--ag-header-background-color': Color.parseCss('#f5f7f7'),
      '--ag-subheader-background-color': Color.parseCss('#e2e9eb'),
      '--ag-control-panel-background-color': Color.parseCss('#f5f7f7'),
      '--ag-border-color': Color.parseCss('#bdc3c7'),
      '--ag-odd-row-background-color': Color.parseCss('#fcfdfe'),
      '--ag-row-hover-color': Color.parseCss('#ecf0f1'),
      '--ag-column-hover-color': Color.parseCss('#ecf0f1'),
      '--ag-input-border-color': Color.parseCss('#95a5a6'),
      '--ag-invalid-color': Color.parseCss('#e02525'),
      '--ag-input-disabled-background-color': Color.parseCss('#ebebeb'),
      '--ag-secondary-foreground-color': Color.parseCss('#000')?.withAlpha(0.54),
      '--ag-disabled-foreground-color': Color.parseCss('#000')?.withAlpha(0.38),
      '--ag-subheader-toolbar-background-color': Color.parseCss('#e2e9eb')?.withAlpha(0.5),
      '--ag-row-border-color': Color.parseCss('#bdc3c7')?.withAlpha(0.58),
      '--ag-chip-background-color': Color.parseCss('#000')?.withAlpha(0.1),
      '--ag-selected-row-background-color': Color.parseCss('#0091ea')?.withAlpha(0.28),
      '--ag-header-column-separator-color': Color.parseCss('#bdc3c7')?.withAlpha(0.5),
      '--ag-input-disabled-border-color': Color.parseCss('#95a5a6')?.withAlpha(0.3),
    },
  },
  {
    value: 'minimal',
    label: 'Minimal',
    description: 'Plain grid with light grey chrome',
  },
  {
    value: 'none',
    label: 'None',
    description: 'Plain grid and chrome',
  },
]);
