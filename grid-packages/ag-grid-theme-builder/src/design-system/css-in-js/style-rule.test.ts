import { expect, test } from 'vitest';
import { ag, any, el, pseudo } from './style-rule';

test(`Build selectors`, () => {
  expect(el.input.toString()).toBe('input');
  expect(el.input.not(el.div).toString()).toBe('input:not(div)');
  expect(el.input.firstChild.toString()).toBe('input:first-child');
  expect(el.input.notFirstChild.toString()).toBe('input:not(:first-child)');
  expect(el.input.nthChild(3).hover.toString()).toBe('input:nth-child(3):hover');
});

test(`Combining multiple selectors`, () => {
  expect(el.input.not(pseudo.active.or(pseudo.firstChild)).toString()).toBe(
    'input:not(:active):not(:first-child)',
  );
  expect(ag.root.or(ag.rootWrapper).toString()).toBe('.ag-root, .ag-root-wrapper');
  expect(any(ag.root, ag.rootWrapper).toString()).toBe('.ag-root, .ag-root-wrapper');
  expect(any(ag.root, ag.rootWrapper).firstChild.toString()).toBe(
    '.ag-root:first-child, .ag-root-wrapper:first-child',
  );
});
