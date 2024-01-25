import { AppType } from "../../constants/enum/appType";
import { makeArrayOrDefault } from "../../helper/arrayHelper";
import { getAppType } from "../../services/internal/configService";
import { getLog } from "../../services/internal/logService";
import { IFormDtoMeta } from "../dto/forms/baseFormDto";
import { ValidationResult } from "../validationResult";

export const noValidation = <T>(_: T): ValidationResult => ({ isValid: true });

export const notNull = (customErrMsg?: string) => <T>(value: T): ValidationResult => {
    if (value != null) {
        return { isValid: true };
    }

    return { isValid: false, errorMessage: (customErrMsg ?? `Field shouldn't be empty`) };
};

export const multiValidation = <T>(...validations: Array<(validationVal: T) => ValidationResult>) =>
    (value: T): ValidationResult => {
        for (const validation of validations) {
            const result = validation(value);
            if (result.isValid === false) return result;
        }

        return { isValid: true };
    };

export const seperateValidation = <T>(validators: {
    ui: (validationVal: T) => ValidationResult,
    api: (validationVal: T) => ValidationResult,
}) =>
    (value: T): ValidationResult => {
        if (getAppType() === AppType.UI) {
            return validators.ui(value);
        }
        if (getAppType() === AppType.Api) {
            return validators.api(value);
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
    validationObj: IFormDtoMeta<T>,
    inludeLabelInErrMsgs?: boolean,
}): Array<ValidationResult> => {
    const validationMessages: Array<ValidationResult> = [];
    for (const mappedBodyParam in props.validationObj) {
        const validatorHasProp = Object.prototype.hasOwnProperty.call(props.validationObj, mappedBodyParam)
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
                    errorMessage: props.inludeLabelInErrMsgs ? `${propLabel}: ${errMsg}` : errMsg,
                })
            }
        } catch (ex) {
            getLog().e(`exception while processing ${mappedBodyParam}`, ex);
        }
    }

    return validationMessages;
};