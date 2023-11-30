import { expect, test } from 'vitest';
import { hex, rgb } from '.';

test(`hex`, () => {
  // 3 digit
  expect(hex('#fff')).toEqual(rgb(255, 255, 255, 1));
  expect(hex('#fff', 0.5)).toEqual(rgb(255, 255, 255, 0.5));

  // 4 digit
  const hex88 = 0x88 / 256;
  expect(hex('#fff8')).toEqual(rgb(255, 255, 255, hex88));
  expect(hex('#fff8', 0.5)).toEqual(rgb(255, 255, 255, hex88 / 2));

  // 6 digit
  expect(hex('#ff0080')).toEqual(rgb(255, 0, 128, 1));
  expect(hex('#ff0080', 0)).toEqual(rgb(255, 0, 128, 0));
  expect(hex('#ff0080', 0.5)).toEqual(rgb(255, 0, 128, 0.5));

  // 8 digit
  expect(hex('#ff008080')).toEqual(rgb(255, 0, 128, 0.5));
  expect(hex('#ff008080', 0.5)).toEqual(rgb(255, 0, 128, 0.25));
});
