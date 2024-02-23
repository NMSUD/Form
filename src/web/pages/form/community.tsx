import { Component } from 'solid-js';

import { Labels } from '@constants/labels';
import { funnyPlayerNames } from '@constants/names';
import {
  CommunityDto,
  CommunityDtoMeta,
  communityBioMaxLength,
} from '@contracts/dto/forms/communityDto';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { randomItemFromArray } from '@helpers/randomHelper';
import { Card } from '@web/components/common/card';
import { PageHeader } from '@web/components/common/pageHeader';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { FormProfileImageInput } from '@web/components/form/image/profileImage';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { PropertyOverrides } from '@web/contracts/formTypes';
import { contactDetailsMaxLength } from '@contracts/dto/forms/baseFormDto';

export const CommunityFormPage: Component = () => {
  const propertyOverrides: Array<PropertyOverrides<CommunityDto>> = [
    {
      bioMediaUrls: (origVal) => makeArrayOrDefault(origVal),
    },
  ];

  return (
    <>
      <PageHeader text="Submit a community"></PageHeader>

      <Card class="form">
        <FormBuilder
          id="CommunityDto"
          segment="community"
          getName={(dto: CommunityDto) => dto.name}
          formDtoMeta={CommunityDtoMeta}
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
            tags: {
              component: FormDropdown,
              gridItemColumnSize: GridItemSize.long,
              placeholder: 'Select your tags',
              additional: {
                options: (_) => Labels.Community.map((lbl) => ({ title: lbl, value: lbl })),
                multiple: (_) => true,
              },
            },
            socials: {
              component: FormSocialInput,
              gridItemColumnSize: GridItemSize.medium,
              placeholder: 'https://youtube.com/...',
            },
            bioMediaFiles: {
              component: FormSocialInput,
              gridItemColumnSize: GridItemSize.small,
              placeholder: 'Upload your images',
            },
            bio: {
              component: FormTextArea,
              gridItemColumnSize: GridItemSize.full,
              placeholder: 'We are a community that focusses on ...',
              additional: {
                displayTextLength: (_) => true,
                maxTextLength: (_) => communityBioMaxLength,
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
      </Card>
    </>
  );
};

export default CommunityFormPage;
