import { makeArrayOrDefault } from "../../helper/arrayHelper";
import { getLog } from "../../services/internal/logService";
import { ValidationResult } from "../validationResult";

export type IValidationObject<T> = {
    [prop in keyof T]: {
        label: string,
        validator: (val: any) => ValidationResult
    };
};

export const noValidation = <T>(_: T): ValidationResult => ({ isValid: true });

export const notNull = (customErrMsg?: string) => <T>(value: T): ValidationResult => {
    if (value != null) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: (customErrMsg ?? `Field shouldn't be empty`) };
};

export const multiValidation = <T>(validations: Array<(validationVal: T) => ValidationResult>) =>
    (value: T): ValidationResult => {
        for (const validation of validations) {
            const result = validation(value);
            if (result.isValid === false) return result;
        }

        return { isValid: true };
    };

export const validateForEach = <T>(validation: (item: T) => ValidationResult) =>
    (values: Array<T>): ValidationResult => {
        const safeArr = makeArrayOrDefault(values);
        for (const value of safeArr) {
            const result = validation(value);
            if (result.isValid === false) return result;
        }

        return { isValid: true };
    };

export const validateObj = <T>(props: {
    data: T,
    validationObj: IValidationObject<T>,
    inludeLabelInErrMsgs?: boolean,
}): Array<ValidationResult> => {
    const validationMessages: Array<ValidationResult> = [];
    for (const mappedBodyParam in props.validationObj) {
        const validatorHasProp = Object.prototype.hasOwnProperty.call(props.validationObj, mappedBodyParam)
        if (validatorHasProp === false) continue;

        try {
            const propValue = props.data[mappedBodyParam];
            const { label, validator } = props.validationObj[mappedBodyParam];
            const validationResult = validator(propValue);

            if (validationResult.isValid === false) {
                const errMsg = validationResult.errorMessage ?? `Validation failed for ${mappedBodyParam}`;
                validationMessages.push({
                    isValid: validationResult.isValid,
                    errorMessage: props.inludeLabelInErrMsgs ? `${label}: ${errMsg}` : errMsg,
                })
            }
        } catch (ex) {
            getLog().e(`exception while processing ${mappedBodyParam}`, ex);
        }
    }

    return validationMessages;
};