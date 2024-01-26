import { makeArrayOrDefault } from "../../helper/arrayHelper";
import { ValidationResult } from "../validationResult";

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
