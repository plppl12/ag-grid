import {
  CalcExpression,
  ColorExpression,
  ColorMixExpression,
  DimensionExpression,
  Expression,
  VarExpression,
  dimension,
  rgb,
  transparent,
} from 'design-system/css-in-js';

export type VariableValues = Record<string, Expression | null | undefined>;

export const resolve = (expr: Expression, values: VariableValues) => {
  return doResolve(expr, values, []);
};

const doResolve = (expr: Expression, values: VariableValues, stack: Expression[]) => {
  if (stack.length >= 100) {
    const cssStack = stack.map((e) => e.css);
    const recursionIndex = cssStack.indexOf(cssStack[0], 1);
    const path = cssStack.slice(0, recursionIndex == -1 ? 10 : recursionIndex + 1).join(' -> ');
    throw new Error(`Infinite recursion detected while evaluating ${path}`);
  }
  if (expr instanceof CalcExpression) {
    return resolveCalc(expr, values, [...stack, expr]);
  } else if (expr instanceof ColorMixExpression) {
    return resolveColorMix(expr, values, [...stack, expr]);
  } else if (expr instanceof VarExpression) {
    return resolveVar(expr, values, [...stack, expr]);
  }
  return expr;
};

const resolveCalc = (
  expr: CalcExpression,
  values: VariableValues,
  stack: Expression[],
): DimensionExpression => {
  let units = '';
  const expression = expr.parts
    .map((part): number | string => {
      if (typeof part === 'number' || typeof part === 'string') {
        return part;
      }
      const resolved = doResolve(part, values, stack);
      if (!(resolved instanceof DimensionExpression)) {
        throw new Error(
          `Expected ${part.css} to resolve to a dimension, but got ${resolved?.css} (while evaluating ${expr.css})`,
        );
      }
      units ||= resolved.units;
      if (units && resolved.units && units !== resolved.units) {
        throw new Error(
          `Mixed units in calc expression ${expr.css} (${units} and ${resolved.units})`,
        );
      }
      return +resolved.number;
    })
    .join(' ');
  try {
    // sanity check that we're not about to evaluate anything dangerous
    if (/[^0-9.+\-*/\s]/i.test(expression)) {
      throw new Error();
    }
    const number = eval(expression) as unknown;
    if (typeof number !== 'number' || isNaN(number)) throw new Error();
    return dimension(number, units);
  } catch {
    throw new Error(
      `Invalid expression (${expression}) (while evaluating ${describeStack(stack)})`,
    );
  }
};

const describeStack = (stack: Expression[]) => stack.map((e) => e.css).join(' -> ');

const resolveColorMix = (
  expr: ColorMixExpression,
  values: VariableValues,
  stack: Expression[],
): ColorExpression => {
  const getResolvedColor = (value: Expression): ColorExpression => {
    const resolved = doResolve(value, values, stack);
    if (!(resolved instanceof ColorExpression)) {
      throw new Error(
        `Expected ${value.css} to resolve to a color, but got ${resolved?.css} (while evaluating ${expr.css})`,
      );
    }
    return resolved;
  };

  // blend the two colors using "source over destination" alpha compositing -
  // https://en.wikipedia.org/wiki/Alpha_compositing - which produces the same
  // effect as the CSS blend:
  // color-mix(in srgb, background, foreground, foregroundAmount)
  const bg = getResolvedColor(expr.background);
  const fg = getResolvedColor(expr.foreground);

  const fgR = byteToFloat(fg.r);
  const fgG = byteToFloat(fg.g);
  const fgB = byteToFloat(fg.b);
  const fgA = fg.a * expr.foregroundAmount;
  const bgR = byteToFloat(bg.r);
  const bgG = byteToFloat(bg.g);
  const bgB = byteToFloat(bg.b);
  const bgA = bg.a * (1 - fgA);

  const outA = bgA + fgA;
  if (outA === 0) return transparent;
  return rgb(
    floatToByte((fgR * fgA + bgR * bgA) / outA),
    floatToByte((fgG * fgA + bgG * bgA) / outA),
    floatToByte((fgB * fgA + bgB * bgA) / outA),
    outA,
  );
};

const floatToByte = (f: number) => Math.floor(f >= 1 ? 255 : f * 256);
const byteToFloat = (b: number) => (b >= 255 ? 1 : b / 256);

const resolveVar = (
  { propertyName }: VarExpression,
  values: VariableValues,
  stack: Expression[],
): Expression | null => {
  const value = values[propertyName] || null;
  return value != null ? doResolve(value, values, stack) : null;
};
