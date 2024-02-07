import { Component, createSignal } from 'solid-js';

import { Labels } from '@constants/labels';
import { funnyPlayerNames } from '@constants/names';
import {
  BuilderDto,
  BuilderDtoMeta,
  builderBioMaxLength,
  builderContactDetailsMaxLength,
} from '@contracts/dto/forms/builderDto';
import { communityToDropdown } from '@contracts/dto/forms/communityDto';
import { formatDate } from '@helpers/dateHelper';
import { getDropdownOptionsPromise } from '@helpers/dropdownHelper';
import { randomItemFromArray } from '@helpers/randomHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getFormApiService } from '@services/api/formApiService';
import { Card } from '@web/components/common/card';
import { PageHeader } from '@web/components/common/pageHeader';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { FormNetworkDropdown } from '@web/components/form/dropdown/networkDropdown';
import { PlatformTypeDropdown } from '@web/components/form/dropdown/platformTypeDropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { FormProfileImageInput } from '@web/components/form/image/profileImage';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';

export const BuilderFormPage: Component = () => {
  const [itemBeingEdited, setItemBeingEdited] = createSignal<BuilderDto>({
    ...anyObject,
    startedPlaying: formatDate(new Date(), 'YYYY-MM-DD'),
  });

  const communityDropdownPromise = getDropdownOptionsPromise('community', communityToDropdown);

  return (
    <>
      <PageHeader text="Submit a builder profile"></PageHeader>

      <Card class="form">
        <FormBuilder
          item={itemBeingEdited()}
          id="BuilderDto"
          segment="builder"
          getName={(dto: BuilderDto) => dto.name}
          formDtoMeta={BuilderDtoMeta}
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
                min: (_) => formatDate('2016-08-09', 'YYYY-MM-DD'),
                max: (_) => formatDate(new Date(), 'YYYY-MM-DD'),
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
              placeholder: 'Hi, my name is ...',
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
          updateObject={(item: BuilderDto) => setItemBeingEdited((_) => item)}
          updateProperty={(prop: string, value: unknown) => {
            console.log('create', { prop, value });
            setItemBeingEdited((prev) => ({ ...prev, [prop]: value }));
          }}
          submit={(data, captcha) => getFormApiService().submitBuilder(data, captcha)}
        />
      </Card>
    </>
  );
};

export default BuilderFormPage;
