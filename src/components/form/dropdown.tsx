import { Component } from 'solid-js';

import { PlatformType } from '../../contracts/dto/enum/platformType';
import { ValidationResult } from '../../contracts/validationResult';
import { getArrFromEnum } from '../../helper/enumHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { Dropdown, IDropdownOption } from '../common/dropdown';
import { makeArrayOrDefault } from '../../helper/arrayHelper';

interface IProps {
    id: string;
    placeholder?: string;
    label: string;
    value: Array<string>;
    options: Array<IDropdownOption>;
    multiple?: boolean;
    onChange?: (values: Array<string> | string) => void;
    validation?: (value: Array<string> | string) => ValidationResult;
}

export const FormDropdown: Component<IProps> = (props: IProps) => {

    return (
        <Dropdown
            title="Labels"
            selectedValues={makeArrayOrDefault(props.value)}
            multiple={props.multiple}
            placeholder={props.placeholder}
            onSelect={props.onChange}
            validation={props.validation}
            options={props.options}
        />
    );
}