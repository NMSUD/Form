// prettier-ignore
import { Button, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, Text } from '@hope-ui/solid';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';

import { portalValidOptions } from '@constants/form';
import { portalGlyphLength } from '@constants/validation';
import { onTargetValue } from '@helpers/eventHelper';
import { DebugNode } from '@web/components/core/debugNode';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '@web/hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IFormPortalCoordInputProps extends FormInputProps<string> {}

export const PortalCoordInput: Component<IFormPortalCoordInputProps> = (
  props: IFormPortalCoordInputProps,
) => {
  const [isValid, calcIsValid] = useValidation(props.validation);
  const [portalCode, setPortalCode] = createSignal<string>(props.value);

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid(props.value);
    }
  }, [props.showValidationMessages]);

  createEffect(() => {
    if (props.value == null || props.value.length === 0) {
      setPortalCode('');
    }
  }, [props.value]);

  const onTextType = (newValue: string) => {
    setPortalCode(newValue);
    props.onChange(newValue);
  };
  const onTextButtonClick = (char: string) => () => {
    setPortalCode((prev) => {
      if (prev.length >= portalGlyphLength) return prev;
      const next = prev + char;
      onTextType(next);
      return next;
    });
  };

  createEffect(() => {
    const correctedValue = (portalCode() ?? '')
      .split('')
      .filter((c) => portalValidOptions.includes(c.toLowerCase()))
      .join('')
      .toUpperCase()
      .slice(0, portalGlyphLength);
    setPortalCode(correctedValue);
    props.onChange(correctedValue);
  }, [portalCode]);

  return (
    <>
      <FormControl invalid={!isValid().isValid}>
        <DebugNode name="PortalCoordInput" />
        <FormLabel textAlign="center" for={props.id}>
          <HelpIconTooltip label={props.label} helpText={props.helpText} />
        </FormLabel>
        <Input
          id={props.id}
          class="nms-portal-font noselect"
          placeholder={props.placeholder}
          value={portalCode()}
          size="lg"
          maxlength={portalGlyphLength}
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
