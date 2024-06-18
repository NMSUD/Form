import { Component } from 'solid-js';

import { ValidationResult } from '@contracts/validationResult';
import { GridItemSize } from '@web/components/form/grid';
import { IMediaUpload } from '@web/contracts/mediaUpload';

export type ValidFormComponentTypes =
  | Component<FormInputProps<string>>
  | Component<FormInputProps<Array<string>>>
  | Component<FormInputProps<string | Array<string>>>
  | Component<FormInputProps<string | number>>
  | Component<FormInputProps<File>>
  | Component<FormInputProps<IMediaUpload>>
  | Component<FormInputProps<Array<IMediaUpload>>>;

export type FormInputProps<T> = {
  id: string;
  label: string;
  helpText?: string;
  value: T;
  placeholder: string;
  showValidationMessages: boolean;
  validation: (val: T) => ValidationResult;
  onChange: (newValue: T) => void;
};

interface IPropertyToFormMappingExtraProp<T> {
  [prop: string]: (item: T) => unknown;
}

export interface IPropertyToFormMapping<T> {
  component: ValidFormComponentTypes;
  gridItemColumnSize: GridItemSize;
  gridItemRowSize?: GridItemSize;
  placeholder?: string;
  additional?: IPropertyToFormMappingExtraProp<T>;
}

export type ComponentMapping<T> = {
  [prop in keyof T]?: IPropertyToFormMapping<T>;
};

export type PropertyOverrides<T> = {
  [prop in keyof T]?: (currVal: unknown | undefined) => unknown;
};
