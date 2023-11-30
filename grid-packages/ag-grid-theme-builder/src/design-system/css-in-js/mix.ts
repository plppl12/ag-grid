import { clamp } from 'model/utils';
import { ColorExpression, VarExpression } from '.';
import { Expression } from './Expression';

type MixableExpression = ColorExpression | ColorMixExpression | VarExpression;

export const mix = (
  background: MixableExpression,
  foreground: MixableExpression,
  foregroundAmount: number,
) => new ColorMixExpression(background, foreground, foregroundAmount);

export class ColorMixExpression extends Expression {
  constructor(
    readonly background: MixableExpression,
    readonly foreground: MixableExpression,
    readonly foregroundAmount: number,
  ) {
    foregroundAmount = clamp(foregroundAmount, 0, 1);
    const foregroundPercent = Math.round(foregroundAmount * 100);
    super(`color-mix(in srgb, ${background.css}, ${foreground.css}, ${foregroundPercent}%)`);
    this.foregroundAmount = foregroundAmount;
  }
}
