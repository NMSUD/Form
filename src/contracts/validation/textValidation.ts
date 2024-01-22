import { ValidationResult } from "../validationResult";

export const minLength = (minLength: number) => (value: string): ValidationResult => {
    if (value?.length >= minLength) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: `Minimum length required is ${minLength}` };
};

export const maxLength = (maxLength: number) => (value: string): ValidationResult => {
    if ((value ?? '').length < maxLength) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: `Text is too long! Maximum length allowed is ${maxLength}` };
};

export const shouldBeUrl = (value: string): ValidationResult => {
    const safeValue = (value ?? '');
    const isHttps = [
        safeValue.includes?.('http://'),
        safeValue.includes?.('https://'),
    ];
    const hasHttp = isHttps.filter(h => h === true).length > 0;
    const numPeriods = safeValue.split('').filter(c => c === '.').length;
    const isLastCharPeriod = safeValue[safeValue.length - 1] === '.';
    if (hasHttp && numPeriods > 0 && !isLastCharPeriod) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: `Should be a valid link/url. (${value}) does not meet the requirements.` };
};