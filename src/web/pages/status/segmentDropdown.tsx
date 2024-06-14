import { Component } from 'solid-js';

import { segmentLabels } from '@constants/api';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { minItems, selectedItemsExist } from '@validation/arrayValidation';
import { multiValidation } from '@validation/baseValidation';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';

const segmentOptions = Object.keys(segmentLabels).map((seg) => ({
  title: capitalizeFirstLetter(addSpacesForEnum(seg)),
  value: seg,
}));
export const segmentValidation = multiValidation<Array<string>>(
  minItems(1),
  selectedItemsExist(Object.keys(segmentLabels)),
);

interface IProps {
  value: Array<string>;
  showValidationMessages: boolean;
  onChange: (newValue: string | Array<string>) => void;
}

export const SegmentDropdown: Component<IProps> = (props: IProps) => {
  return (
    <FormDropdown
      id="segment"
      label="From type"
      placeholder="Select the form type"
      value={props.value}
      options={segmentOptions}
      showValidationMessages={props.showValidationMessages}
      validation={(val) => segmentValidation(val as Array<string>)}
      onChange={props.onChange}
    />
  );
};
