import { StyleRule } from './render';
import { CssProperties } from './types/CssProperties';
import { ElementName } from './types/ElementName';
import { GridClassName } from './types/GridClassName';
import { PseudoClass, pseudoClasses, renderPseudoClass } from './types/PseudoClass';
import { toKebabCase } from './utils';

export type Selector = {
  selectors: string[];
};

export type SelectorDsl = Selector & SelectorDslCall & SelectorDslMethods & SelectorDslProperties;

export type SelectorDslFactory<T extends string> = Record<T, SelectorDsl> & SelectorDslProperties;

export type SelectorDslCall = {
  (properties: DeclarationsAndNestedRules): StyleRule[];
};

export type SelectorDslMethods = {
  not(other: Selector): SelectorDsl;
  or(other: Selector): SelectorDsl;
  nthChild(number: number): SelectorDsl;
  toString(): string;
};

type SelectorDslProperties = {
  [K in PseudoClass | GridClassName]: SelectorDsl;
};

type DeclarationsAndNestedRules = CssProperties & {
  containing?: StyleRule[] | StyleRule[][];
  and?: StyleRule[] | StyleRule[][];
};

const propertyToSelector = new Map<string, string>(
  pseudoClasses.map((property) => [property, renderPseudoClass(property)]),
);

const selectorDsl = (isElement: boolean, initialSelectors?: string[] | null): SelectorDsl => {
  const selector: Selector & SelectorDslMethods = {
    selectors: initialSelectors || [''],
    not(other: Selector) {
      return append(other.selectors.map((s) => `:not(${s})`).join(''));
    },
    or(other: Selector) {
      for (const otherSelector of other.selectors) {
        this.selectors.push(otherSelector);
      }
      return dsl;
    },
    nthChild(number: number) {
      return append(`:nth-child(${number})`);
    },
    toString() {
      return this.selectors.join(', ');
    },
  };

  const append = (fragment: string) => {
    for (let i = 0; i < selector.selectors.length; i++) {
      selector.selectors[i] += fragment;
    }
    return dsl;
  };

  const call: SelectorDslCall = (properties) =>
    flattenDeclarationsAndNestedRules(properties, selector.selectors);

  const dsl: SelectorDsl = new Proxy(call as any, {
    get: (_, prop) => {
      if (typeof prop === 'symbol' || prop in selector) return (selector as any)[prop];
      const predefined = propertyToSelector.get(prop);
      if (predefined != null) {
        return append(predefined);
      }
      return isElement ? append(prop) : append('.ag-' + toKebabCase(prop));
    },
  });

  return dsl;
};

const selectorDslFactory = <T extends string>(isElement: boolean): SelectorDslFactory<T> => {
  return new Proxy({} as any as any, {
    get: (_, prop) => {
      return selectorDsl(isElement)[prop as keyof SelectorDsl];
    },
  });
};

export const ag = selectorDslFactory<GridClassName>(false);
export const el = selectorDslFactory<ElementName>(true);
export const pseudo = selectorDslFactory<PseudoClass>(true);

export const any = (...selectors: ReadonlyArray<Selector>) =>
  selectorDsl(false, selectors.map((s) => s.selectors).flat());

const flattenDeclarationsAndNestedRules = (
  declarations: DeclarationsAndNestedRules,
  parentSelectors: string[],
): StyleRule[] => {
  const { containing, and } = declarations;
  declarations = { ...declarations };
  delete declarations.containing;
  delete declarations.and;
  const parentRule: StyleRule = {
    type: 'style',
    properties: declarations,
    selectors: parentSelectors,
  };
  let rules = [parentRule];
  if (containing) {
    rules = [...rules, ...flattenStyleRules(parentRule, containing, false)];
  }
  if (and) {
    rules = [...rules, ...flattenStyleRules(parentRule, and, true)];
  }
  return rules;
};

const flattenStyleRules = (
  parent: StyleRule,
  children: StyleRule[] | StyleRule[][],
  tightJoin: boolean,
): StyleRule[] =>
  children.flat().map((child): StyleRule => {
    const separator = tightJoin ? '' : ' ';
    return {
      type: 'style',
      properties: child.properties,
      selectors: parent.selectors.flatMap((parentSelector) =>
        child.selectors.map((childSelector) => parentSelector + separator + childSelector),
      ),
    };
  });
