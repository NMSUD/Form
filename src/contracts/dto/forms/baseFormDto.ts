import { ValidationResult } from '@contracts/validationResult';

export type IFormDtoMetaDetails<TV> = {
  label: string;
  validationLabel?: string;
  helpText?: string;
  defaultValue?: TV;
  dontSaveToLocalStorage?: boolean;
  displayInDiscordMessage?: (label: string, value: TV) => Array<string>;
  validator: (val: TV) => ValidationResult;
};

export type IFormDtoMeta<T> = {
  [prop in keyof T]: IFormDtoMetaDetails<any>;
};
