import { Container, Service } from 'typedi';
import { getConfig } from '../../internal/configService';
import { getCrudOperations } from './table/baseTableOperations';
import {
  getCommunityBuilderRecordByBuilderId,
  getCommunityBuilderRecordByCommunityId,
  getNumberOfBuildersByCommunityId,
} from './table/communityBuilderTableOperations';
import {
  getNumberOfBuildsByBuilderId,
  getPlanetBuildByBuilderId,
  getPlanetBuildByPlanetBuildId,
} from './table/planetBuildBuilderTableOperations';
import {
  Builder,
  BuilderRecord,
  Community,
  CommunityBuilder,
  CommunityBuilderRecord,
  CommunityRecord,
  PlanetBuild,
  PlanetBuildBuilder,
  PlanetBuildBuilderRecord,
  PlanetBuildRecord,
  XataClient,
} from './xata';

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
    getNumberOfBuilders: getNumberOfBuildersByCommunityId(this._xata),
  });

  planetBuild = () =>
    getCrudOperations<PlanetBuild, PlanetBuildRecord>({
      logName: 'PlanetBuild',
      repo: this._xata.db.planetBuild,
      files: this._xata.files,
    });

  planetBuildBuilder = () => ({
    ...getCrudOperations<PlanetBuildBuilder, PlanetBuildBuilderRecord>({
      logName: 'PlanetBuildBuilder',
      repo: this._xata.db.planetBuildBuilder,
      files: this._xata.files,
    }),
    getByBuilderId: getPlanetBuildByBuilderId(this._xata),
    getByPlanetBuildId: getPlanetBuildByPlanetBuildId(this._xata),
    getNumberOfBuilds: getNumberOfBuildsByBuilderId(this._xata),
  });
}

export const getDatabaseService = () => Container.get(DatabaseService);
