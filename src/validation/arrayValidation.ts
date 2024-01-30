import { makeArrayOrDefault } from "../helper/arrayHelper";
import { ValidationResult } from "../contracts/validationResult";

export const minItems = (minLength: number) => <T>(values: Array<T>): ValidationResult => {
    const safeArr = makeArrayOrDefault(values);
    if (safeArr.length >= minLength) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: `Minimum number of items that need to be selected is ${minLength}` };
};

export const maxItems = (maxLength: number) => <T>(values: Array<T>): ValidationResult => {
    const safeArr = makeArrayOrDefault(values);
    if (safeArr.length < maxLength) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: `Too many items selected! Maximum number of items allowed to be selected is ${maxLength}` };
};

export const selectedItemsExist = <T>(validOptions: Array<T>) => (values: Array<T>): ValidationResult => {
    const safeArr = makeArrayOrDefault(values);
    for (const value of safeArr) {
        let optionIsValid = false;
        if (validOptions.includes(value)) {
            optionIsValid = true;
            continue
        }

        if (optionIsValid == false) {
            return { isValid: false, errorMessage: 'Selected option is invalid' };
        }
    }

    return { isValid: true };
};
