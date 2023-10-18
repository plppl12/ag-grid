import { Atom, WritableAtom, createStore } from 'jotai';
import { Feature, getFeatureOrThrow } from 'model/features';
import { Scheme, SchemeValue } from 'model/schemes/Scheme';
import { chromeColorScheme } from 'model/schemes/chromeColorScheme';
import { Theme, alpineDarkTheme, alpineTheme, getThemeOrThrow } from 'model/themes';
import { logErrorMessage, mapPresentObjectValues } from 'model/utils';
import { VariableValues, parseCssString } from 'model/values';
import { getVariableInfoOrThrow } from 'model/variableInfo';
import { throttle } from 'throttle-debounce';
import { enabledFeaturesAtom } from './enabledFeatures';
import { parentThemeAtom } from './parentTheme';
import { getSchemeValueAtom, schemeValuesAtom } from './schemes';
import { themeLabelAtom } from './theme';
import { allValueAtoms, valuesAtom } from './values';

export const initStore = () => {
  const defaultTheme =
    typeof window === 'object' &&
    getComputedStyle(window.document.documentElement).getPropertyValue('color-scheme') === 'dark'
      ? alpineDarkTheme
      : alpineTheme;

  const store = createStore();
  restoreValue('themeLabel', deserializeString, store, themeLabelAtom);
  restoreValue('parentTheme', deserializeTheme, store, parentThemeAtom, defaultTheme);
  restoreValue('enabledFeatures', deserializeEnabledFeatures, store, enabledFeaturesAtom);
  restoreValue('values', deserializeValues, store, valuesAtom);
  restoreValues('schemeValues', deserializeSchemeValue(chromeColorScheme), store, getSchemeValueAtom);

  const saveState = throttle(
    100,
    () => {
      persistValue('themeLabel', serializeString, store, themeLabelAtom);
      persistValue('parentTheme', serializeTheme, store, parentThemeAtom);
      persistValue('enabledFeatures', serializeEnabledFeatures, store, enabledFeaturesAtom);
      persistValue('values', serializeValues, store, valuesAtom);
      persistValue('schemeValues', serializeSchemeValues, store, schemeValuesAtom);
    },
    { noLeading: true },
  );
  for (const atom of [
    schemeValuesAtom,
    themeLabelAtom,
    parentThemeAtom,
    enabledFeaturesAtom,
    ...allValueAtoms,
  ]) {
    store.sub(atom, saveState);
  }

  return store;
};

type Store = ReturnType<typeof initStore>;

const persistValue = <T>(
  key: string,
  serialize: (value: T) => unknown,
  store: Store,
  atom: Atom<T>,
) => {
  const value = store.get(atom);
  if (value === undefined) {
    localStorage.removeItem(storageKey(key));
    return;
  }
  localStorage.setItem(storageKey(key), JSON.stringify(serialize(value)));
};

const restoreValue = <T>(
  key: string,
  deserialize: (value: unknown) => T,
  store: Store,
  atom: WritableAtom<T, [T], void>,
  defaultValue?: T,
) => {
  const storedString = localStorage.getItem(storageKey(key));
  if (storedString == null) {
    if (defaultValue != null) {
      store.set(atom, defaultValue);
    }
    return;
  }
  let storedValue: unknown;
  try {
    storedValue = JSON.parse(storedString);
  } catch {
    logErrorMessage(`Failed to parse stored JSON for ${key}: ${storedString}`);
    return;
  }
  try {
    store.set(atom, deserialize(storedValue));
  } catch (e) {
    logErrorMessage(`Failed to deserialize value for ${key}: ${storedString}`, e);
    return;
  }
};

const restoreValues = <T>(
  key: string,
  deserialize: (value: unknown) => T,
  store: Store,
  getAtom: (name: string) => WritableAtom<T, [T], void>
) => {
  const storedString = localStorage.getItem(storageKey(key));
  if (storedString == null) {
    return;
  }
  let storedValue: unknown;
  try {
    storedValue = JSON.parse(storedString);
  } catch {
    logErrorMessage(`Failed to parse stored JSON for ${key}: ${storedString}`);
    return;
  }
  if (!storedValue || typeof storedValue !== "object") {
    return logErrorMessage(`Expected an object for ${key}, got ${storedString}`);
  }
  try {
    for (const name of Object.keys(storedValue)) {
      store.set(getAtom(name), deserialize(storedValue));
    }
  } catch (e) {
    return logErrorMessage(`Failed to deserialize value for ${key}: ${storedString}`, e);
  }
};

const storageKey = (key: string) => `theme-builder.theme-state.${key}`;

const serializeTheme = (theme: Theme) => theme.class;

const deserializeTheme = (themeClass: unknown) => {
  if (typeof themeClass !== 'string') {
    throw new Error('expected string');
  }
  return getThemeOrThrow(themeClass);
};

const serializeString = (value: string) => value;

const deserializeString = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new Error('expected string');
  }
  return value;
};

type SerializedSchemeValue = {optionValue: string, variables: SerializedVariableValues}

const serializeSchemeValue = ({option, variables}: SchemeValue): SerializedSchemeValue => ({optionValue: option.value, variables:});

Next up:
1. Finish this refactor, fix compile ErrorSharp, get everything saving
2. I'm storing variables in two places. No need to store in scheme value
2. Use variable overrides in render

const deserializeSchemeValue =
  (scheme: Scheme) =>
  (value: unknown): SchemeValue => {
    if (!value || typeof value !== 'object') {
      throw new Error('expected object');
    }
    const option = scheme.options.find((option) => option.value === value);
    if (!option) {
      throw new Error(`Invalid option "${value}" for scheme "${scheme.name}"`);
    }
    return option;
  };

const serializeEnabledFeatures = (features: ReadonlyArray<Feature>) => features.map((f) => f.name);

const deserializeEnabledFeatures = (featureNames: unknown): ReadonlyArray<Feature> => {
  if (!Array.isArray(featureNames)) {
    throw new Error('expected array');
  }
  return featureNames.map(getFeatureOrThrow);
};

type SerializedVariableValues = Record<string, string>;

const serializeValues = (values: VariableValues) =>
  mapPresentObjectValues(values, (value) => value.toCss());

const deserializeValues = (serialized: unknown): VariableValues => {
  if (!serialized || typeof serialized !== 'object' || Array.isArray(serialized)) {
    throw new Error('expected object');
  }
  const result: VariableValues = {};
  for (const [variableName, serializedValue] of Object.entries(
    serialized as Record<string, unknown>,
  )) {
    if (typeof serializedValue !== 'string') {
      throw new Error(`Expected string value for ${variableName} key`);
    }
    const info = getVariableInfoOrThrow(variableName);
    const value = parseCssString(info, serializedValue);
    if (value == null)
      throw new Error(`Failed to parse CSS ${info.type} value ${JSON.stringify(serializedValue)}`);
    result[variableName] = value;
  }
  return result;
};
