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
}

export type SchemeOption = {
  value: string;
  label: string;
  description: string;
  variables?: VariableValues;
};

export type SchemeValue = {
  scheme: Scheme;
  option: SchemeOption;
};
