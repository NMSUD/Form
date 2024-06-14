// prettier-ignore
import { Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@hope-ui/solid';
import { Component, For, Setter, Show, createEffect, createSignal } from 'solid-js';

import { galacticCoordValidOptions } from '@constants/form';
import { onTargetValue } from '@helpers/eventHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '@web/hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IFormGalacticCoordsInputProps extends FormInputProps<string> {}

export const GalacticCoordsInput: Component<IFormGalacticCoordsInputProps> = (
  props: IFormGalacticCoordsInputProps,
) => {
  let groupARef: HTMLDivElement | undefined;
  let groupBRef: HTMLDivElement | undefined;
  let groupCRef: HTMLDivElement | undefined;
  let groupDRef: HTMLDivElement | undefined;
  const [isValid, calcIsValid] = useValidation(props.validation);
  const [groupA, setGroupA] = createSignal<string>('');
  const [groupB, setGroupB] = createSignal<string>('');
  const [groupC, setGroupC] = createSignal<string>('');
  const [groupD, setGroupD] = createSignal<string>('');

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid(props.value);
    }
  }, [props.showValidationMessages]);

  const handleNavigateToNextInput = (setValue: Setter<string>, ref?: HTMLDivElement) =>
    onTargetValue((result?: string) => {
      if (result == null) return;
      if (result.length > 4) {
        result = result.slice(0, 4);
      }

      setValue(result);
      const correctedValue = result
        .split('')
        .filter((c) => galacticCoordValidOptions.includes(c.toLowerCase()))
        .join('');
      if (correctedValue.length === 4) {
        ref?.focus?.();
      }
    });

  createEffect(() => {
    console.log([groupA(), groupB(), groupC(), groupD()].join(':'));
    const coordValue = [groupA(), groupB(), groupC(), groupD()]
      .join(':')
      .split('')
      .filter((c) => galacticCoordValidOptions.includes(c.toLowerCase()))
      .join('')
      .toUpperCase();
    console.log(coordValue);

    const groups = coordValue.split(':');
    setGroupA(groups[0]);
    setGroupB(groups[1]);
    setGroupC(groups[2]);
    setGroupD(groups[3]);

    calcIsValid(coordValue);
    props.onChange(coordValue);
  }, [groupA, groupB, groupC, groupD]);

  return (
    <>
      <FormControl invalid={!isValid().isValid}>
        <FormLabel textAlign="center" for={props.id}>
          {props.label}
          <HelpIconTooltip helpText={props.helpText} />
        </FormLabel>
        <Flex>
          <For
            each={[
              {
                id: '1',
                accessor: groupA,
                setter: setGroupA,
                setCurrentRef: (el: HTMLInputElement) => (groupARef = el),
                nextRef: () => groupBRef,
              },
              {
                id: '2',
                accessor: groupB,
                setter: setGroupB,
                setCurrentRef: (el: HTMLInputElement) => (groupBRef = el),
                nextRef: () => groupCRef,
              },
              {
                id: '3',
                accessor: groupC,
                setter: setGroupC,
                setCurrentRef: (el: HTMLInputElement) => (groupCRef = el),
                nextRef: () => groupDRef,
              },
              {
                id: '4',
                accessor: groupD,
                setter: setGroupD, //
                setCurrentRef: (el: HTMLInputElement) => (groupDRef = el),
              },
            ]}
          >
            {(data, index) => (
              <>
                <Show when={index() !== 0}>
                  <Center>
                    <Text p="$2" fontWeight="bolder">
                      :
                    </Text>
                  </Center>
                </Show>
                <Input
                  ref={(el) => data.setCurrentRef(el)}
                  id={`galactic-group-${data.id}`}
                  class="noselect"
                  textAlign="center"
                  minWidth="100px"
                  placeholder={`${data.id}${data.id}${data.id}${data.id}`}
                  value={data.accessor()}
                  onInput={handleNavigateToNextInput(data.setter, data.nextRef?.())}
                />
              </>
            )}
          </For>
        </Flex>
        <Show when={!isValid().isValid}>
          <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
        </Show>
      </FormControl>
    </>
  );
};
