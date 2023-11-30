import { toKebabCase } from '../utils';

export const pseudoClasses = [
  'active',
  'notActive',
  'disabled',
  'notDisabled',
  'firstChild',
  'notFirstChild',
  'lastChild',
  'notLastChild',
  'firstOfType',
  'notFirstOfType',
  'focus',
  'focusVisible',
  'focusWithin',
  'hover',
  'invalid',
] as const;

export type PseudoClass = (typeof pseudoClasses)[number];

// notDisabled -> :not(:disabled) and so forth
export const renderPseudoClass = (pc: string) => {
  const css = toKebabCase(pc);
  return css.startsWith('not-') ? `:not(:${css.slice(4)})` : `:${css}`;
};
