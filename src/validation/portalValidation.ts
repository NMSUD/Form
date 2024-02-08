import { portalValidOptions } from '@constants/form';
import { ValidationResult } from '@contracts/validationResult';

export const isValidPortalAddress = (value: string): ValidationResult => {
  const isValid =
    value.split('').filter((char) => portalValidOptions.includes(char.toLowerCase()) === false)
      .length === 0;

  if (isValid) {
    return { isValid: true };
  }

  return { isValid: false, errorMessage: 'Invalid portal address' };
};
