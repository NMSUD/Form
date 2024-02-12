import { DefaultImageRestrictions } from '@constants/image';
import { maxItems, minItems } from '@validation/arrayValidation';
import {
  multiValidation,
  noValidation,
  notNull,
  seperateValidation,
  validateForEach,
} from '@validation/baseValidation';
import { webImageRestrictions } from '@validation/imageValidation';
import { maxLength, minLength, shouldBeUrl } from '@validation/textValidation';
import { IFormDtoMeta } from './baseFormDto';

export const communityBioMaxLength = 500;
export const communityContactDetailsMaxLength = 500;

export interface CommunityDto {
  id: string;
  name: string;
  profilePicUrl: string;
  profilePicFile: File;
  bio: string;
  bioMediaUrls: Array<string>;
  bioMediaFiles: Array<File>;
  homeGalaxies: Array<string>;
  tags: Array<string>;
  socials: Array<string>;
  contactDetails: string;
}

export const CommunityDtoMeta: IFormDtoMeta<CommunityDto> = {
  id: {
    label: 'Id',
    validator: noValidation,
  },
  profilePicUrl: {
    label: 'Profile Pic Url',
    dontSaveToLocalStorage: true,
    validator: noValidation,
  },
  profilePicFile: {
    label: 'Profile picture',
    defaultValue: null,
    dontSaveToLocalStorage: true,
    validator: seperateValidation({
      api: noValidation,
      ui: multiValidation(
        notNull('You need to upload an image'),
        webImageRestrictions(DefaultImageRestrictions.profilePic),
      ),
    }),
  },
  name: {
    label: 'Name',
    defaultValue: '',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  bio: {
    label: 'Bio',
    defaultValue: '',
    validator: multiValidation(minLength(2), maxLength(communityBioMaxLength)),
  },
  bioMediaUrls: {
    label: 'Bio Media',
    defaultValue: [],
    dontSaveToLocalStorage: true,
    validator: noValidation,
  },
  bioMediaFiles: {
    label: 'Media upload',
    dontSaveToLocalStorage: true,
    validator: seperateValidation({
      api: noValidation,
      ui: validateForEach(notNull('You need to upload an image')),
    }),
  },
  homeGalaxies: {
    label: 'Home Galaxies',
    defaultValue: [],
    // displayInDiscordMessage: arrayDiscordLine,
    validator: noValidation,
  },
  tags: {
    label: 'Tags',
    defaultValue: [],
    validator: minItems(1),
  },
  socials: {
    label: 'Socials',
    defaultValue: [],
    helpText: `Add links by pressing the "ENTER" key or clicking the arrow on the right hand side. These links will be displayed as icons, if we are missing a customised icon for a link, please feel free to let us know if the feedback page!`,
    validator: multiValidation(
      minItems(1),
      maxItems(10),
      validateForEach(multiValidation(minLength(2), shouldBeUrl)),
    ),
  },
  contactDetails: {
    label: 'Contact Details (only visible to NMSUD organisers)',
    helpText: `This is so that we can get in contact with you if there are any issue with your submissions, etc.`,
    defaultValue: '',
    validator: maxLength(communityBioMaxLength),
  },
};

export const communityToDropdown = (r: CommunityDto) => ({
  title: r.name,
  value: r.id,
  image: r.profilePicUrl,
});
