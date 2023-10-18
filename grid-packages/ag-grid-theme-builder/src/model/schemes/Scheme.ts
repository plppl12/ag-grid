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

  get defaultValue(): SchemeValue {
    return {
      option: this.options[0],
      variables: {},
    };
  }
}

export type SchemeOption = {
  value: string;
  label: string;
  description: string;
  variables: VariableValues;
};

export type SchemeValue = {
  option: SchemeOption;
  variables: VariableValues;
};

export type SchemeValues = Record<string, SchemeValue | null | undefined>;
