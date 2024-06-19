import { ValidationResult } from '@contracts/validationResult';
import { basicDiscordLine } from '@helpers/discordMessageHelper';
import { noValidation } from '@validation/baseValidation';
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

export type FormDiscordDetails<TV> = {
  label?: string;
  display?: (label: string, value: TV) => Promise<Array<string>>;
};

// TODO: rename
export type FormDtoMetaDetails<TV> = {
  label: string;
  validationLabel?: string;
  helpText?: string;
  defaultValue?: TV;
  swaggerSchema?: SwaggerPropertySchema;
  discord?: FormDiscordDetails<TV>;
  saveToLocalStorage?: boolean;
  onSubmitMapping?: (val: TV) => unknown;
  validator: (val: TV) => ValidationResult;
};

// TODO: rename
export type FormDtoMeta<T> = {
  [prop in keyof T]: FormDtoMetaDetails<any>;
};

export const contactDetailsMaxLength = 500 as const;
export const contactDetails: FormDtoMetaDetails<string> = {
  label: 'Contact Details (only visible to NMSUD organisers)',
  helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
  defaultValue: '',
  discord: {
    label: 'Contact Details',
    display: basicDiscordLine,
  },
  validator: maxLength(contactDetailsMaxLength),
} as const;
export const anonymousUserGuid: FormDtoMetaDetails<string> = {
  label: 'anonymousUserGuid',
  defaultValue: '',
  discord: {
    display: basicDiscordLine,
  },
  validator: noValidation,
} as const;
