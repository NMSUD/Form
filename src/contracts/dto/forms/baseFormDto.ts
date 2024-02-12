import { ValidationResult } from '@contracts/validationResult';

export type IFormDtoMetaDetails<TV> = {
  label: string;
  validationLabel?: string;
  helpText?: string;
  defaultValue?: TV;
  dontSaveToLocalStorage?: boolean;
  validator: (val: TV) => ValidationResult;
};

export type IFormDtoMeta<T> = {
  [prop in keyof T]: IFormDtoMetaDetails<any>;
};

export type IFormPersistenceMetaDetails<TV> = {
  label?: string;
  displayInDiscordMessage?: (label: string, value: TV) => Promise<Array<string>>;
};

export type IFormPersistenceMeta<T> = {
  [prop in keyof T]?: IFormPersistenceMetaDetails<any>;
};
