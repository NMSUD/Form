import { Component, For, createSignal } from "solid-js";
import { ValidationResult } from "../../contracts/validationResult";
import { anyObject } from "../../helper/typescriptHacks";
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from "./grid";

interface IPropertyToFormMappingExtraProp<T> {
    prop: string;
    value: (item: T) => any;
}

export interface IPropertyToFormMapping<T> {
    component: Component<any>;
    gridItemColumnSize: GridItemSize;
    gridItemRowSize?: GridItemSize;
    property: string;
    label: string;
    placeholder?: string;
    additional?: Array<IPropertyToFormMappingExtraProp<T>>;
}

interface IProps<T> {
    item: T;
    id: string;
    mappings: Array<IPropertyToFormMapping<T>>;
    validatorObj: { [prop in keyof T]: (val: T) => ValidationResult }
    updateObject: (item: T) => void
    updateProperty: (prop: string, value: any) => void
}

export const FormBuilder: Component<IProps<any>> = <T,>(props: IProps<T>) => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(props.item);

    const updateProperty = (prop: string, value: any) => {
        setItemBeingEdited(prev => ({ ...prev, [prop]: value }) as any);
        props.updateProperty(prop, value);
    }

    return (
        <FormFieldGrid>
            <For each={props.mappings}>
                {(item) => {
                    const Component = item.component;

                    const getExtraProps = (localItemBeingEdited: T) => {
                        let extraProps = anyObject;
                        for (const extra of (item.additional ?? [])) {
                            extraProps = { ...extraProps, [extra.prop]: extra.value(localItemBeingEdited) };
                        }
                        return extraProps;
                    }

                    const validator: (val: T) => ValidationResult = (props.validatorObj as any)[item.property];

                    return (
                        <FormFieldGridCell
                            colSpan={item.gridItemColumnSize}
                            rowSpan={item.gridItemRowSize ?? GridItemSize.xsmol}
                        >
                            <Component
                                {...getExtraProps(itemBeingEdited())}
                                id={`${props.id}-${item.property}`}
                                label={item.label}
                                value={(itemBeingEdited() as any)[item.property]}
                                placeholder={item.placeholder}
                                validation={validator}
                                onChange={(newValue: string) => updateProperty(item.property, newValue)}
                            />
                        </FormFieldGridCell>
                    );
                }}
            </For>
        </FormFieldGrid>
    );
};
