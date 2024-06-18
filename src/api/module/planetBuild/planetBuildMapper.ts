import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { PlanetBuild } from '@services/external/database/xata';
import { XataArrayFile } from '@xata.io/client';
import { IPlanetBuildImages } from './planetBuildFileHandler';

export const planetBuildDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<
  PlanetBuildDto,
  IPlanetBuildImages,
  PlanetBuild
> = (dto: PlanetBuildDto, images: IPlanetBuildImages) => {
  const persistence: Omit<PlanetBuild, 'id'> = {
    ...dto,
    mediaFiles: makeArrayOrDefault(images.mediaFiles) as Array<XataArrayFile>,
    mediaUrls: '',
    buildTechniquesUsed: makeArrayOrDefault(dto.buildTechniquesUsed)
      .filter((l) => l.length > 0)
      .join(','),
    approvalStatus: ApprovalStatus.pending,
    discordWebhookId: '',
  };
  return persistence;
};

export const planetBuildPersistenceToDto: Mapper<PlanetBuild, PlanetBuildDto> = (
  persistence: PlanetBuild,
) => {
  const dto: PlanetBuildDto = {
    ...persistence,
    mediaUrls: persistence.mediaUrls.split(',').filter((l) => l.length > 0),
    mediaFiles: anyObject,
    buildTechniquesUsed: persistence.buildTechniquesUsed.split(',').filter((l) => l.length > 0),
    builders: [],
  };
  return dto;
};
