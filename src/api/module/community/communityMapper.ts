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
    bioMediaUrls: dto.bioMediaUrls.join(','), // this is not a generated field like the other mediaUrl fields
    homeGalaxy: dto.homeGalaxy,
    coordinates: dto.coordinates,
    tags: dto.tags.filter((t) => t.length > 0).join(','),
    socials: dto.socials.filter((s) => s.length > 0).join(','),
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
    bioMediaUrls: persistence.bioMediaUrls.split(',').filter((u) => (u?.length ?? 0) > 0),
    bioMediaFiles: anyObject,
    homeGalaxy: persistence.homeGalaxy,
    coordinates: persistence.coordinates,
    tags: persistence.tags.split(',').filter((t) => t.length > 0),
    socials: persistence.socials.split(',').filter((s) => s.length > 0),
    contactDetails: persistence.contactDetails,
  };
  return dto;
};
