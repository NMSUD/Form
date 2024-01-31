import { IDropdownOption } from '@contracts/dropdownOption';

export const getArrFromEnum = <E, K extends string>(enumType: { [key in K]: E }): Array<string> => {
  const result: Array<string> = Object.keys(enumType).filter((dt) => isNaN(Number(dt)) == true); // filter out the number keys
  return result;
};

export const getDropDownOptionsFromEnum = <T extends {}>(enumType: T): Array<IDropdownOption> => {
  const result: Array<IDropdownOption> = Object.keys(enumType)
    .filter((dt) => isNaN(Number(dt)) == false)
    .map((i) => ({
      title: (enumType as { [p: string]: string })[i],
      value: i,
    }));
  return result;
};
