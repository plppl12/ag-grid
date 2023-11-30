import { Input } from './Input';

// const allBorderStyles = [solid, dotted, dashed, none];

// TODO use Joy select
export const BorderStyleInput: Input<'borderStyle'> = () => {
  return <></>;
};
// export const BorderStyleInput: Input<'borderStyle'> = ({ value, onValueChange, focus }) => {
//   return (
//     <select
//       ref={useFocusInput(focus)}
//       value={value.lineStyle}
//       onChange={(e) => {
//         onValueChange(new BorderStyle(e.target.value as BorderStyleToken));
//       }}
//     >
//       {options}
//     </select>
//   );
// };

// const options = (
//   <>
//     {allBorderStyles.map((style) => (
//       <option key={style} value={style}>
//         {style}
//       </option>
//     ))}
//   </>
// );
