import type { Accessor } from 'solid-js';
import { createSignal } from 'solid-js';
import { ValidationResult } from '@contracts/validationResult';

export const useValidation = <T>(
  validator?: (value: T) => ValidationResult,
): [Accessor<ValidationResult>, (newValue: T) => ValidationResult] => {
  const [isValid, setIsValid] = createSignal<ValidationResult>({ isValid: true });

  const calcIsValid = (newValue: T): ValidationResult => {
    if (validator == null) return { isValid: true, errorMessage: 'no validator' };

    try {
      const result = validator(newValue);
      setIsValid(result);
      return result;
    } catch (ex) {
      return { isValid: true, errorMessage: `exception occurred in validator, ${ex}` };
    }
  };

  return [isValid, calcIsValid];
};
