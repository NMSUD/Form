import { Component } from 'solid-js';

import { IDropdownOption } from '@contracts/dropdownOption';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { Dropdown } from '../../common/dropdown';

interface IProps extends FormInputProps<string | Array<string>> {
  options?: Array<IDropdownOption>;
  multiple?: boolean;
}

export const FormDropdown: Component<IProps> = (props: IProps) => {
  const localOnChange = (value: Array<string>) => {
    if (props.multiple === false && (value?.length ?? 0) === 1) {
      props.onChange?.(value[0]);
    }
    props.onChange?.(value);
  };

  return (
    <Dropdown
      title={props.label}
      helpText={props.helpText}
      selectedValues={makeArrayOrDefault(props.value)}
      multiple={props.multiple}
      placeholder={props.placeholder}
      showValidationMessages={props.showValidationMessages}
      onChange={localOnChange}
      validation={props.validation}
      options={makeArrayOrDefault(props.options)}
    />
  );
};
