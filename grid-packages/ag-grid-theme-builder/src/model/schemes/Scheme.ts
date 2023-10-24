import { titleCase } from 'model/utils';
import { VariableValues } from 'model/values';

export class Scheme {
  readonly label: string;

  constructor(
    readonly name: string,
    readonly options: ReadonlyArray<SchemeOption>,
  ) {
    this.label = titleCase(name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mutateVariables(_values: VariableValues): void {}
}

export type SchemeOption = {
  value: string;
  label?: string;
  description?: string;
  variables: VariableValues;
  mutateValues?: (values: VariableValues) => void;
};
