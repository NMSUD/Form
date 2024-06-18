import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { platformTypeFromString, platformTypeToString } from '@contracts/dto/enum/platformType';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { formatDateForDatabase } from '@helpers/dateHelper';
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
    ...dto,
    profilePicFile: images.profilePicFile as XataFile,
    platforms: dto.platforms.map(platformTypeToString).join(','),
    startedPlaying: formatDateForDatabase(dto.startedPlaying),
    buildTechniquesUsed: makeArrayOrDefault(dto.buildTechniquesUsed)
      .filter((l) => l.length > 0)
      .join(','),
    labels: makeArrayOrDefault(dto.labels)
      .filter((l) => l.length > 0)
      .join(','),
    socials: dto.socials.filter((s) => s.length > 0).join(','),
    approvalStatus: ApprovalStatus.pending,
    discordWebhookId: '',
  };
  return persistence;
};

export const builderPersistenceToDto: Mapper<Builder, BuilderDto> = (persistence: Builder) => {
  const dto: BuilderDto = {
    ...persistence,
    profilePicFile: anyObject,
    profilePicUrl: persistence.profilePicUrl ?? '',
    platforms: persistence.platforms
      .split(',')
      .filter((p) => p.length > 0)
      .map(platformTypeFromString),
    buildTechniquesUsed: persistence.buildTechniquesUsed.split(',').filter((bt) => bt.length > 0),
    communityAffiliations: [],
    labels: persistence.labels.split(',').filter((l) => l.length > 0),
    socials: persistence.socials.split(',').filter((s) => s.length > 0),
  };
  return dto;
};
