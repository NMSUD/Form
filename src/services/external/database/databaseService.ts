import { Container, Inject, Service } from 'typedi';
import { ConfigService } from '../../internal/configService';
import { getCrudOperations } from './table/baseTableOperations';
import { getByBuilderId, getByCommunityId } from './table/communityBuilderTableOperations';
import {
  Builder,
  BuilderRecord,
  Community,
  CommunityBuilder,
  CommunityBuilderRecord,
  CommunityRecord,
  XataClient,
} from './xata';

@Service()
export class DatabaseService {
  private _xata: XataClient;

  constructor(@Inject() config: ConfigService) {
    this._xata = new XataClient({
      apiKey: config.getXataApiKey(),
      databaseURL: config.getXataDbUrl(),
      branch: config.getXataFallbackBranch(),
    });
  }

  community = () =>
    getCrudOperations<Community, CommunityRecord>({
      logName: 'Community',
      repo: this._xata.db.community,
      files: this._xata.files,
    });

  builder = () =>
    getCrudOperations<Builder, BuilderRecord>({
      logName: 'Builder',
      repo: this._xata.db.builder,
      files: this._xata.files,
    });

  communityBuilder = () => ({
    ...getCrudOperations<CommunityBuilder, CommunityBuilderRecord>({
      logName: 'CommunityBuilder',
      repo: this._xata.db.communityBuilder,
      files: this._xata.files,
    }),
    getByBuilderId: getByBuilderId(this._xata),
    getByCommunityId: getByCommunityId(this._xata),
  });
}

export const getDatabaseService = () => Container.get(DatabaseService);
