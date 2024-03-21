import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
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

const getDbTable = () => getDatabaseService().builder();
export const builderModule: IApiModule<BuilderDto, IBuilderImages, Builder> = {
  segment: 'builder',
  dtoMeta: BuilderDtoMeta,
  persistenceMeta: BuilderPersistenceMeta,
  getName: (persistence: Builder) => persistence.name,
  getIcon: (persistence: Builder) => persistence.profilePicUrl,

  mapDtoWithImageToPersistence: builderDtoWithImageToPersistence,
  mapPersistenceToDto: builderPersistenceToDto,
  mapRecordRelationshipsToDto: builderAdditionalPropertiesToDto,

  createRecord: (persistence) => getDbTable().create(persistence),
  createRecordRelationships: builderCreateRelationships,
  readRecord: (id) => getDbTable().read(id),
  readAllRecords: () => getDbTable().readAll(),
  updateRecord: (id, persistence) => getDbTable().update(id, persistence),

  handleFilesInFormData: builderFileHandler,
  getPublicUrlsOfUploads: builderPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
