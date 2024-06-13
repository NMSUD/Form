import { HtmlKeyEvent } from '@contracts/event';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { onTargetValue } from '@helpers/eventHelper';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  VStack,
} from '@hope-ui/solid';
import { FormInputProps } from '@web/contracts/formTypes';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';
import { useValidation } from '../../../hooks/useValidation';
import { RightArrowIcon } from '../../common/icon/rightArrowIcon';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { AvatarFromSocialLink } from './socialLinkAvatar';
import { keyboardKeyCode } from '@constants/form';

interface IFormSocialProps extends FormInputProps<Array<string>> {}

export const FormSocialInput: Component<IFormSocialProps> = (props: IFormSocialProps) => {
  const [isValid, calcIsValid] = useValidation(props.validation);
  const [currentLink, setCurrentLink] = createSignal('');
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
    if (event.keyCode === keyboardKeyCode.enter) {
      addToList(currentLink());
    }
  };

  const addToList = (link: string) => {
    if (isValid().isValid === false) return;

    setItems((prev) => {
      const newValue = [...makeArrayOrDefault(prev), link];
      props.onChange(newValue.map((v) => `https://${v}`));
      return newValue;
    });
    setCurrentLink('');
  };

  const removeFromList = (link: string) => {
    setItems((prev) => {
      const newValue = makeArrayOrDefault(prev).filter((p) => p != link);
      props.onChange(newValue.map((v) => `https://${v}`));
      return newValue;
    });
  };

  return (
    <VStack>
      <FormControl invalid={!isValid().isValid}>
        <FormLabel textAlign="center" for={props.id}>
          {props.label}
          <HelpIconTooltip helpText={props.helpText} />
        </FormLabel>

        <InputGroup>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input
            id={props.id}
            class="noselect"
            placeholder={props.placeholder}
            value={currentLink()}
            onInput={onTargetValue((val) => {
              setCurrentLink(val);
              calcIsValid([...makeArrayOrDefault(items()), val]);
            })}
            onKeyPress={handleSpecialKeyPress}
          />
          <InputRightElement>
            <RightArrowIcon
              fontSize="1.5em"
              class="pointer"
              onClick={() => addToList(currentLink())}
            />
          </InputRightElement>
        </InputGroup>
        <Show when={!isValid().isValid}>
          <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
        </Show>
      </FormControl>

      <HStack mt="$2" flexWrap="wrap">
        <For each={items()}>
          {(item) => <AvatarFromSocialLink url={item} onChange={() => removeFromList(item)} />}
        </For>
      </HStack>
    </VStack>
  );
};
