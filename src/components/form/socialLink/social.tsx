
import { FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, VStack } from '@hope-ui/solid';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';
import { makeArrayOrDefault } from '../../../helper/arrayHelper';
import { onTargetValue } from '../../../helper/eventHelper';
import { useValidation } from '../../../hooks/useValidation';
import { RightArrowIcon } from '../../common/icon/rightArrowIcon';
import { AvatarFromSocialLink } from './socialLinkAvatar';
import { IFormInputProps } from '../formBuilder';
import { HelpIcon } from '../helpIcon/helpIcon';

interface IFormSocialProps extends IFormInputProps<Array<string>> { }

export const FormSocialInput: Component<IFormSocialProps> = (props: IFormSocialProps) => {
    const [isValid, calcIsValid] = useValidation(props.validation);
    const [currentLink, setCurrentLink] = createSignal('');
    const [items, setItems] = createSignal(makeArrayOrDefault(props.value));

    createEffect(() => {
        if (props.showValidationMessages === true) {
            calcIsValid(props.value);
        }
    }, [props.showValidationMessages]);

    const handleSpecialKeyPress = (event: any) => {
        if (event.keyCode == 13) {
            addToList(currentLink());
        }
    }

    const addToList = (link: string) => {
        if (isValid().isValid === false) return;

        setItems(prev => {
            const newValue = [...makeArrayOrDefault(prev), link];
            props.onChange(newValue);
            return newValue;
        });
        setCurrentLink('');
    }

    return (
        <VStack>
            <FormControl invalid={!isValid().isValid}>
                <FormLabel textAlign="center" for={props.id}>
                    {props.label}
                    <HelpIcon helpText={props.helpText} />
                </FormLabel>

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

            <HStack mt="$2" flexWrap="wrap">
                <For each={items()}>
                    {(item) => (<AvatarFromSocialLink url={item} />)}
                </For>
            </HStack>
        </VStack>
    );
};
