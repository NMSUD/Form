import { PlanetBuildDtoMeta } from '@contracts/dto/forms/meta/planetBuildDto.meta';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { PlanetBuild } from '@services/external/database/xata';
import { IApiModule } from '../../types/baseModule';
import { IPlanetBuildImages, planetBuildFileHandler } from './planetBuildFileHandler';
import {
  planetBuildDtoWithImageToPersistence,
  planetBuildPersistenceToDto,
} from './planetBuildMapper';
import { PlanetBuildPersistenceMeta } from './planetBuildPersistenceMeta';
import { planetBuildPublicUrlHandler } from './planetBuildPublicUrlHandler';
import {
  planetBuildAdditionalPropertiesToDto,
  planetBuildCreateRelationships,
} from './planetBuildRelationshipsHandler';

const getDbTable = () => getDatabaseService().planetBuild();
export const planetBuildModule: IApiModule<PlanetBuildDto, IPlanetBuildImages, PlanetBuild> = {
  segment: 'planetBuild',
  dtoMeta: PlanetBuildDtoMeta,
  persistenceMeta: PlanetBuildPersistenceMeta,
  sendDiscordMessageOnSubmission: true,
  getName: (persistence: PlanetBuild) => persistence.name,
  getIcon: (persistence: PlanetBuild) => persistence.mediaUrls?.[0] ?? '',

  mapDtoWithImageToPersistence: planetBuildDtoWithImageToPersistence,
  mapPersistenceToDto: planetBuildPersistenceToDto,
  mapRecordRelationshipsToDto: planetBuildAdditionalPropertiesToDto,

  createRecord: (persistence) => getDbTable().create(persistence),
  createRecordRelationships: planetBuildCreateRelationships,
  readRecord: (id: string) => getDbTable().read(id),
  readAllRecords: () => getDbTable().readAll(),
  updateRecord: (id, persistence) => getDbTable().update(id, persistence),

  handleFilesInFormData: planetBuildFileHandler,
  getPublicUrlsOfUploads: planetBuildPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.planetName, p.contactDetails].join('-')),
};
