import { Component } from 'solid-js';

import { ValidationResult } from '../../contracts/validationResult';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { Dropdown, IDropdownOption } from '../common/dropdown';

interface IProps {
    id: string;
    placeholder?: string;
    label: string;
    value: Array<string>;
    options: Array<IDropdownOption>;
    multiple?: boolean;
    showValidationMessages?: boolean;
    onChange?: (values: Array<string> | string) => void;
    validation?: (value: Array<string> | string) => ValidationResult;
}

export const FormDropdown: Component<IProps> = (props: IProps) => {

    return (
        <Dropdown
            title={props.label}
            selectedValues={makeArrayOrDefault(props.value)}
            multiple={props.multiple}
            placeholder={props.placeholder}
            showValidationMessages={props.showValidationMessages}
            onSelect={props.onChange}
            validation={props.validation}
            options={props.options}
        />
    );
}