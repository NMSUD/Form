import { CommunityDto, CommunityDtoMeta } from '@contracts/dto/forms/communityDto';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { IApiModule } from '../../types/baseModule';
import { ICommunityImages, communityFileHandler } from './communityFileHandler';
import { communityDtoWithImageToPersistence, communityPersistenceToDto } from './communityMapper';
import { CommunityPersistenceMeta } from './communityPersistenceMeta';
import { communityPublicUrlHandler } from './communityPublicUrlHandler';

export const communityModule: IApiModule<CommunityDto, ICommunityImages, Community> = {
  name: 'CommunityDto',
  segment: 'community',
  dtoMeta: CommunityDtoMeta,
  persistenceMeta: CommunityPersistenceMeta,
  getName: (persistence: Community) => persistence.name,
  getIcon: (persistence: Community) => persistence.profilePicUrl,

  createRecord: getDatabaseService().community().create,
  readRecord: getDatabaseService().community().read,
  readAllRecords: getDatabaseService().community().readAll,
  updateRecord: getDatabaseService().community().update,

  mapDtoWithImageToPersistence: communityDtoWithImageToPersistence,
  mapPersistenceToDto: communityPersistenceToDto,

  handleFilesInFormData: communityFileHandler,
  getPublicUrlsOfUploads: communityPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
