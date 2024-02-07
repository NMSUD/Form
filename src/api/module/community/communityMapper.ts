import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { Community } from '@services/external/database/xata';
import { XataArrayFile, XataFile } from '@xata.io/client';
import { ICommunityImages } from './communityFileHandler';

export const communityDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<
  CommunityDto,
  ICommunityImages,
  Community
> = (dto: CommunityDto, images: ICommunityImages) => {
  const persistence: Omit<Community, 'id'> = {
    name: dto.name,
    profilePicFile: images.profilePicFile as XataFile,
    bio: dto.bio,
    bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles) as Array<XataArrayFile>,
    bioMediaUrls: '',
    tags: dto.tags.join(','),
    socials: dto.socials.join(','),
    contactDetails: dto.contactDetails,
    approvalStatus: ApprovalStatus.pending,
  };
  return persistence;
};

export const communityPersistenceToDto: Mapper<Community, CommunityDto> = (
  persistence: Community,
) => {
  const dto: CommunityDto = {
    id: persistence.id,
    name: persistence.name,
    profilePicFile: anyObject,
    profilePicUrl: persistence.profilePicUrl ?? '',
    bio: persistence.bio,
    bioMediaUrls: persistence.bioMediaUrls.split(','),
    bioMediaFiles: anyObject,
    homeGalaxies: [], //persistence.homeGalaxies,
    tags: persistence.tags.split(','),
    socials: persistence.socials.split(','),
    contactDetails: persistence.contactDetails,
  };
  return dto;
};
