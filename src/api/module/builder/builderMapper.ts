import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { platformTypeFromString, platformTypeToString } from '@contracts/dto/enum/platformType';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { formatDateForDatabase } from '@helpers/dateHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { Builder } from '@services/external/database/xata';
import { XataFile } from '@xata.io/client';
import { IBuilderImages } from './builderFileHandler';
import { makeArrayOrDefault } from '@helpers/arrayHelper';

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
    startedPlaying: formatDateForDatabase(dto.startedPlaying),
    buildTechniquesUsed: makeArrayOrDefault(dto.buildTechniquesUsed)
      .filter((l) => l.length > 0)
      .join(','),
    labels: makeArrayOrDefault(dto.labels)
      .filter((l) => l.length > 0)
      .join(','),
    socials: dto.socials.filter((s) => s.length > 0).join(','),
    contactDetails: dto.contactDetails,
    approvalStatus: ApprovalStatus.pending,
    discordWebhookId: '',
  };
  return persistence;
};

export const builderPersistenceToDto: Mapper<Builder, BuilderDto> = (persistence: Builder) => {
  const dto: BuilderDto = {
    id: persistence.id,
    name: persistence.name,
    profilePicFile: anyObject,
    profilePicUrl: persistence.profilePicUrl ?? '',
    bio: persistence.bio,
    platforms: persistence.platforms
      .split(',')
      .filter((p) => p.length > 0)
      .map(platformTypeFromString),
    startedPlaying: persistence.startedPlaying,
    buildTechniquesUsed: persistence.buildTechniquesUsed.split(',').filter((bt) => bt.length > 0),
    communityAffiliations: [],
    labels: persistence.labels.split(',').filter((l) => l.length > 0),
    socials: persistence.socials.split(',').filter((s) => s.length > 0),
    contactDetails: persistence.contactDetails,
  };
  return dto;
};
