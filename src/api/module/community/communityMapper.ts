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
    ...dto,
    profilePicFile: images.profilePicFile as XataFile,
    bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles) as Array<XataArrayFile>,
    bioMediaUrls: dto.bioMediaUrls.join(','), // this is not a generated field like the other mediaUrl fields
    tags: dto.tags.filter((t) => t.length > 0).join(','),
    socials: dto.socials.filter((s) => s.length > 0).join(','),
    approvalStatus: ApprovalStatus.pending,
  };
  return persistence;
};

export const communityPersistenceToDto: Mapper<Community, CommunityDto> = (
  persistence: Community,
) => {
  const dto: CommunityDto = {
    ...persistence,
    profilePicFile: anyObject,
    profilePicUrl: persistence.profilePicUrl ?? '',
    bioMediaUrls: persistence.bioMediaUrls.split(',').filter((u) => (u?.length ?? 0) > 0),
    bioMediaFiles: anyObject,
    tags: persistence.tags.split(',').filter((t) => t.length > 0),
    socials: persistence.socials.split(',').filter((s) => s.length > 0),
  };
  return dto;
};
