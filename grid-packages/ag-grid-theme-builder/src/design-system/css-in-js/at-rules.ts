import { AtRule, StyleRule } from './render';
import { CssProperties } from './types/CssProperties';

export type KeyframesArgs = {
  id: string;
  from: CssProperties;
  to: CssProperties;
};

export const keyframes = ({ id, from, to }: KeyframesArgs): AtRule => ({
  type: 'at',
  rule: `@keyframes ${id}`,
  styles: [
    {
      type: 'style',
      selectors: ['from'],
      properties: from,
    },
    {
      type: 'style',
      selectors: ['to'],
      properties: to,
    },
  ],
  allowRtl: false,
});

export const fontFace = (properties: CssProperties): AtRule => ({
  type: 'at',
  rule: `@font-face`,
  properties,
  allowRtl: false,
});

export type MediaArgs = {
  query: string;
  rules: StyleRule[][];
};

export const media = ({ query, rules }: MediaArgs): AtRule => ({
  type: 'at',
  rule: `@media ${query}`,
  styles: rules.flat(),
  allowRtl: true,
});
