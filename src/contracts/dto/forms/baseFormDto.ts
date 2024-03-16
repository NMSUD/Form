import { ValidationResult } from '@contracts/validationResult';
import { maxLength } from '@validation/textValidation';

export type SwaggerPropertySchemaForItem = {
  $ref?: string;
  type?: string;
  format?: string;
};

export type SwaggerPropertySchema = {
  $ref?: string;
  type?: string;
  format?: string;
  items?: SwaggerPropertySchemaForItem;
};

export type IFormDtoMetaDetails<TV> = {
  label: string;
  validationLabel?: string;
  helpText?: string;
  defaultValue?: TV;
  swaggerSchema?: SwaggerPropertySchema;
  saveToLocalStorage?: boolean;
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

export const contactDetailsMaxLength = 500;
export const contactDetails = {
  label: 'Contact Details (only visible to NMSUD organisers)',
  helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
  defaultValue: '',
  validator: maxLength(contactDetailsMaxLength),
};
