import { Dimension } from 'model/values/Dimension';
import { Scheme } from './Scheme';

export const compactnessScheme = new Scheme('compactness', [
  {
    value: 'very-compact',
    variables: {
      '--ag-grid-size': new Dimension(4, 'px'),
    },
  },
  {
    value: 'compact',
    variables: {
      '--ag-grid-size': new Dimension(5, 'px'),
    },
  },
  {
    value: 'normal',
    variables: {
      '--ag-grid-size': new Dimension(6, 'px'),
    },
  },
  {
    value: 'spacious',
    variables: {
      '--ag-grid-size': new Dimension(7, 'px'),
    },
  },
  {
    value: 'very-spacious',
    variables: {
      '--ag-grid-size': new Dimension(8, 'px'),
    },
  },
]);
