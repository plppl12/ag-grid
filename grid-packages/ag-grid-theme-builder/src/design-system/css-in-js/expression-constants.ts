import { dimension, rgb } from '.';
import { literal } from './literal';

export const block = literal('block');
export const none = literal('none');
export const flex = literal('flex');
export const auto = literal('auto');
export const row = literal('row');
export const rowReverse = literal('row-reverse');
export const column = literal('column');
export const columnReverse = literal('column-reverse');
export const inlineBlock = literal('inline-block');
export const inlineFlex = literal('inline-flex');

export const wrap = literal('wrap');
export const nowrap = literal('nowrap');

export const absolute = literal('absolute');
export const relative = literal('relative');
export const sticky = literal('sticky');

export const solid = literal('solid');
export const dotted = literal('dotted');
export const dashed = literal('dashed');

export const zero = dimension(0, '');
export const one = dimension(1, '');

export const hidden = literal('hidden');
export const visible = literal('visible');

export const normal = literal('normal');
export const bold = literal('bold');
export const semiBold = literal('600');

export const transparent = rgb(0, 0, 0, 0);

export const center = literal('center');
export const flexStart = literal('flex-start');
export const flexEnd = literal('flex-end');

export const scroll = literal('scroll');
export const spaceBetween = literal('space-between');

export const stretch = literal('stretch');
export const table = literal('table');
export const tableCell = literal('table-cell');
export const tableRow = literal('table-row');
export const text = literal('text');
