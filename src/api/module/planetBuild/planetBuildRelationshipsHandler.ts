import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { getDatabaseService } from '@services/external/database/databaseService';
import { PlanetBuild } from '@services/external/database/xata';

export const planetBuildCreateRelationships = async (
  dto: PlanetBuildDto,
  persistence: PlanetBuild,
): Promise<Result> => {
  const itemsToCreate: Array<{ planetBuild: string; builder: string }> = [];
  for (const builder of dto.builders) {
    itemsToCreate.push({
      planetBuild: persistence.id,
      builder: builder,
    });
  }

  try {
    await getDatabaseService().planetBuildBuilder().table.create(itemsToCreate);
  } catch (ex) {
    return {
      isSuccess: false,
      errorMessage: ex?.toString?.() ?? 'planetBuildCreateRelationships exception',
    };
  }

  return {
    isSuccess: true,
    errorMessage: '',
  };
};

export const planetBuildAdditionalPropertiesToDto = async (
  id: string,
  dto: PlanetBuildDto,
): Promise<ResultWithValue<PlanetBuildDto>> => {
  const result = { ...dto };
  const joinTableRecordsResult = await getDatabaseService() //
    .planetBuildBuilder()
    .getByBuilderId(id);
  if (joinTableRecordsResult.isSuccess === false) {
    return {
      isSuccess: false,
      value: dto,
      errorMessage: joinTableRecordsResult.errorMessage,
    };
  }

  result.builders = joinTableRecordsResult.value
    .map((cb) => cb.builder?.id ?? '')
    .filter((cb) => cb.length > 0); // get all ids with length not 0

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
