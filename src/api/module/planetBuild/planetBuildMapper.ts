import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { platformTypeFromString, platformTypeToString } from '@contracts/dto/enum/platformType';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { formatDateForDatabase } from '@helpers/dateHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { Builder, PlanetBuild } from '@services/external/database/xata';
import { XataArrayFile, XataFile } from '@xata.io/client';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { IPlanetBuildImages } from './planetBuildFileHandler';

export const planetBuildDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<
  PlanetBuildDto,
  IPlanetBuildImages,
  PlanetBuild
> = (dto: PlanetBuildDto, images: IPlanetBuildImages) => {
  const persistence: Omit<PlanetBuild, 'id'> = {
    name: dto.name,
    mediaFiles: makeArrayOrDefault(images.mediaFiles) as Array<XataArrayFile>,
    mediaUrls: '',
    galaxy: dto.galaxy,
    systemName: dto.systemName,
    planetName: dto.planetName,
    coordinates: dto.coordinates,
    buildTechniquesUsed: makeArrayOrDefault(dto.buildTechniquesUsed)
      .filter((l) => l.length > 0)
      .join(','),
    contactDetails: dto.contactDetails,
    approvalStatus: ApprovalStatus.pending,
    discordWebhookId: '',
  };
  return persistence;
};

export const planetBuildPersistenceToDto: Mapper<PlanetBuild, PlanetBuildDto> = (
  persistence: PlanetBuild,
) => {
  const dto: PlanetBuildDto = {
    id: persistence.id,
    name: persistence.name,
    mediaUrls: persistence.mediaUrls.split(',').filter((l) => l.length > 0),
    mediaFiles: anyObject,
    galaxy: persistence.galaxy,
    systemName: persistence.systemName,
    planetName: persistence.planetName,
    coordinates: persistence.coordinates,
    buildTechniquesUsed: persistence.buildTechniquesUsed.split(',').filter((l) => l.length > 0),
    builders: [],
    contactDetails: persistence.contactDetails,
  };
  return dto;
};
