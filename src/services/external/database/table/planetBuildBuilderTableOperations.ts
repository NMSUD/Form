import { getLog } from '../../../internal/logService';
import { ResultWithValue } from '@contracts/resultWithValue';
import { XataClient, PlanetBuildBuilderRecord } from '../xata';

export const getPlanetBuildByBuilderId =
  (xata: XataClient) =>
  async (builderId: string): Promise<ResultWithValue<Array<PlanetBuildBuilderRecord>>> => {
    try {
      const records = await xata.db.planetBuildBuilder
        .filter({
          'builder.id': builderId,
        })
        .select(['id', 'builder.id', 'builder.name', 'planetBuild.id', 'planetBuild.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as PlanetBuildBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getPlanetBuildByBuilderId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };

export const getPlanetBuildByPlanetBuildId =
  (xata: XataClient) =>
  async (PlanetBuildId: string): Promise<ResultWithValue<Array<PlanetBuildBuilderRecord>>> => {
    try {
      const records = await xata.db.planetBuildBuilder
        .filter({
          'planetBuild.id': PlanetBuildId,
        })
        .select(['id', 'builder.id', 'builder.name', 'planetBuild.id', 'planetBuild.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as PlanetBuildBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getPlanetBuildByPlanetBuildId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };

export const getNumberOfBuildsByBuilderId =
  (xata: XataClient) =>
  async (builderId: string): Promise<ResultWithValue<number>> => {
    try {
      const records = await xata.db.planetBuildBuilder.summarize({
        summaries: {
          numBuilds: { count: '*' },
        },
        filter: {
          'builder.id': builderId,
        },
      });
      return {
        isSuccess: true,
        value: records.summaries[0].numBuilds,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getNumberOfBuildsByBuilderId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: -1,
        errorMessage: errMsg,
      };
    }
  };
