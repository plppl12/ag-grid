import { expect, test } from 'vitest';
import { ColorExpression, literal } from '.';
import { renderRules } from './render';
import * as dsl from './style-rule';

// allow any property access for test purposes
// type MockEl = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "root";
const el = dsl.el as dsl.SelectorDslFactory<string>;
const ag = dsl.ag as dsl.SelectorDslFactory<string>;

test(`Render nested rules`, () => {
  const rules = el.root({
    content: literal('base'),
  });
  expect(renderRules(rules)).toMatchInlineSnapshot(`
    "root {
    	content: base;
    }
    "
  `);
});

test(`Render nested rules`, () => {
  const rules = el.root({
    content: literal('base'),

    containing: ag.a({
      content: literal('loose'),

      containing: ag.b({
        content: literal('loose loose'),
      }),
      and: ag.c({
        content: literal('loose tight'),
      }),
    }),
    and: ag.d({
      content: literal('tight'),

      containing: ag.e({
        content: literal('tight loose'),
      }),
      and: ag.f({
        content: literal('tight tight'),
      }),
    }),
  });
  expect(renderRules(rules)).toMatchInlineSnapshot(`
    "root {
    	content: base;
    }
    root .ag-a {
    	content: loose;
    }
    root .ag-a .ag-b {
    	content: loose loose;
    }
    root .ag-a.ag-c {
    	content: loose tight;
    }
    root.ag-d {
    	content: tight;
    }
    root.ag-d .ag-e {
    	content: tight loose;
    }
    root.ag-d.ag-f {
    	content: tight tight;
    }
    "
  `);
});

// test(`Render RTL versions`, () => {
//   const rules = el.rootWrapper({
//     leading: px(1),
//     trailing: px(2),
//     paddingLeading: px(3),
//     paddingTrailing: px(4),
//     borderLeadingWidth: px(5),
//     borderTrailingWidth: px(6),

//     alwaysLeft: px(7),
//     alwaysRight: px(8),
//     paddingAlwaysLeft: px(9),
//     paddingAlwaysRight: px(10),
//     borderAlwaysLeftWidth: px(11),
//     borderAlwaysRightWidth: px(12),
//   });
//   expect(renderRules(rules)).toMatchInlineSnapshot(`
//     "root {
//     	left: 7px;
//     	right: 8px;
//     	padding-left: 9px;
//     	padding-right: 10px;
//     	border-left-width: 11px;
//     	border-right-width: 12px;
//     }
//     .ag-ltr root {
//     	left: 1px;
//     	right: 2px;
//     	padding-left: 3px;
//     	padding-right: 4px;
//     	border-left-width: 5px;
//     	border-right-width: 6px;
//     }
//     .ag-rtl root {
//     	right: 1px;
//     	left: 2px;
//     	padding-right: 3px;
//     	padding-left: 4px;
//     	border-right-width: 5px;
//     	border-left-width: 6px;
//     }
//     "
//   `);
// });

// test(`Render a compound property value`, () => {
//   const rules = el.a({
//     border: [solid, px(1), red],
//   });
//   expect(renderRules(rules)).toMatchInlineSnapshot(`
//     "a {
//     	border: solid 1px red;
//     }
//     "
//   `);
// });

// test(`RTL rules don't apply to property names`, () => {
//   const rules = el.leading({
//     color: red,
//   });
//   expect(renderRules(rules)).toMatchInlineSnapshot(`
//     ".ag-leading {
//     	color: red;
//     }
//     "
//   `);
// });

// test(`Convert`, () => {
//   const rules = el.a({
//     webkitOverflowScrolling: literal('x'),
//     msOverflowStyle: literal('y'),
//     mozAppearance: literal('z'),
//   });
//   expect(renderRules(rules)).toMatchInlineSnapshot(`
//     "a {
//     	-webkit-overflow-scrolling: x;
//     	-ms-overflow-style: y;
//     	-moz-appearance: z;
//     }
//     "
//   `);
// });

// test(`Render @keyframes blocks`, () => {
//   const rule = keyframes({
//     id: 'my-id',
//     from: {
//       color: red,
//       paddingAlwaysLeft: px(1),
//     },
//     to: {
//       color: green,
//       paddingAlwaysLeft: px(2),
//     },
//   });
//   expect(renderRules([rule])).toMatchInlineSnapshot(`
//     "@keyframes my-id {
//     	from {
//     		color: red;
//     		padding-left: 1px;
//     	}
//     	to {
//     		color: green;
//     		padding-left: 2px;
//     	}
//     }
//     "
//   `);
// });

// test(`@keyframes block throws error with RTL styles`, () => {
//   const rule = keyframes({
//     id: 'my-id',
//     from: {
//       color: red,
//       paddingLeading: px(1),
//     },
//     to: {
//       color: green,
//       paddingTrailing: px(2),
//     },
//   });
//   expect(() => renderRules([rule])).toThrowErrorMatchingInlineSnapshot(
//     '"RTL styles (paddingLeading: 1px) not allowed inside @keyframes my-id"',
//   );
// });

// test(`Render @font-face blocks`, () => {
//   const rule = fontFace({
//     fontFamily: literal('monospace'),
//     src: literal('url(./some-url)'),
//     fontWeight: literal('bold'),
//   });
//   expect(renderRules([rule])).toMatchInlineSnapshot(`
//     "@font-face {
//     	font-family: monospace;
//     	src: url(./some-url);
//     	font-weight: bold;
//     }
//     "
//   `);
// });

// test(`Render @media blocks`, () => {
//   const rule = media({
//     query: 'print',
//     rules: [
//       el.one(
//         {
//           color: red,
//           paddingAlwaysLeft: px(1),
//         },
//         el.two({
//           color: blue,
//           paddingLeading: px(2),
//         }),
//       ),
//     ],
//   });
//   expect(renderRules([rule])).toMatchInlineSnapshot(`
//     "@media print {
//     	.ag-one {
//     		color: red;
//     		padding-left: 1px;
//     	}
//     	.ag-one .ag-two {
//     		color: blue;
//     	}
//     	.ag-ltr .ag-one .ag-two {
//     		padding-left: 2px;
//     	}
//     	.ag-rtl .ag-one .ag-two {
//     		padding-right: 2px;
//     	}
//     }
//     "
//   `);
// });

const red = literal('red') as unknown as ColorExpression;
const green = literal('green') as unknown as ColorExpression;
const blue = literal('blue') as unknown as ColorExpression;
