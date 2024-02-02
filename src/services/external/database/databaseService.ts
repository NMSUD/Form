import { Container, Inject, Service } from 'typedi';
import { ConfigService } from '../../internal/configService';
import { getCrudOperations } from './table/baseTableOperations';
import { Builder, BuilderRecord, Community, CommunityRecord, XataClient } from './xata';

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
}

export const getDatabaseService = () => Container.get(DatabaseService);
