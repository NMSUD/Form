import { Component } from 'solid-js';

import { portalValidOptions } from '@constants/form';
import { galaxyDropdown } from '@constants/galaxy';
import { Labels } from '@constants/labels';
import { contactDetailsMaxLength } from '@contracts/dto/forms/baseFormDto';
import { PlanetBuildDtoMeta } from '@contracts/dto/forms/meta/planetBuildDto.meta';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { extendedFormDropdownOptions } from '@web/components/form/dropdown/extendedFormDropdownOptions';
import { FormNetworkDropdown } from '@web/components/form/dropdown/networkDropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { PortalCoordInput } from '@web/components/form/portal/portalCoords';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { PropertyOverrides } from '@web/contracts/formTypes';
import { builderToDropdown } from '../../../mapper/builderDropdown';

export const PlanetBuildFormPage: Component = () => {
  const propertyOverrides: Array<PropertyOverrides<PlanetBuildDto>> = [
    {
      mediaFiles: (origVal) => makeArrayOrDefault(origVal),
    },
  ];

  const builderDropdownPromise = extendedFormDropdownOptions('builder', builderToDropdown);

  return (
    <FormBuilder
      id="PlanetBuildDto"
      segment="planetBuild"
      title="Submit a build"
      getName={(dto: PlanetBuildDto) => dto.name}
      formDtoMeta={PlanetBuildDtoMeta}
      propertyOverrides={propertyOverrides}
      mappings={{
        name: {
          component: FormLongInput,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Super awesome build',
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
        builders: {
          component: FormNetworkDropdown,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Select the builders who worked on this build',
          additional: {
            multiple: (_) => true,
            optionsPromise: () => builderDropdownPromise,
          },
        },
        galaxy: {
          component: FormDropdown,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Select your Galaxy',
          additional: {
            options: (_) => galaxyDropdown,
          },
        },
        systemName: {
          component: FormLongInput,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Wicked System',
        },
        planetName: {
          component: FormLongInput,
          gridItemColumnSize: GridItemSize.medium,
          placeholder: 'Paradise Planet',
        },
        coordinates: {
          component: PortalCoordInput,
          gridItemColumnSize: GridItemSize.full,
          placeholder: portalValidOptions.map((p) => p.toUpperCase()).join(''),
        },
        mediaFiles: {
          component: FormSocialInput,
          gridItemColumnSize: GridItemSize.long,
          placeholder: 'youtube.com/watch?v=...',
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

export default PlanetBuildFormPage;
