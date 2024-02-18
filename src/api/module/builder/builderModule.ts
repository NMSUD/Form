import { BuilderDto, BuilderDtoMeta } from '@contracts/dto/forms/builderDto';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';
import { IApiModule } from '../../types/baseModule';
import { IBuilderImages, builderFileHandler } from './builderFileHandler';
import { builderDtoWithImageToPersistence, builderPersistenceToDto } from './builderMapper';
import { BuilderPersistenceMeta } from './builderPersistenceMeta';
import { builderPublicUrlHandler } from './builderPublicUrlHandler';
import {
  builderAdditionalPropertiesToDto,
  builderCreateRelationships,
} from './builderRelationshipsHandler';

export const builderModule: IApiModule<BuilderDto, IBuilderImages, Builder> = {
  name: 'BuilderDto',
  segment: 'builder',
  dtoMeta: BuilderDtoMeta,
  persistenceMeta: BuilderPersistenceMeta,
  getName: (persistence: Builder) => persistence.name,
  getIcon: (persistence: Builder) => persistence.profilePicUrl,

  mapDtoWithImageToPersistence: builderDtoWithImageToPersistence,
  mapPersistenceToDto: builderPersistenceToDto,
  mapRecordRelationshipsToDto: builderAdditionalPropertiesToDto,

  createRecord: getDatabaseService().builder().create,
  createRecordRelationships: builderCreateRelationships,
  readRecord: getDatabaseService().builder().read,
  readAllRecords: getDatabaseService().builder().readAll,
  updateRecord: getDatabaseService().builder().update,

  handleFilesInFormData: builderFileHandler,
  getPublicUrlsOfUploads: builderPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
