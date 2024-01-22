import { ValidationResult } from "../validationResult";

export const noValidation = <T>(_: T): ValidationResult => ({ isValid: true });

export const multiValidation = <T>(validations: Array<(validationVal: T) => ValidationResult>) => (value: T): ValidationResult => {
    for (const validation of validations) {
        const result = validation(value);
        if (result.isValid === false) return result;
    }

    return { isValid: true };
};

export const validateForEach = <T>(validation: (item: T) => ValidationResult) => (values: Array<T>): ValidationResult => {
    for (const value of values) {
        const result = validation(value);
        if (result.isValid === false) return result;
    }

    return { isValid: true };
};