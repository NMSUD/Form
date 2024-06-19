import { AppType } from '@constants/enum/appType';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getAppType } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { FormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { ValidationResult } from '@contracts/validationResult';

export const noValidation = <T>(_: T): ValidationResult => ({ isValid: true });

export const notNull =
  (customErrMsg?: string) =>
  <T>(value: T): ValidationResult => {
    if (value != null) {
      return { isValid: true };
    }

    return {
      isValid: false,
      errorMessage: customErrMsg ?? `Field shouldn't be empty`,
    };
  };

export const multiValidation =
  <T>(...validations: Array<(validationVal: T) => ValidationResult>) =>
  (value: T): ValidationResult => {
    for (const validation of validations) {
      const result = validation(value);
      if (result.isValid === false) return result;
    }

    return { isValid: true };
  };

export const separateValidation =
  <T>(validators: {
    [key in keyof typeof AppType]?: (validationVal: T) => ValidationResult;
  }) =>
  (value: T): ValidationResult => {
    const appType = getAppType()?.toString?.() as keyof typeof AppType;
    const validatorForAppType = validators[AppType[appType]];
    if (validatorForAppType == null) {
      getLog().w(`separateValidation - ${appType} validator not found`);
      return { isValid: true };
    }

    return validatorForAppType(value);
  };

export const validateForEach =
  <T>(validation: (item: T) => ValidationResult) =>
  (values: Array<T>): ValidationResult => {
    const safeArr = makeArrayOrDefault(values);
    for (const value of safeArr) {
      const result = validation(value);
      if (result.isValid === false) return result;
    }

    return { isValid: true };
  };

export const validateObj = <T>(props: {
  data: T;
  validationObj: FormDtoMeta<T>;
  includeLabelInErrMsgs?: boolean;
}): Array<ValidationResult> => {
  const validationMessages: Array<ValidationResult> = [];
  for (const mappedBodyParam in props.validationObj) {
    const validatorHasProp = Object.prototype.hasOwnProperty.call(
      props.validationObj,
      mappedBodyParam,
    );
    if (validatorHasProp === false) continue;

    try {
      const propValue = props.data[mappedBodyParam];
      const { label, validationLabel, validator } = props.validationObj[mappedBodyParam];
      const validationResult = validator(propValue);

      if (validationResult.isValid === false) {
        const errMsg = validationResult.errorMessage ?? `Validation failed for ${mappedBodyParam}`;
        const propLabel = validationLabel ?? label;
        validationMessages.push({
          isValid: validationResult.isValid,
          errorMessage: props.includeLabelInErrMsgs ? `${propLabel}: ${errMsg}` : errMsg,
        });
      }
    } catch (ex) {
      const errMsg = `exception while processing ${mappedBodyParam}`;
      getLog().e(errMsg, ex);
      validationMessages.push({
        isValid: false,
        errorMessage: errMsg,
      });
    }
  }

  return validationMessages;
};
