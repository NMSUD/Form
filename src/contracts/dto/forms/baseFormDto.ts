import { ValidationResult } from '@contracts/validationResult';

export type IFormDtoMetaDetails<TV> = {
  label: string;
  validationLabel?: string;
  helpText?: string;
  defaultValue?: TV;
  displayInDiscordMessage?: boolean;
  validator: (val: TV) => ValidationResult;
};

export type IFormDtoMeta<T> = {
  [prop in keyof T]: IFormDtoMetaDetails<any>;
};
