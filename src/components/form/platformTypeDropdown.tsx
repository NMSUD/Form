import { Component } from 'solid-js';

import { AppImage } from '../../constants/image';
import { PlatformType, friendlyPlatformName } from '../../contracts/dto/enum/platformType';
import { makeArrayOrDefault } from '../../helper/arrayHelper';
import { getArrFromEnum } from '../../helper/enumHelper';
import { Dropdown } from '../common/dropdown';
import { IFormInputProps } from './formBuilder';

interface IProps extends IFormInputProps<Array<string>> {
    multiple?: boolean;
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
            showValidationMessages={props.showValidationMessages}
            options={getArrFromEnum(PlatformType)
                .map(pType => ({
                    title: friendlyPlatformName(pType as any),
                    value: pType as any,
                    image: `${AppImage.platformFolder}/${PlatformType[pType as any]}.svg`
                }))}
        />
    );
}