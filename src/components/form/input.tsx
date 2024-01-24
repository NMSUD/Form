import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@hope-ui/solid';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { ValidationResult } from '../../contracts/validationResult';
import { formatForDateLocal } from '../../helper/dateHelper';
import { onTargetValue } from '../../helper/eventHelper';
import { useValidation } from '../../hooks/validation';

interface IFormLongInputProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string | number;
    inputType?: string;
    disabled?: boolean;
    showValidationMessages?: boolean;
    onChange: (newValue: string) => void;
    validation?: (value: string | number) => ValidationResult;
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
            <FormLabel for={props.id}>{props.label}</FormLabel>
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

interface IFormTextAreaProps {
    id: string;
    placeholder?: string;
    label: string;
    minH?: string;
    value: string;
    inputType?: string;
    displayTextLength?: boolean;
    maxTextLength?: number;
    showValidationMessages?: boolean;
    onChange: (newValue: string) => void;
    validation?: (value: string) => ValidationResult;
}

export const FormTextArea: Component<IFormTextAreaProps> = (props: IFormTextAreaProps) => {
    const [isValid, calcIsValid] = useValidation(props.validation);
    const [localTextCount, setLocalTextCount] = createSignal<number>(props.value?.length ?? 0);

    createEffect(() => {
        if (props.showValidationMessages === true) {
            calcIsValid(props.value);
        }
    }, [props.showValidationMessages]);

    return (
        <FormControl invalid={!isValid().isValid}>
            <FormLabel for={props.id} width="100%">
                {props.label}
                <Show when={props.displayTextLength}>
                    <span style={{ float: 'right', "margin-right": '0.5em' }}>
                        {localTextCount()} / {props.maxTextLength}
                    </span>
                </Show>
            </FormLabel>
            <Textarea
                id={props.id}
                minH={props.minH}
                width="100% !important"
                placeholder={props.placeholder}
                value={props.value}
                onBlur={onTargetValue(value => {
                    calcIsValid(value);
                    props.onChange(value);
                })}
                onInput={onTargetValue(value => setLocalTextCount(value.length))}
            />
            <Show when={!isValid().isValid} >
                <FormErrorMessage mt="0">{isValid().errorMessage}</FormErrorMessage>
            </Show>
        </FormControl>
    );
};
