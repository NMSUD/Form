import { Button, HStack, Tag, notificationService } from "@hope-ui/solid";
import { Component, For, Show, createSignal } from "solid-js";
import { NetworkState } from "../../constants/enum/networkState";
import { Result } from "../../contracts/resultWithValue";
import { IValidationObject, validateObj } from "../../contracts/validation/baseValidation";
import { ValidationResult } from "../../contracts/validationResult";
import { anyObject } from "../../helper/typescriptHacks";
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from "./grid";
import { nameof } from "../../helper/propHelper";

interface IPropertyToFormMappingExtraProp<T> {
    [prop: string]: (item: T) => any;
}

export type IComponentMapping<T> = {
    [prop in keyof T]?: IPropertyToFormMapping<T>;
};

export interface IPropertyToFormMapping<T> {
    component: Component<any>;
    gridItemColumnSize: GridItemSize;
    gridItemRowSize?: GridItemSize;
    label: string;
    placeholder?: string;
    additional?: IPropertyToFormMappingExtraProp<T>;
}

interface IProps<T> {
    item: T;
    id: string;
    mappings: IComponentMapping<T>;
    validationObj: IValidationObject<T>;
    updateObject: (item: T) => void;
    updateProperty: (prop: string, value: any) => void;
    submit: (item: T, captcha: string) => Promise<Result>;
}

export const FormBuilder = <T,>(props: IProps<T>) => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(props.item);
    const [forceValidationMessages, setForceValidationMessages] = createSignal<boolean>(false);
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Pending);

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
            validationObj: props.validationObj,
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
        const submitTask = await props.submit(itemBeingEdited(), '11111111111111111');
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
                        const validator: (val: T) => ValidationResult =
                            (props.validationObj as any)?.[itemPropName]?.validator;

                        return (
                            <FormFieldGridCell
                                colSpan={item.gridItemColumnSize}
                                rowSpan={item.gridItemRowSize ?? GridItemSize.xsmol}
                            >
                                <Component
                                    {...getExtraProps(item, itemBeingEdited())}
                                    id={`${props.id}-${itemPropName}`}
                                    label={item.label}
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
