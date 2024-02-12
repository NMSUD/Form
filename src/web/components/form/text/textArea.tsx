import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@hope-ui/solid';
import { Component, Show, createEffect, createSignal } from 'solid-js';

import { onTargetValue } from '@helpers/eventHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '@web/hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IFormTextAreaProps extends FormInputProps<string> {
  minH?: string;
  inputType?: string;
  displayTextLength?: boolean;
  maxTextLength?: number;
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
        <HelpIconTooltip helpText={props.helpText} />

        <Show when={props.displayTextLength}>
          <span class="noselect" style={{ float: 'right', 'margin-right': '0.5em' }}>
            {localTextCount()} / {props.maxTextLength}
          </span>
        </Show>
      </FormLabel>
      <Textarea
        id={props.id}
        class="noselect"
        minH={props.minH}
        width="100% !important"
        placeholder={props.placeholder}
        value={props.value}
        onBlur={onTargetValue((value) => {
          calcIsValid(value);
          props.onChange(value);
        })}
        onInput={onTargetValue((value) => setLocalTextCount(value.length))}
      />
      <Show when={!isValid().isValid}>
        <FormErrorMessage mt="0">{isValid().errorMessage}</FormErrorMessage>
      </Show>
    </FormControl>
  );
};
