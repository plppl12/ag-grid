import { VariableValues } from 'model/resolve';
import { Scheme } from './Scheme';

class ColorTemperatureScheme extends Scheme {
  constructor() {
    super('colorTemperature', [
      {
        value: 'veryWarm',
        label: 'Very Warm',
        description: '',
        variables: {
          // '--color-temperature-adjust': new Dimension(-20, '%'),
        },
      },
      {
        value: 'warm',
        label: 'Warm',
        description: '',
        variables: {
          // '--color-temperature-adjust': new Dimension(-10, '%'),
        },
      },
      {
        value: 'neutral',
        label: 'Neutral',
        description: '',
        variables: {},
      },
      {
        value: 'cold',
        label: 'Cold',
        description: '',
        variables: {
          // '--color-temperature-adjust': new Dimension(10, '%'),
        },
      },
      {
        value: 'veryCold',
        label: 'Very Cold',
        description: '',
        variables: {
          // '--color-temperature-adjust': new Dimension(20, '%'),
        },
      },
    ]);
  }

  mutateVariables(_: VariableValues): void {
    // const adjust = values['--color-temperature-adjust'];
    // if (adjust instanceof Dimension) {
    //   const temperature = adjust.number;
    //   for (const variableName in values) {
    //     const value = values[variableName];
    //     if (value instanceof Color) {
    //       values[variableName] = value.withTemperature(temperature);
    //     }
    //   }
    // }
  }
}

export const colorTemperatureScheme = new ColorTemperatureScheme();
