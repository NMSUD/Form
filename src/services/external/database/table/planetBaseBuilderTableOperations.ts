import { getLog } from '../../../internal/logService';
import { ResultWithValue } from '@contracts/resultWithValue';
import { XataClient, PlanetBaseBuilderRecord } from '../xata';

export const getPlanetBaseByBuilderId =
  (xata: XataClient) =>
  async (builderId: string): Promise<ResultWithValue<Array<PlanetBaseBuilderRecord>>> => {
    try {
      const records = await xata.db.planetBaseBuilder
        .filter({
          'builder.id': builderId,
        })
        .select(['id', 'builder.id', 'builder.name', 'planetBase.id', 'planetBase.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as PlanetBaseBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getPlanetBaseByBuilderId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };

export const getPlanetBaseByPlanetBaseId =
  (xata: XataClient) =>
  async (PlanetBaseId: string): Promise<ResultWithValue<Array<PlanetBaseBuilderRecord>>> => {
    try {
      const records = await xata.db.planetBaseBuilder
        .filter({
          'planetBase.id': PlanetBaseId,
        })
        .select(['id', 'builder.id', 'builder.name', 'planetBase.id', 'planetBase.name'])
        .getAll();
      return {
        isSuccess: true,
        value: records.map((r) => r as unknown as PlanetBaseBuilderRecord),
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `getPlanetBaseByPlanetBaseId: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: [],
        errorMessage: errMsg,
      };
    }
  };
