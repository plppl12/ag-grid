import { expect, test } from 'vitest';
import { _, any } from './style-rule';

test(`Build selectors`, () => {
  expect(_.input.toString()).toBe('input');
  expect(_.input.not(_.div).toString()).toBe('input:not(div)');
  expect(_.input.firstChild.toString()).toBe('input:first-child');
  expect(_.input.not(_.firstChild).toString()).toBe('input:not(:first-child)');
  expect(_.input.nthChild(3).hover.toString()).toBe('input:nth-child(3):hover');
});

test(`Combining multiple selectors`, () => {
  expect(_.input.not(_.active.or(_.firstChild)).toString()).toBe(
    'input:not(:active):not(:first-child)',
  );
  expect(_.root.or(_.rootWrapper).toString()).toBe('.ag-root, .ag-root-wrapper');
  expect(any(_.root, _.rootWrapper).toString()).toBe('.ag-root, .ag-root-wrapper');
  expect(any(_.root, _.rootWrapper).firstChild.toString()).toBe(
    '.ag-root:first-child, .ag-root-wrapper:first-child',
  );
});
