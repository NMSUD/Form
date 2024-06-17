import { ValidationResult } from '@contracts/validationResult';

export const minLength =
  (minLength: number) =>
  (value: string): ValidationResult => {
    if ((value?.length ?? 0) >= minLength) {
      return { isValid: true };
    }

    return { isValid: false, errorMessage: `Minimum length required is ${minLength}` };
  };

export const maxLength =
  (maxLength: number) =>
  (value: string): ValidationResult => {
    if ((value?.length ?? 0) <= maxLength) {
      return { isValid: true };
    }

    return {
      isValid: false,
      errorMessage: `Text is too long! Maximum length allowed is ${maxLength}`,
    };
  };

export const shouldBeUrl = (value: string): ValidationResult => {
  const validationFailures: Array<string> = [];

  const safeValue = `${value}`;
  // const shouldStartWith = ['http://', 'https://'];
  // const hasStartWith = shouldStartWith.filter((h) => safeValue.includes?.(h)).length > 0;
  // if (!hasStartWith) {
  //   validationFailures.push(
  //     `Should start with one of ${shouldStartWith.map((s) => `'${s}'`).join(' or ')}.`,
  //   );
  // }

  const numPeriods = safeValue.split('').filter((c) => c === '.').length;
  const isLastCharPeriod = safeValue[safeValue.length - 1] === '.';
  if (numPeriods < 1 || isLastCharPeriod) {
    validationFailures.push('Should have at least one period in a sensible location.');
  }

  if (validationFailures.length > 0) {
    return {
      isValid: false,
      errorMessage: `Should be a valid link/url. (${value}) does not meet the requirements: ${validationFailures.join('. ')}.`,
    };
  }

  return { isValid: true };
};

export const shouldBeYoutubeUrl = (value: string): ValidationResult => {
  const safeValue = `${value}`;
  const youtubePartialUrl = 'https://www.youtube.com/watch?v=';
  if (safeValue.includes(youtubePartialUrl)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    errorMessage: `Youtube url should start with ${youtubePartialUrl}`,
  };
};
