// prettier-ignore
import { Button, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Text } from '@hope-ui/solid';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';

import { portalValidOptions } from '@constants/form';
import { onTargetValue } from '@helpers/eventHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '@web/hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IFormPortalCoordInputProps extends FormInputProps<string> {}

export const PortalCoordInput: Component<IFormPortalCoordInputProps> = (
  props: IFormPortalCoordInputProps,
) => {
  const [isValid, calcIsValid] = useValidation(props.validation);
  const [portalCode, setPortalCode] = createSignal<string>(props.value);

  const onTextType = (newValue: string) => {
    setPortalCode(newValue);
    props.onChange(newValue);
  };
  const onTextButtonClick = (char: string) => () => {
    setPortalCode((prev) => {
      if (prev.length >= 12) return prev;
      const next = prev + char;
      onTextType(next);
      return next;
    });
  };

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid(props.value);
    }
  }, [props.showValidationMessages]);

  createEffect(() => {
    const correctedValue = (portalCode() ?? '')
      .split('')
      .filter((c) => portalValidOptions.includes(c.toLowerCase()))
      .join('')
      .toUpperCase();
    setPortalCode(correctedValue.slice(0, 12));
  }, [portalCode]);

  return (
    <>
      <FormControl invalid={!isValid().isValid}>
        <FormLabel textAlign="center" for={props.id}>
          {props.label}
          <HelpIconTooltip helpText={props.helpText} />
        </FormLabel>
        <Input
          id={props.id}
          class="nms-portal-font noselect"
          placeholder={props.placeholder}
          value={portalCode()}
          size="lg"
          maxlength={12}
          onInput={onTargetValue(onTextType)}
        />
        <SimpleGrid
          columns={{ '@initial': 3, '@sm': 4, '@md': 8, '@lg': 16 }}
          mt="$2"
          class="nms-portal-font"
          gap="4px"
        >
          <For each={portalValidOptions}>
            {(char) => (
              <Button variant="outline" size="lg" p="0" onClick={onTextButtonClick(char)}>
                <Text size="4xl">{char.toUpperCase()}</Text>
              </Button>
            )}
          </For>
        </SimpleGrid>
        <Show when={!isValid().isValid}>
          <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
        </Show>
      </FormControl>
    </>
  );
};
