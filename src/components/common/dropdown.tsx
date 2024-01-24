import { Flex, FormControl, FormErrorMessage, FormLabel, Image, Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, Tag, TagLabel, Text } from "@hope-ui/solid";
import { Component, createEffect, createSignal, For, JSX, Show } from "solid-js";
import { ValidationResult } from "../../contracts/validationResult";
import { useValidation } from "../../hooks/validation";
import { makeArrayOrDefault } from "../../helper/arrayHelper";

export interface IDropdownOption {
    title: string;
    value: string;
    image?: string;
}

interface IProps {
    title: string;
    placeholder?: string | JSX.Element;
    multiple?: boolean;
    hideTitle?: boolean;
    selectedValues?: Array<string>;
    options: Array<IDropdownOption>;
    showValidationMessages?: boolean;
    onSelect?: (values: Array<string>) => void;
    validation?: (value: Array<string>) => ValidationResult;
}

export const Dropdown: Component<IProps> = (props: IProps) => {
    const [selectedOptions, setSelectedOptions] = createSignal(props.selectedValues ?? [], { equals: false });
    const [isValid, calcIsValid] = useValidation(props.validation);

    createEffect(() => {
        if (props.showValidationMessages === true) {
            const safeValue = makeArrayOrDefault(props.selectedValues);
            calcIsValid(safeValue);
        }
    }, [props.showValidationMessages]);

    createEffect(() => {
        setSelectedOptions(props.selectedValues ?? []);
    })

    const onSelectOption = (selectedOpts: any) => {
        setSelectedOptions(selectedOpts);
        const safeValue = makeArrayOrDefault(selectedOpts);
        props.onSelect?.(safeValue);
        calcIsValid(safeValue);
    }

    const getOptionFromValue = (value: string | number) => {
        const matchingOpt = props.options.find(opt => opt.value == value);
        return matchingOpt;
    }

    return (
        <FormControl invalid={!isValid().isValid}>
            <Show when={props.hideTitle != true}>
                <FormLabel>{props.title}</FormLabel>
            </Show>
            <Select
                multiple={props.multiple}
                value={selectedOptions()}
                onChange={onSelectOption}
            >
                <SelectTrigger>
                    <SelectPlaceholder>{props.placeholder}</SelectPlaceholder>
                    <SelectValue>
                        {({ selectedOptions }) => (
                            <Flex alignItems="flex-start">
                                <For each={selectedOptions}>
                                    {selectedOption => (
                                        <Tag
                                            borderRadius={5}
                                            m="0.125em 0.25em 0.125em 0"
                                        >
                                            <Show when={
                                                (getOptionFromValue(selectedOption.value) != null) &&
                                                (getOptionFromValue(selectedOption.value)!.image != null)
                                            }>
                                                <Image
                                                    src={getOptionFromValue(selectedOption.value)!.image}
                                                    alt={getOptionFromValue(selectedOption.value)!.title}
                                                    borderRadius={3}
                                                    height="1em"
                                                    width="1em"
                                                    mr="0.5em"
                                                />
                                            </Show>
                                            <TagLabel textAlign="start">{selectedOption.textValue}</TagLabel>
                                        </Tag>
                                    )}
                                </For>
                            </Flex>
                        )}
                    </SelectValue>
                    <SelectIcon />
                </SelectTrigger>
                <SelectContent>
                    <SelectListbox>
                        <For each={props.options}>
                            {item => (
                                <SelectOption value={item.value}>
                                    <Show when={item.image != null}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            borderRadius={5}
                                            maxHeight="2em"
                                            maxWidth="2em"
                                            ml="0.5em"
                                        />
                                    </Show>
                                    <SelectOptionText>{item.title}</SelectOptionText>
                                    <SelectOptionIndicator />
                                </SelectOption>
                            )}
                        </For>
                    </SelectListbox>
                </SelectContent>
            </Select>
            <Show when={!isValid().isValid} >
                <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
            </Show>
        </FormControl>
    );
}