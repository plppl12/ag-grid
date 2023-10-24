import { VariableValues } from 'model/values';
import { Color } from 'model/values/Color';
import { Dimension } from 'model/values/Dimension';
import { Scheme } from './Scheme';

class ColorTemperatureScheme extends Scheme {
  constructor() {
    super('colorTemperature', [
      {
        value: 'very-warm',
        description: '',
        variables: {
          '--color-temperature-adjust': new Dimension(30, '%'),
        },
      },
      {
        value: 'warm',
        description: '',
        variables: {
          '--color-temperature-adjust': new Dimension(40, '%'),
        },
      },
      {
        value: 'neutral',
        description: '',
        variables: {
          '--color-temperature-adjust': new Dimension(50, '%'),
        },
      },
      {
        value: 'cold',
        description: '',
        variables: {
          '--color-temperature-adjust': new Dimension(60, '%'),
        },
      },
      {
        value: 'veryCold',
        description: '',
        variables: {
          '--color-temperature-adjust': new Dimension(70, '%'),
        },
      },
    ]);
  }

  mutateVariables(values: VariableValues): void {
    const adjust = values['--color-temperature-adjust'];
    if (adjust instanceof Dimension) {
      const temperature = adjust.number;
      for (const variableName in values) {
        const value = values[variableName];
        if (value instanceof Color) {
          values[variableName] = value.withTemperature(temperature);
        }
      }
    }
  }
}

export const colorTemperatureScheme = new ColorTemperatureScheme();
