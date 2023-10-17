import { indexBy, titleCase } from './utils';

export class Theme {
  public readonly class: string;
  public readonly extends: Theme | null;

  constructor(className: string, extendsTheme: Theme | null) {
    this.class = className;
    this.extends = extendsTheme;
  }

  get label() {
    return titleCase(this.class, 'ag-theme-');
  }
}

export const baseTheme = new Theme('ag-theme-base', null);

export const alpineTheme = new Theme('ag-theme-alpine', baseTheme);

export const alpineDarkTheme = new Theme('ag-theme-alpine-dark', alpineTheme);

export const balhamTheme = new Theme('ag-theme-balham', baseTheme);

export const balhamDarkTheme = new Theme('ag-theme-balham-dark', balhamTheme);

export const materialTheme = new Theme('ag-theme-material', baseTheme);

export const allThemes: ReadonlyArray<Theme> = [
  baseTheme,
  alpineTheme,
  alpineDarkTheme,
  balhamTheme,
  balhamDarkTheme,
  materialTheme,
];

const themesByName = indexBy(allThemes, 'class');

export const getTheme = (themeClass: string): Theme | null => themesByName[themeClass] || null;

export const getThemeOrThrow = (themeClass: string) => {
  const theme = getTheme(themeClass);
  if (theme == null) {
    throw new Error(`Invalid theme name "${themeClass}"`);
  }
  return theme;
};

export const getThemeChain = (theme: Theme): ReadonlyArray<Theme> => {
  const result = [theme];
  let parent: Theme | null = theme.extends;
  while (parent) {
    result.push(parent);
    parent = parent.extends;
  }
  return result;
};

export type ColorBlend = {
  destination: string;
  source: string;
  alpha?: number;
};
