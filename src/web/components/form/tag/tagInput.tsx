import { Component, For, Show, createEffect, createSignal } from 'solid-js';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@hope-ui/solid';

import { onTargetValue } from '@helpers/eventHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '@web/hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { HtmlKeyEvent } from '@contracts/event';
import { keyboardKeyCode } from '@constants/form';
import { DebugNode } from '@web/components/core/debugNode';

interface IProps extends FormInputProps<Array<string>> {
  separator?: string;
}

export const FormTagInput: Component<IProps> = (props: IProps) => {
  const [isValid, calcIsValid] = useValidation(props.validation);
  const [currentText, setCurrentText] = createSignal('');
  const [items, setItems] = createSignal(makeArrayOrDefault(props.value));

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid(props.value);
    }
  }, [props.showValidationMessages]);

  createEffect(() => {
    if (props.value == null || props.value.length === 0) {
      setItems([]);
    }
  }, [props.value]);

  const handleSpecialKeyPress = (event: HtmlKeyEvent) => {
    if (event.keyCode == keyboardKeyCode.enter) {
      onAdd();
    }
  };

  const onAdd = () => {
    const newItem = currentText();
    const valResult = calcIsValid([newItem]);
    if (valResult.isValid === false) return;
    if (items().includes(newItem)) {
      return;
    }
    setItems((prev) => {
      const newItems = [...prev, newItem];
      props.onChange(newItems);
      return newItems;
    });
    setCurrentText('');
  };

  const removeItem = (item: string) => () => {
    setItems((prev) => {
      const newItems = prev.filter((p) => p != item);
      props.onChange(newItems);
      return newItems;
    });
  };

  return (
    <FormControl invalid={!isValid().isValid}>
      <DebugNode name="FormTagInput" />
      <FormLabel textAlign="center" for={props.id}>
        <HelpIconTooltip label={props.label} helpText={props.helpText} />
      </FormLabel>
      <InputGroup mb="$3">
        <Input
          id={props.id}
          class="noselect"
          placeholder={props.placeholder}
          value={currentText()}
          onInput={onTargetValue((value) => {
            setCurrentText(value);
          })}
          onKeyPress={handleSpecialKeyPress}
        />
        <InputRightAddon px={0}>
          <Button variant="outline" onClick={onAdd}>
            +
          </Button>
        </InputRightAddon>
      </InputGroup>
      <For each={items()}>
        {(item) => (
          <Tag mr="$1">
            <TagLabel ml="$1">{item}</TagLabel>
            <TagCloseButton onClick={removeItem(item)} />
          </Tag>
        )}
      </For>
      <Show when={!isValid().isValid}>
        <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
      </Show>
    </FormControl>
  );
};
