import { Input } from './Input';

export const DisplayInput: Input<'display'> = () => {
  return <></>;
};
// export const DisplayInput: Input<'display'> = ({ value, onValueChange, focus }) => {
//   return (
//     <InputElement
//       ref={useFocusInput(focus)}
//       type="checkbox"
//       checked={value.display !== 'none'}
//       onChange={(e) => onValueChange(new Display(e.target.checked ? 'block' : 'none'))}
//     />
//   );
// };
