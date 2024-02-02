import { BuilderDto, BuilderDtoMeta } from '@contracts/dto/forms/builderDto';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';
import { IApiModule } from '../baseModule';
import { IBuilderImages, builderFileHandler } from './builderFileHandler';
import { builderDtoWithImageToPersistence, builderPersistenceToDto } from './builderMapper';

export const builderModule: IApiModule<BuilderDto, IBuilderImages, Builder> = {
  name: 'BuilderDto',
  segment: 'builder',
  dtoMeta: BuilderDtoMeta,
  getName: (persistence: Builder) => persistence.name,
  getIcon: (persistence: Builder) => persistence.profilePicUrl,

  createRecord: getDatabaseService().builder().create,
  readRecord: getDatabaseService().builder().read,
  readAllRecords: getDatabaseService().builder().readAll,
  updateRecord: getDatabaseService().builder().update,

  mapDtoWithImageToPersistence: builderDtoWithImageToPersistence,
  mapPersistenceToDto: builderPersistenceToDto,

  handleFilesInFormData: builderFileHandler,
  getPublicUrlsOfUploads: (p) => p,
  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
