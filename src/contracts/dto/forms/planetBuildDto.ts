import { IFormDtoMeta, contactDetails } from '@contracts/dto/forms/baseFormDto';
import { minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  separateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { maxLength, minLength } from '@validation/textValidation';

export interface PlanetBuildDto {
  id: string;
  name: string;
  mediaUrls: Array<string>;
  mediaFiles: Array<File>;
  galaxy: string;
  systemName: string;
  planetName: string;
  coordinates: string;
  buildTechniquesUsed: Array<string>;
  builders: Array<string>;
  contactDetails: string;
}

export const PlanetBuildDtoMeta: IFormDtoMeta<PlanetBuildDto> = {
  id: {
    label: 'Id',
    validator: noValidation,
  },
  name: {
    label: 'Name',
    defaultValue: '',
    helpText: 'The IN-GAME name of the build',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  mediaUrls: {
    label: 'Media',
    defaultValue: [],
    saveToLocalStorage: true,
    validator: noValidation,
  },
  mediaFiles: {
    label: 'Media upload',
    saveToLocalStorage: true,
    validator: separateValidation({
      Api: noValidation,
      UI: validateForEach(notNull('You need to upload an image')),
    }),
  },
  galaxy: {
    label: 'Galaxy',
    defaultValue: '',
    validator: notNull('You need to select a galaxy'),
  },
  systemName: {
    label: 'System Name',
    defaultValue: [],
    validator: minLength(2),
  },
  planetName: {
    label: 'Planet Name',
    defaultValue: [],
    validator: minLength(2),
  },
  coordinates: {
    label: 'Coordinates',
    defaultValue: [],
    validator: minLength(2),
  },
  buildTechniquesUsed: {
    label: 'Build techniques used',
    defaultValue: [],
    helpText:
      'Please let us know if there is a missing build technique and we will likely add your suggestion',
    validator: minItems(1),
  },
  builders: {
    label: 'Builders who worked on this build',
    defaultValue: [],
    helpText:
      'Are you unable to find a Builder? Ask the Builder to add their profile on this site, or add it yourself on the builder form.',
    validator: minItems(1),
  },
  contactDetails,
};
