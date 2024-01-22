import { Component } from 'solid-js';

import { PlatformType, friendlyPlatformName } from '../../contracts/dto/enum/platformType';
import { ValidationResult } from '../../contracts/validationResult';
import { getArrFromEnum } from '../../helper/enumHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { Dropdown } from '../common/dropdown';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { AppImage } from '../../constants/image';

interface IProps {
    placeholder?: string;
    value: Array<string>;
    multiple?: boolean;
    onChange?: (values: Array<string> | string) => void;
    validation?: (value: Array<string> | string) => ValidationResult;
}

export const PlatformTypeDropdown: Component<IProps> = (props: IProps) => {

    return (
        <Dropdown
            title={props.multiple == true ? 'Platforms' : 'Platform'}
            selectedValues={makeArrayOrDefault(props.value)
                .map(value =>
                    isNaN(value as any)
                        ? PlatformType[value as any]
                        : (value as any)
                )
            }
            multiple={props.multiple}
            placeholder={props.placeholder}
            onSelect={props.onChange}
            validation={props.validation}
            options={getArrFromEnum(PlatformType)
                .map(pType => ({
                    title: friendlyPlatformName(pType as any),
                    value: pType as any,
                    image: `${AppImage.platformFolder}/${PlatformType[pType as any]}.svg`
                }))}
        />
    );
}