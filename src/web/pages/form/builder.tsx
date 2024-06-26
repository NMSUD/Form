import { Component } from 'solid-js';

import { Labels } from '@constants/labels';
import { funnyPlayerNames } from '@constants/names';
import { contactDetailsMaxLength } from '@contracts/dto/forms/baseFormDto';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import {
  BuilderDtoMeta,
  builderBioMaxLength,
  builderStartedPlayingMaxDate,
  builderStartedPlayingMinDate,
} from '@contracts/dto/forms/meta/builderDto.meta';
import { formatDate, formatForDateDropdown } from '@helpers/dateHelper';
import { randomItemFromArray } from '@helpers/randomHelper';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { extendedFormDropdownOptions } from '@web/components/form/dropdown/extendedFormDropdownOptions';
import { FormNetworkDropdown } from '@web/components/form/dropdown/networkDropdown';
import { PlatformTypeDropdown } from '@web/components/form/dropdown/platformTypeDropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { FormProfileImageInput } from '@web/components/form/image/profileImage';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormTagInput } from '@web/components/form/tag/tagInput';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { PropertyOverrides } from '@web/contracts/formTypes';
import { communityToDropdown } from '../../../mapper/communityDropdown';

export const BuilderFormPage: Component = () => {
  const propertyOverrides: Array<PropertyOverrides<BuilderDto>> = [
    {
      startedPlaying: (origVal) => origVal ?? formatForDateDropdown(builderStartedPlayingMaxDate),
    },
  ];
  const communityDropdownPromise = extendedFormDropdownOptions('community', communityToDropdown);

  return (
    <FormBuilder
      id="BuilderDto"
      segment="builder"
      title="Submit a builder profile"
      getName={(dto: BuilderDto) => dto.name}
      formDtoMeta={BuilderDtoMeta}
      propertyOverrides={propertyOverrides}
      mappings={{
        profilePicFile: {
          component: FormProfileImageInput,
          gridItemColumnSize: GridItemSize.smol,
          gridItemRowSize: GridItemSize.smol,
        },
        name: {
          component: FormLongInput,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: randomItemFromArray(funnyPlayerNames),
        },
        platforms: {
          component: PlatformTypeDropdown,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Select your platforms',
          additional: {
            multiple: (_) => true,
          },
        },
        startedPlaying: {
          component: FormLongInput,
          gridItemColumnSize: GridItemSize.smol,
          placeholder: 'date',
          additional: {
            inputType: (_) => 'date',
            min: (_) => formatDate(builderStartedPlayingMinDate, 'YYYY-MM-DD'),
            max: (_) => formatDate(builderStartedPlayingMaxDate, 'YYYY-MM-DD'),
          },
        },
        buildTechniquesUsed: {
          component: FormDropdown,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Select your techniques',
          additional: {
            options: (_) => Labels.BuildingTechniques.map((lbl) => ({ title: lbl, value: lbl })),
            multiple: (_) => true,
          },
        },
        communityAffiliations: {
          component: FormNetworkDropdown,
          gridItemColumnSize: GridItemSize.long,
          placeholder: 'Select your communities',
          additional: {
            multiple: (_) => true,
            optionsPromise: () => communityDropdownPromise,
          },
        },
        labels: {
          component: FormTagInput,
          gridItemColumnSize: GridItemSize.long,
          placeholder: 'Select your labels',
        },
        socials: {
          component: FormSocialInput,
          gridItemColumnSize: GridItemSize.long,
          placeholder: 'youtube.com/watch?v=...',
        },
        bio: {
          component: FormTextArea,
          gridItemColumnSize: GridItemSize.full,
          placeholder: 'Hi, I like to build lots of...',
          additional: {
            displayTextLength: (_) => true,
            maxTextLength: (_) => builderBioMaxLength,
          },
        },
        contactDetails: {
          component: FormTextArea,
          gridItemColumnSize: GridItemSize.full,
          placeholder: 'Email, Discord, etc',
          additional: {
            displayTextLength: (_) => true,
            maxTextLength: (_) => contactDetailsMaxLength,
          },
        },
      }}
    />
  );
};

export default BuilderFormPage;
