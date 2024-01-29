import { FormControl, FormErrorMessage, FormLabel, Input } from '@hope-ui/solid';
import { Component, Show, createEffect } from 'solid-js';
import { formatForDateLocal } from '../../../helper/dateHelper';
import { onTargetValue } from '../../../helper/eventHelper';
import { useValidation } from '../../../hooks/useValidation';
import { IFormInputProps } from '../formBuilder';
import { HelpIcon } from '../helpIcon/helpIcon';

interface IFormLongInputProps extends IFormInputProps<string | number> {
    inputType?: string;
    disabled?: boolean;
}

export const FormLongInput: Component<IFormLongInputProps> = (props: IFormLongInputProps) => {
    const [isValid, calcIsValid] = useValidation(props.validation);

    createEffect(() => {
        if (props.showValidationMessages === true) {
            calcIsValid(props.value);
        }
    }, [props.showValidationMessages]);

    const handleSpecialDateLocalValue = (value: string | number, inputType?: string) => {
        if (inputType == 'datetime-local') {
            return formatForDateLocal(value as any);
        }

        return value;
    }

    return (
        <FormControl invalid={!isValid().isValid}>
            <FormLabel textAlign="center" for={props.id}>
                {props.label}
                <HelpIcon helpText={props.helpText} />
            </FormLabel>
            <Input
                id={props.id}
                placeholder={props.placeholder}
                value={handleSpecialDateLocalValue(props.value, props.inputType)}
                type={props.inputType}
                disabled={props.disabled}
                onBlur={onTargetValue(value => {
                    props.onChange(value);
                    calcIsValid(value);
                })}
            />
            <Show when={!isValid().isValid} >
                <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
            </Show>
        </FormControl>
    );
};
