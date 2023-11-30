import { block, px, rgb, solid } from 'design-system/css-in-js';

export const colorDefaultValue = rgb(128, 128, 128, 1);
export const dimensionDefaultValue = px(1);
export const borderStyleDefaultValue = solid;
export const borderDefaultValue = [
  borderStyleDefaultValue,
  dimensionDefaultValue,
  colorDefaultValue,
];

export const displayDefaultValue = block;

// export const getVariableDefaultValue = (variableName: string): PropertyValue => {
//   const info = getVariableInfoOrThrow(variableName);
//   switch (info.type) {
//     case 'color':
//       return colorDefaultValue;
//     case 'dimension':
//       return dimensionDefaultValue;
//     case 'border':
//       return borderDefaultValue;
//     case 'borderStyle':
//       return borderStyleDefaultValue;
//     case 'display':
//       return displayDefaultValue;
//   }
// };
