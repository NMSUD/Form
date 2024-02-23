import { Component } from 'solid-js';

import { portalValidOptions } from '@constants/form';
import { galaxies } from '@constants/galaxy';
import { Labels } from '@constants/labels';
import { contactDetailsMaxLength } from '@contracts/dto/forms/baseFormDto';
import { PlanetBuildDto, PlanetBuildDtoMeta } from '@contracts/dto/forms/planetBuildDto';
import { Card } from '@web/components/common/card';
import { PageHeader } from '@web/components/common/pageHeader';
import { FormDropdown } from '@web/components/form/dropdown/dropdown';
import { extendedFormDropdownOptions } from '@web/components/form/dropdown/extendedFormDropdownOptions';
import { FormNetworkDropdown } from '@web/components/form/dropdown/networkDropdown';
import { FormBuilder } from '@web/components/form/formBuilder';
import { GridItemSize } from '@web/components/form/grid';
import { PortalCoordInput } from '@web/components/form/portal/portalCoords';
import { FormSocialInput } from '@web/components/form/socialLink/social';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';
import { builderToDropdown } from '../../../mapper/builderDropdown';

export const PlanetBuildFormPage: Component = () => {
  const builderDropdownPromise = extendedFormDropdownOptions('builder', builderToDropdown);

  return (
    <>
      <PageHeader text="Submit a build"></PageHeader>

      <Card class="form">
        <FormBuilder
          id="PlanetBuildDto"
          segment="planetBase"
          getName={(dto: PlanetBuildDto) => dto.name}
          formDtoMeta={PlanetBuildDtoMeta}
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
                options: (_) =>
                  Labels.BuildingTechniques.map((lbl) => ({ title: lbl, value: lbl })),
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
                options: (_) =>
                  galaxies.map((lbl, index) => ({
                    title: lbl,
                    listTitle: `${index + 1}: ${lbl}`,
                    value: lbl,
                  })),
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
              placeholder: 'Upload your images',
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

export default PlanetBuildFormPage;
