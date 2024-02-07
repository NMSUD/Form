import { Component, Match, Show, Switch, createEffect, createSignal } from 'solid-js';

import { IDropdownOption } from '@contracts/dropdownOption';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { Dropdown } from '../../common/dropdown';
import { IFormInputProps } from '../formBuilder';
import { NetworkState } from '@constants/enum/networkState';
import { ResultWithValue } from '@contracts/resultWithValue';
import {
  FormControl,
  FormLabel,
  Select,
  SelectIcon,
  SelectPlaceholder,
  SelectTrigger,
  Text,
} from '@hope-ui/solid';
import { LoadingSpinner } from '@web/components/core/loading';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';

interface IProps extends IFormInputProps<Array<string>> {
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
          onSelect={props.onChange}
          validation={props.validation}
          options={makeArrayOrDefault(options())}
        />
      }
    >
      <Match when={networkState() === NetworkState.Loading}>
        <FormControl>
          <FormLabel>
            {props.label}
            <HelpIconTooltip helpText={props.helpText} />
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
