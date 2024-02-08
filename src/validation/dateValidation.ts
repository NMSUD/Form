import { ValidationResult } from '@contracts/validationResult';
import { formatDate, isBefore } from '@helpers/dateHelper';

export const minDate =
  (minDate: Date) =>
  (value: Date): ValidationResult => {
    if (isBefore(value, minDate)) {
      return { isValid: true };
    }

    return {
      isValid: false,
      errorMessage: `Minimum date is ${formatDate(minDate, 'DD MMM YY')}`,
    };
  };

export const maxDate =
  (maxDate: Date) =>
  (value: Date): ValidationResult => {
    if (isBefore(maxDate, value)) {
      return { isValid: true };
    }

    return {
      isValid: false,
      errorMessage: `Maximum date is ${formatDate(maxDate, 'DD MMM YY')}`,
    };
  };
