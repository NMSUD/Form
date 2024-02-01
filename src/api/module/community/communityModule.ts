import { CommunityDto, CommunityDtoMeta } from '@contracts/dto/forms/communityDto';
import { cyrb53 } from '@helpers/hashHelper';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { IApiModule } from '../baseModule';
import { ICommunityImages, communityFileHandler } from './communityFileHandler';
import { communityDtoWithImageToPersistence, communityPersistenceToDto } from './communityMapper';
import { nameof } from '@helpers/propHelper';
import { IApiSegment } from '@constants/api';
import { communityPublicUrlHandler } from './communityPublicUrlHandler';

export const communityModule: IApiModule<CommunityDto, ICommunityImages, Community> = {
  name: 'CommunityDto',
  segment: nameof<IApiSegment>('community'),
  dtoMeta: CommunityDtoMeta,
  createRecord: getDatabaseService().community().create,
  readRecord: getDatabaseService().community().read,
  updateRecord: getDatabaseService().community().update,

  mapDtoWithImageToPersistence: communityDtoWithImageToPersistence,
  mapPersistenceToDto: communityPersistenceToDto,

  handleFilesInFormData: communityFileHandler,
  getPublicUrlsOfUploads: communityPublicUrlHandler,
  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
