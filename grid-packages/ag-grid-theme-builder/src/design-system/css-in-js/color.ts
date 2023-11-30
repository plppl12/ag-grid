import { clamp } from 'model/utils';
import { Expression } from './Expression';

export const rgb = (r: number, g: number, b: number, a = 1) => new ColorExpression(r, g, b, a);

export const hex = <T extends string>(input: HexColorString<T>, alpha = 1) => {
  let digits: string = input;
  digits = digits.substring(1);
  if (digits.length === 3) digits += 'f';
  if (digits.length === 4)
    digits =
      digits[0] + digits[0] + digits[1] + digits[1] + digits[2] + digits[2] + digits[3] + digits[3];
  else if (digits.length === 6) digits += 'ff';
  const value = parseInt(digits, 16);
  if (digits.length !== 8 || isNaN(value)) throw new Error(`Invalid hex "${digits}"`);
  const parsedAlpha = value % 0x100;
  return new ColorExpression(
    (value >>> 24) % 0x100,
    (value >>> 16) % 0x100,
    (value >>> 8) % 0x100,
    (parsedAlpha === 255 ? 1 : parsedAlpha / 256) * alpha,
  );
};

export class ColorExpression extends Expression {
  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number,
  ) {
    r = Math.round(clamp(r, 0, 255));
    g = Math.round(clamp(g, 0, 255));
    b = Math.round(clamp(b, 0, 255));
    a = clamp(a, 0, 1);
    super(a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

type Hex1 =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'A'
  | 'b'
  | 'B'
  | 'c'
  | 'C'
  | 'd'
  | 'D'
  | 'e'
  | 'E'
  | 'f'
  | 'F';

type Hex2<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex1
    ? T
    : never
  : never;

type Hex3<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex2<Rest>
    ? T
    : never
  : never;

type Hex4<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex3<Rest>
    ? T
    : never
  : never;

type Hex5<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex4<Rest>
    ? T
    : never
  : never;

type Hex6<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex5<Rest>
    ? T
    : never
  : never;

type Hex7<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex6<Rest>
    ? T
    : never
  : never;

type Hex8<T extends string> = T extends `${Hex1}${infer Rest}`
  ? Rest extends Hex7<Rest>
    ? T
    : never
  : never;

// A valid hex color string e.g. #f00 with 3, 4, 6 or 8 digits
type HexColorString<T extends string> = T extends `#${infer Rest}`
  ? // else (if T is a string literal) require it's in the right format
    Rest extends Hex3<Rest> | Hex4<Rest> | Hex6<Rest> | Hex8<Rest>
    ? T
    : never
  : never;
