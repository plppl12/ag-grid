import { VariableValues } from 'model/resolve';
import { titleCase } from 'model/utils';

export class Scheme {
  readonly label: string;

  constructor(
    readonly name: string,
    readonly options: readonly SchemeOption[],
  ) {
    this.label = titleCase(name);
  }

  mutateVariables(_values: VariableValues): void {}
}

export type SchemeOption = {
  value: string;
  label: string;
  description: string;
  variables: VariableValues;
  mutateValues?: (values: VariableValues) => void;
};
