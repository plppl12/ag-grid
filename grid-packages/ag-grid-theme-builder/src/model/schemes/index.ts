import { indexBy } from 'model/utils';
import { Scheme } from './Scheme';
import { borderScheme } from './borderScheme';
import { chromeColorScheme } from './chromeColorScheme';
import { colorTemperatureScheme } from './colorTemperatureScheme';
import { compactnessScheme } from './compactnessScheme';

export const allSchemes: ReadonlyArray<Scheme> = [
  chromeColorScheme,
  colorTemperatureScheme,
  compactnessScheme,
  borderScheme,
];

const schemesByName = indexBy(allSchemes, 'name');

export const getSchemeOrThrow = (schemeName: string): Scheme => {
  const scheme = schemesByName[schemeName];
  if (!scheme) {
    throw new Error(`Invalid scheme name "${schemeName}"`);
  }
  return scheme;
};
