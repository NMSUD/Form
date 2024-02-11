import { Component } from 'solid-js';

import { Labels } from '@constants/labels';
import { funnyPlayerNames } from '@constants/names';
import {
  BuilderDto,
  BuilderDtoMeta,
  builderBioMaxLength,
  builderContactDetailsMaxLength,
  builderStartedPlayingMaxDate,
  builderStartedPlayingMinDate,
} from '@contracts/dto/forms/builderDto';
import { communityToDropdown } from '@contracts/dto/forms/communityDto';
import { formatDate } from '@helpers/dateHelper';
import { randomItemFromArray } from '@helpers/randomHelper';
import { Card } from '@web/components/common/card';
import { PageHeader } from '@web/components/common/pageHeader';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { extendedFormDropdownOptions } from '@web/components/form/dropdown/extendedFormDropdownOptions';
import { FormNetworkDropdown } from '@web/components/form/dropdown/networkDropdown';
import { PlatformTypeDropdown } from '@web/components/form/dropdown/platformTypeDropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { FormProfileImageInput } from '@web/components/form/image/profileImage';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { PropertyOverrides } from '@web/contracts/formTypes';

export const BuilderFormPage: Component = () => {
  const propertyOverrides: Array<PropertyOverrides<BuilderDto>> = [
    {
      startedPlaying: (origVal) =>
        origVal ?? formatDate(builderStartedPlayingMaxDate, 'YYYY-MM-DD'),
    },
  ];
  const communityDropdownPromise = extendedFormDropdownOptions('community', communityToDropdown);

  return (
    <>
      <PageHeader text="Submit a builder profile"></PageHeader>

      <Card class="form">
        <FormBuilder
          id="BuilderDto"
          segment="builder"
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
              placeholder: 'Select your labels',
              additional: {
                options: (_) =>
                  Labels.BuildingTechniques.map((lbl) => ({ title: lbl, value: lbl })),
                multiple: (_) => true,
              },
            },
            socials: {
              component: FormSocialInput,
              gridItemColumnSize: GridItemSize.medium,
              placeholder: 'https://youtube.com/...',
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
                maxTextLength: (_) => builderContactDetailsMaxLength,
              },
            },
          }}
        />
      </Card>
    </>
  );
};

export default BuilderFormPage;
