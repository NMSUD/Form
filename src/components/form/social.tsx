
import { FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, VStack } from '@hope-ui/solid';
import { Component, For, Show, createSignal } from 'solid-js';
import { ValidationResult } from '../../contracts/validationResult';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { onTargetValue } from '../../helper/eventHelper';
import { useValidation } from '../../hooks/validation';
import { RightArrowIcon } from '../common/icon/rightArrowIcon';
import { AvatarFromSocialLink } from '../social';

interface IFormSocialProps {
    id: string;
    placeholder?: string;
    label: string;
    value: Array<string>;
    onChange: (newValue: Array<string>) => void;
    validation?: (value: Array<string>) => ValidationResult;
}

export const FormSocialInput: Component<IFormSocialProps> = (props: IFormSocialProps) => {
    const [isValid, calcIsValid] = useValidation(props.validation);
    const [currentLink, setCurrentLink] = createSignal('');
    const [items, setItems] = createSignal(makeArrayOrDefault(props.value));

    const handleSpecialKeyPress = (event: any) => {
        if (event.keyCode == 13) {
            addToList(currentLink());
        }
    }

    const addToList = (link: string) => {
        if (isValid().isValid === false) return;

        setItems(prev => [...makeArrayOrDefault(prev), link]);
        setCurrentLink('');
    }

    return (
        <VStack>
            <FormControl invalid={!isValid().isValid}>
                <FormLabel for={props.id}>{props.label}</FormLabel>

                <InputGroup>
                    <Input
                        id={props.id}
                        placeholder={props.placeholder}
                        value={currentLink()}
                        onInput={onTargetValue(val => {
                            setCurrentLink(val);
                            calcIsValid([...makeArrayOrDefault(items()), val]);
                        })}
                        onKeyPress={handleSpecialKeyPress}
                    />
                    <InputRightElement>
                        <RightArrowIcon fontSize="1.5em" class="pointer" onClick={() => addToList(currentLink())} />
                    </InputRightElement>
                </InputGroup>
                <Show when={!isValid().isValid} >
                    <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
                </Show>
            </FormControl>

            <HStack mt="$2">
                <For each={items()}>
                    {(item) => (<AvatarFromSocialLink url={item} />)}
                </For>
            </HStack>
        </VStack>
    );
};
