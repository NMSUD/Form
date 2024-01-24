import { Button, HStack, Tag, notificationService } from "@hope-ui/solid";
import { Component, For, Show, createEffect, createSignal } from "solid-js";

import { NetworkState } from "../../constants/enum/networkState";
import { Result } from "../../contracts/resultWithValue";
import { validateObj } from "../../contracts/validation/baseValidation";
import { ValidationResult } from "../../contracts/validationResult";
import { anyObject } from "../../helper/typescriptHacks";
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from "./grid";
import { nameof } from "../../helper/propHelper";
import { getCaptchaService } from "../../services/external/captchaService";
import { IFormDtoMeta, IFormDtoMetaDetails } from "../../contracts/dto/forms/baseFormDto";

interface IPropertyToFormMappingExtraProp<T> {
    [prop: string]: (item: T) => any;
}

export type IComponentMapping<T> = {
    [prop in keyof T]?: IPropertyToFormMapping<T>;
};

export type IFormInputProps<T> = {
    id: string;
    label: string;
    value: T;
    placeholder: string;
    showValidationMessages: boolean;
    validation: (val: T) => ValidationResult;
    onChange: (newValue: T) => void;
};

export interface IPropertyToFormMapping<T> {
    component: Component<IFormInputProps<any>>;
    gridItemColumnSize: GridItemSize;
    gridItemRowSize?: GridItemSize;
    placeholder?: string;
    additional?: IPropertyToFormMappingExtraProp<T>;
}

interface IProps<T> {
    item: T;
    id: string;
    mappings: IComponentMapping<T>;
    formDtoMeta: IFormDtoMeta<T>;
    updateObject: (item: T) => void;
    updateProperty: (prop: string, value: any) => void;
    submit: (item: T, captcha: string) => Promise<Result>;
}

export const FormBuilder = <T,>(props: IProps<T>) => {
    let captchaRef: any;
    const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(props.item);
    const [forceValidationMessages, setForceValidationMessages] = createSignal<boolean>(false);
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

    setTimeout(async () => {
        await getCaptchaService().loadUI(captchaRef);
        setNetworkState(NetworkState.Pending);
    }, 500);

    const updateProperty = (prop: string, value: any) => {
        setItemBeingEdited(prev => ({ ...prev, [prop]: value }) as any);
        props.updateProperty(prop, value);
    }

    const getExtraProps = (localItem: IPropertyToFormMapping<T>, localItemBeingEdited: T) => {
        let extraProps = anyObject;
        if (localItem.additional == null) return extraProps;

        for (const additionalProp in localItem.additional) {
            if (Object.prototype.hasOwnProperty.call(localItem.additional, additionalProp) == false) continue

            const propFunc: (item: T) => any = localItem.additional[additionalProp];
            extraProps = { ...extraProps, [additionalProp]: propFunc(localItemBeingEdited) };
        }

        return extraProps;
    }

    const submitForm = async () => {

        const failedValidationMsgs = validateObj({
            data: itemBeingEdited(),
            validationObj: props.formDtoMeta,
            inludeLabelInErrMsgs: true,
        }).filter(v => v.isValid === false);

        if (failedValidationMsgs.length > 0) {
            for (const failedValidationMsg of failedValidationMsgs) {
                notificationService.show({
                    status: 'danger',
                    title: 'There are some problems that need fixing!',
                    description: `${failedValidationMsg.errorMessage}`,
                });
            }
            setForceValidationMessages(true);
            return;
        }

        setNetworkState(NetworkState.Loading);

        const captchaResult = await getCaptchaService().promptUser();
        if (captchaResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: 'Captcha faile!',
                description: 'The captcha was cancelled or failed to load, please try again.',
            })
        }

        const submitTask = await props.submit(itemBeingEdited(), captchaResult.value);
        if (submitTask.isSuccess === false) {
            setNetworkState(NetworkState.Success);
            return;
        }

        notificationService.show({
            status: 'success',
            title: 'Form submitted successfully',
            description: 'Thank you for your submission! We will verify your submission as soon as possible',
        });
        setNetworkState(NetworkState.Success);
    }

    return (
        <>
            <FormFieldGrid>
                <For each={Object.keys(props.mappings)}>
                    {(itemPropName) => {
                        const item: IPropertyToFormMapping<T> = (props.mappings as any)[itemPropName];
                        const Component = item.component;

                        const dtoMeta: IFormDtoMetaDetails<any> = (props.formDtoMeta as any)?.[itemPropName];
                        const { label, validator } = dtoMeta;

                        return (
                            <FormFieldGridCell
                                colSpan={item.gridItemColumnSize}
                                rowSpan={item.gridItemRowSize ?? GridItemSize.xsmol}
                            >
                                <Component
                                    {...getExtraProps(item, itemBeingEdited())}
                                    id={`${props.id}-${itemPropName}`}
                                    label={label}
                                    value={(itemBeingEdited() as any)[itemPropName]}
                                    placeholder={item.placeholder}
                                    validation={validator}
                                    showValidationMessages={forceValidationMessages()}
                                    onChange={(newValue: string) => updateProperty(itemPropName, newValue)}
                                />
                            </FormFieldGridCell>
                        );
                    }}
                </For>
            </FormFieldGrid>
            <Show when={networkState() === NetworkState.Error}>
                <HStack mt="1em" spacing="$4" justifyContent="center">
                    <Tag colorScheme="danger">Something went wrong when submitting your data</Tag>
                </HStack>
            </Show>
            <HStack mt="1em" spacing="$4" justifyContent="center">
                <div ref={el => captchaRef = el}></div>
                <Button
                    variant="solid"
                    loading={networkState() === NetworkState.Loading}
                    onClick={submitForm}
                >Submit</Button>
                <Button
                    variant="outline"
                    colorScheme="warning"
                    onClick={() => setItemBeingEdited(anyObject)}
                >Clear all fields</Button>
            </HStack>
        </>
    );
};
