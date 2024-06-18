import {
  FormControl,
  FormLabel,
  Select,
  SelectIcon,
  SelectPlaceholder,
  SelectTrigger,
  Text,
} from '@hope-ui/solid';
import { Component, Match, Switch, createSignal } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { IDropdownOption } from '@contracts/dropdownOption';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { LoadingSpinner } from '@web/components/core/loading';
import { FormInputProps } from '@web/contracts/formTypes';
import { Dropdown } from '../../common/dropdown';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IProps extends FormInputProps<Array<string>> {
  optionsPromise?: Promise<ResultWithValue<Array<IDropdownOption>>>;
  multiple?: boolean;
}

export const FormNetworkDropdown: Component<IProps> = (props: IProps) => {
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
  const [options, setOptions] = createSignal<Array<IDropdownOption>>([]);

  const getOptionsNetworkCall = async () => {
    if (props.optionsPromise == null) {
      setNetworkState(NetworkState.Error);
      return;
    }

    setNetworkState(NetworkState.Loading);
    const apiResponse = await props.optionsPromise;
    if (apiResponse.isSuccess === false) {
      setNetworkState(NetworkState.Error);
      return;
    }

    setOptions(apiResponse.value);
    setNetworkState(NetworkState.Success);
  };

  getOptionsNetworkCall();

  return (
    <Switch
      fallback={
        <Dropdown
          title={props.label}
          helpText={props.helpText}
          selectedValues={makeArrayOrDefault(props.value)}
          multiple={props.multiple}
          placeholder={props.placeholder}
          showValidationMessages={props.showValidationMessages}
          onChange={props.onChange}
          validation={props.validation}
          options={makeArrayOrDefault(options())}
        />
      }
    >
      <Match when={networkState() === NetworkState.Loading}>
        <FormControl>
          <FormLabel>
            <HelpIconTooltip label={props.label} helpText={props.helpText} />
          </FormLabel>
          <Select disabled>
            <SelectTrigger>
              <SelectPlaceholder>{props.placeholder}</SelectPlaceholder>
              <LoadingSpinner />
              <SelectIcon />
            </SelectTrigger>
          </Select>
        </FormControl>
      </Match>
      <Match when={networkState() === NetworkState.Error}>
        <Text>Something went wrong</Text>
      </Match>
    </Switch>
  );
};
