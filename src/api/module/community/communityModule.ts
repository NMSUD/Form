import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { CommunityDtoMeta } from '@contracts/dto/forms/meta/communityDto.meta';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { IApiModule } from '../../types/baseModule';
import { ICommunityImages, communityFileHandler } from './communityFileHandler';
import { communityDtoWithImageToPersistence, communityPersistenceToDto } from './communityMapper';
import { communityPublicUrlHandler } from './communityPublicUrlHandler';

const getDbTable = () => getDatabaseService().community();
export const communityModule: IApiModule<CommunityDto, ICommunityImages, Community> = {
  segment: 'community',
  dtoMeta: CommunityDtoMeta,
  sendDiscordMessageOnSubmission: true,
  getName: (persistence: Community) => persistence.name,
  getIcon: (persistence: Community) => persistence.profilePicUrl,

  mapDtoWithImageToPersistence: communityDtoWithImageToPersistence,
  mapPersistenceToDto: communityPersistenceToDto,

  createRecord: (persistence) => getDbTable().create(persistence),
  readRecord: (id: string) => getDbTable().read(id),
  readAllRecords: () => getDbTable().readAll(),
  updateRecord: (id, persistence) => getDbTable().update(id, persistence),

  handleFilesInFormData: communityFileHandler,
  getPublicUrlsOfUploads: communityPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
