import { Container, Service } from 'typedi';
import { getConfig } from '../../internal/configService';
import { getCrudOperations } from './table/baseTableOperations';
import {
  getCommunityBuilderRecordByBuilderId,
  getCommunityBuilderRecordByCommunityId,
} from './table/communityBuilderTableOperations';
import {
  Builder,
  BuilderRecord,
  Community,
  CommunityBuilder,
  CommunityBuilderRecord,
  CommunityRecord,
  PlanetBase,
  PlanetBaseBuilder,
  PlanetBaseBuilderRecord,
  PlanetBaseRecord,
  XataClient,
} from './xata';
import {
  getPlanetBaseByBuilderId,
  getPlanetBaseByPlanetBaseId,
} from './table/planetBaseBuilderTableOperations';

@Service()
export class DatabaseService {
  private _xata: XataClient;

  constructor() {
    const config = getConfig();
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
    getByBuilderId: getCommunityBuilderRecordByBuilderId(this._xata),
    getByCommunityId: getCommunityBuilderRecordByCommunityId(this._xata),
  });

  planetBase = () =>
    getCrudOperations<PlanetBase, PlanetBaseRecord>({
      logName: 'PlanetBase',
      repo: this._xata.db.planetBase,
      files: this._xata.files,
    });

  planetBaseBuilder = () => ({
    ...getCrudOperations<PlanetBaseBuilder, PlanetBaseBuilderRecord>({
      logName: 'PlanetBaseBuilder',
      repo: this._xata.db.planetBaseBuilder,
      files: this._xata.files,
    }),
    getByBuilderId: getPlanetBaseByBuilderId(this._xata),
    getByPlanetBaseId: getPlanetBaseByPlanetBaseId(this._xata),
  });
}

export const getDatabaseService = () => Container.get(DatabaseService);
