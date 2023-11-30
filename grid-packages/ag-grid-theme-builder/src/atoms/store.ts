import { Atom, WritableAtom, createStore } from 'jotai';
import { Feature, getFeatureOrThrow } from 'model/features';
import { getSchemeOrThrow } from 'model/schemes';
import { SchemeOption } from 'model/schemes/Scheme';
import { logErrorMessage, mapPresentObjectValues } from 'model/utils';
import { throttle } from 'throttle-debounce';
import { enabledFeaturesAtom } from './enabledFeatures';
import { schemeValueAtomsBySchemeName, schemeValuesAtom } from './schemes';
import { themeLabelAtom } from './theme';
import { valuesAtom } from './values';

export const initStore = () => {
  const store = createStore();
  restoreValue('themeLabel', deserializeString, store, themeLabelAtom);
  restoreValue('enabledFeatures', deserializeEnabledFeatures, store, enabledFeaturesAtom);
  // restoreMap('values', deserializeValue, store, valueAtomsByVariableName);
  restoreMap('schemeValues', deserializeSchemeValue, store, schemeValueAtomsBySchemeName);

  const saveState = throttle(
    100,
    () => {
      persistValue('themeLabel', serializeString, store, themeLabelAtom);
      persistValue('enabledFeatures', serializeEnabledFeatures, store, enabledFeaturesAtom);
      // persistMap('values', serializeValue, store, valueAtomsByVariableName);
      persistMap('schemeValues', serializeSchemeValue, store, schemeValueAtomsBySchemeName);
    },
    { noLeading: true },
  );
  for (const atom of [themeLabelAtom, enabledFeaturesAtom, valuesAtom, schemeValuesAtom]) {
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
  const serializedValue = serialize(value);
  if (serializedValue == null) {
    localStorage.removeItem(storageKey(key));
  } else {
    localStorage.setItem(storageKey(key), JSON.stringify(serializedValue));
  }
};

const getAndParseFromLocalStorage = (key: string): unknown => {
  const storedString = localStorage.getItem(storageKey(key));
  if (storedString == null) {
    return null;
  }
  try {
    return JSON.parse(storedString);
  } catch {
    logErrorMessage(`Failed to parse stored JSON for ${key}: ${storedString}`);
    return;
  }
};

const restoreValue = <T>(
  keyPart: string,
  deserialize: (value: unknown) => T,
  store: Store,
  atom: WritableAtom<T, [T], void>,
  defaultValue?: T,
) => {
  const storedValue = getAndParseFromLocalStorage(keyPart) || defaultValue;
  if (storedValue == null) {
    return;
  }
  try {
    store.set(atom, deserialize(storedValue));
  } catch (e) {
    logErrorMessage(
      `Failed to deserialize value for ${keyPart}: ${JSON.stringify(storedValue)}`,
      e,
    );
    return;
  }
};

const persistMap = <T>(
  key: string,
  serializeValue: (value: T) => unknown,
  store: Store,
  atoms: Record<string, Atom<T>>,
) => {
  const combined = mapPresentObjectValues(atoms, (atom) => serializeValue(store.get(atom)));
  localStorage.setItem(storageKey(key), JSON.stringify(combined));
};

const restoreMap = <T>(
  keyPart: string,
  deserialize: (key: string, value: unknown) => T,
  store: Store,
  atoms: Record<string, WritableAtom<T, [T], void> | undefined>,
) => {
  const storedValue = getAndParseFromLocalStorage(keyPart);
  if (storedValue == null) {
    return;
  }
  if (!storedValue || typeof storedValue !== 'object') {
    return logErrorMessage(`Expected an object for ${keyPart}, got ${JSON.stringify(storedValue)}`);
  }
  try {
    for (const [key, value] of Object.entries(storedValue)) {
      const atom = atoms[key];
      if (!atom) {
        logErrorMessage(
          `Ignoring invalid key "${key}" for ${keyPart} (${JSON.stringify(storedValue)})`,
        );
        continue;
      }
      store.set(atom, deserialize(key, value));
    }
  } catch (e) {
    return logErrorMessage(
      `Failed to deserialize value for ${keyPart}: ${JSON.stringify(storedValue)}`,
      e,
    );
  }
};

const storageKey = (key: string) => `theme-builder.theme-state.${key}`;

const serializeString = (value: string) => value;

const deserializeString = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new Error('expected string');
  }
  return value;
};

const serializeSchemeValue = (option: SchemeOption | null) => option?.value;

const deserializeSchemeValue = (key: string, value: unknown): SchemeOption => {
  if (typeof value !== 'string') {
    throw new Error('expected string');
  }
  const scheme = getSchemeOrThrow(key);
  const option = scheme.options.find((option) => option.value === value);
  if (!option) {
    throw new Error(`Invalid option "${value}" for scheme "${scheme.name}"`);
  }
  return option;
};

const serializeEnabledFeatures = (features: readonly Feature[]) => features.map((f) => f.name);

const deserializeEnabledFeatures = (featureNames: unknown): readonly Feature[] => {
  if (!Array.isArray(featureNames)) {
    throw new Error('expected array');
  }
  return featureNames.map(getFeatureOrThrow);
};

// const serializeValue = (value: Value | null) => value?.toCss();

// const deserializeValue = (variableName: string, serializedValue: unknown): Value => {
//   if (typeof serializedValue !== 'string') {
//     throw new Error(`Expected string value for ${variableName} key`);
//   }
//   const info = getVariableInfoOrThrow(variableName);
//   const value = parseCssString(info, serializedValue);
//   if (value == null) {
//     throw new Error(`Failed to parse CSS ${info.type} value ${JSON.stringify(serializedValue)}`);
//   }
//   return value;
// };
