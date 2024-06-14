import { Component } from 'solid-js';

import { portalValidOptions } from '@constants/form';
import { galaxyDropdown } from '@constants/galaxy';
import { Labels } from '@constants/labels';
import { funnyPlayerNames } from '@constants/names';
import { contactDetailsMaxLength } from '@contracts/dto/forms/baseFormDto';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import {
  CommunityDtoMeta,
  communityBioMaxLength,
  communityBioMaxUploads,
} from '@contracts/dto/forms/meta/communityDto.meta';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { randomItemFromArray } from '@helpers/randomHelper';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { FormProfileImageInput } from '@web/components/form/image/profileImage';
import { FormMediaUploadInput } from '@web/components/form/mediaUpload/mediaUpload';
import { PortalCoordInput } from '@web/components/form/portal/portalCoords';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { PropertyOverrides } from '@web/contracts/formTypes';

export const CommunityFormPage: Component = () => {
  const propertyOverrides: Array<PropertyOverrides<CommunityDto>> = [
    {
      bioMediaUrls: (origVal) => makeArrayOrDefault(origVal),
    },
  ];

  return (
    <FormBuilder
      id="CommunityDto"
      segment="community"
      title="Submit a community"
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
          placeholder: 'youtube.com/watch?v=...',
        },
        bioMediaFiles: {
          component: FormMediaUploadInput,
          gridItemColumnSize: GridItemSize.long,
          placeholder: 'Upload your images',
          additional: {
            maxUploads: (_) => communityBioMaxUploads,
          },
        },
        homeGalaxy: {
          component: FormDropdown,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Select your Galaxy',
          additional: {
            options: (_) => galaxyDropdown,
          },
        },
        coordinates: {
          component: PortalCoordInput,
          gridItemColumnSize: GridItemSize.xxlong,
          placeholder: portalValidOptions.map((p) => p.toUpperCase()).join(''),
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
  );
};

export default CommunityFormPage;
