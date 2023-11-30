import { Expression } from './Expression';

export const literal = (css: string) => new LiteralExpression(css);

export class LiteralExpression extends Expression {
  constructor(readonly css: string) {
    super(css);
  }
}
