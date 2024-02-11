import { Component } from 'solid-js';

import { IDropdownOption } from '@contracts/dropdownOption';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { Dropdown } from '../../common/dropdown';

interface IProps extends FormInputProps<Array<string>> {
  options?: Array<IDropdownOption>;
  multiple?: boolean;
}

export const FormDropdown: Component<IProps> = (props: IProps) => {
  return (
    <Dropdown
      title={props.label}
      helpText={props.helpText}
      selectedValues={makeArrayOrDefault(props.value)}
      multiple={props.multiple}
      placeholder={props.placeholder}
      showValidationMessages={props.showValidationMessages}
      onSelect={props.onChange}
      validation={props.validation}
      options={makeArrayOrDefault(props.options)}
    />
  );
};
