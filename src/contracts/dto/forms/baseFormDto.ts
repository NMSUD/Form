import { ValidationResult } from "../../validationResult";

export type IFormDtoMetaDetails<TV> = {
    label: string,
    validationLabel?: string,
    helpText?: string,
    validator: (val: TV) => ValidationResult
}

export type IFormDtoMeta<T> = {
    [prop in keyof T]: IFormDtoMetaDetails<any>;
};