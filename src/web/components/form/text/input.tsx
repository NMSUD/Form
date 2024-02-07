import { Component, Show, createEffect } from 'solid-js';

import { formatForDateLocal } from '@helpers/dateHelper';
import { onTargetValue } from '@helpers/eventHelper';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@hope-ui/solid';
import { useValidation } from '@web/hooks/useValidation';
import { IFormInputProps } from '../formBuilder';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IFormLongInputProps extends IFormInputProps<string | number> {
  inputType?: string;
  min?: string;
  max?: string;
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
    if (inputType === 'datetime-local') {
      return formatForDateLocal(value);
    }

    return value;
  };

  return (
    <FormControl invalid={!isValid().isValid}>
      <FormLabel textAlign="center" for={props.id}>
        {props.label}
        <HelpIconTooltip helpText={props.helpText} />
      </FormLabel>
      <Input
        id={props.id}
        class="noselect"
        placeholder={props.placeholder}
        value={handleSpecialDateLocalValue(props.value, props.inputType)}
        type={props.inputType}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        onBlur={onTargetValue((value) => {
          props.onChange(value);
          calcIsValid(value);
        })}
      />
      <Show when={!isValid().isValid}>
        <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
      </Show>
    </FormControl>
  );
};
