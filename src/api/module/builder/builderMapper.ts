import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { platformTypeFromString, platformTypeToString } from '@contracts/dto/enum/platformType';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { anyObject } from '@helpers/typescriptHacks';
import { Builder } from '@services/external/database/xata';
import { XataFile } from '@xata.io/client';
import { IBuilderImages } from './builderFileHandler';

export const builderDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<
  BuilderDto,
  IBuilderImages,
  Builder
> = (dto: BuilderDto, images: IBuilderImages) => {
  const persistence: Omit<Builder, 'id'> = {
    name: dto.name,
    profilePicFile: images.profilePicFile as XataFile,
    bio: dto.bio,
    platforms: dto.platforms.map(platformTypeToString).join(','),
    startedPlaying: dto.startedPlaying,
    buildTechniquesUsed: dto.buildTechniquesUsed.join(','),
    // communityAffiliations: dto.communityAffiliations.join(','),
    labels: dto.labels.join(','),
    socials: dto.socials.join(','),
    contactDetails: dto.contactDetails,
    approvalStatus: ApprovalStatus.pending,
    discordWebhookId: '',
  };
  return persistence;
};

export const builderPersistenceToDto: Mapper<Builder, BuilderDto> = (persistence: Builder) => {
  const dto: BuilderDto = {
    name: persistence.name,
    profilePicFile: anyObject,
    profilePicUrl: persistence.profilePicUrl ?? '',
    bio: persistence.bio,
    platforms: persistence.platforms.split(',').map(platformTypeFromString),
    startedPlaying: persistence.startedPlaying,
    buildTechniquesUsed: persistence.buildTechniquesUsed.split(','),
    communityAffiliations: [],
    // communityAffiliations: persistence.communityAffiliations.join(','),
    labels: persistence.labels.split(','),
    socials: persistence.socials.split(','),
    contactDetails: persistence.contactDetails,
  };
  return dto;
};
