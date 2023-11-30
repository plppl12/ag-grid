import { withErrorBoundary } from 'components/ErrorBoundary';
import { Feature } from 'model/features';
import { memo } from 'react';

export type VariableControlProps = {
  variableName: string;
  feature?: Feature;
};

const VariableControl = (_: VariableControlProps): JSX.Element => {
  return <></>;
};
// const VariableControl = ({ variableName, feature }: VariableControlProps): JSX.Element => {
//   const [value, setValue] = useVariableValueAtom(variableName);
//   const getVariableDefault = useGetVariableDefault();
//   const info = getVariableInfoOrThrow(variableName);
//   const description = useVariableDescription(variableName);

//   const [error, setError] = useState<string | null>(null);
//   const [shouldFocus, setShouldFocus] = useState(false);

//   let prefix = feature?.commonVariablePrefix;
//   if (!prefix || variableName === prefix || !variableName.startsWith(prefix)) {
//     prefix = '--ag-';
//   }
//   const label = titleCase(variableName, prefix);
//   if (!value) {
//     const defaultValue = getVariableDefault(variableName);
//     return (
//       <Control
//         label={label}
//         help={description}
//         onEdit={() => {
//           setShouldFocus(true);
//           setValue(defaultValue);
//         }}
//       >
//         <DefaultValue value={defaultValue} />
//       </Control>
//     );
//   }

//   const renderInput = (): ReactElement => {
//     const mismatchError = `${value.type} value provided for ${info.type} variable (${variableName})`;
//     switch (value.type) {
//       case 'color':
//         if (info.type !== 'color') throw new Error(mismatchError);
//         return (
//           <ColorInput
//             value={value}
//             info={info}
//             error={error}
//             onErrorChange={setError}
//             onValueChange={setValue}
//             focus={shouldFocus}
//           />
//         );
//       case 'dimension':
//         if (info.type !== 'dimension') throw new Error(mismatchError);
//         return (
//           <DimensionInput
//             value={value}
//             info={info}
//             error={error}
//             onErrorChange={setError}
//             onValueChange={setValue}
//             focus={shouldFocus}
//           />
//         );
//       case 'border':
//         if (info.type !== 'border') throw new Error(mismatchError);
//         return (
//           <BorderInput
//             value={value}
//             info={info}
//             error={error}
//             onErrorChange={setError}
//             onValueChange={setValue}
//             focus={shouldFocus}
//           />
//         );
//       case 'borderStyle':
//         if (info.type !== 'borderStyle') throw new Error(mismatchError);
//         return (
//           <BorderStyleInput
//             value={value}
//             info={info}
//             error={error}
//             onErrorChange={setError}
//             onValueChange={setValue}
//             focus={shouldFocus}
//           />
//         );
//       case 'display':
//         if (info.type !== 'display') throw new Error(mismatchError);
//         return (
//           <DisplayInput
//             value={value}
//             info={info}
//             error={error}
//             onErrorChange={setError}
//             onValueChange={setValue}
//             focus={shouldFocus}
//           />
//         );
//     }
//   };

//   return (
//     <Control
//       label={label}
//       error={error}
//       help={description}
//       onReset={() => {
//         setValue(null);
//       }}
//     >
//       {renderInput()}
//     </Control>
//   );
// };

const VariableControlWrapped = memo(withErrorBoundary(VariableControl));
export { VariableControlWrapped as VariableControl };
