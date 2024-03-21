import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Builder } from '@services/external/database/xata';

export const builderCreateRelationships = async (
  dto: BuilderDto,
  persistence: Builder,
): Promise<Result> => {
  const itemsToCreate: Array<{ builder: string; community: string }> = [];
  for (const commAffiliations of dto.communityAffiliations) {
    itemsToCreate.push({
      builder: persistence.id,
      community: commAffiliations,
    });
  }

  try {
    await getDatabaseService().communityBuilder().table.create(itemsToCreate);
  } catch (ex) {
    return {
      isSuccess: false,
      errorMessage: ex?.toString?.() ?? 'builderCreateRelationships exception',
    };
  }

  return {
    isSuccess: true,
    errorMessage: '',
  };
};

export const builderAdditionalPropertiesToDto = async (
  id: string,
  dto: BuilderDto,
): Promise<ResultWithValue<BuilderDto>> => {
  const result = { ...dto };
  const comBuiRecordsResult = await getDatabaseService().communityBuilder().getByBuilderId(id);
  if (comBuiRecordsResult.isSuccess === false) {
    return {
      isSuccess: false,
      value: dto,
      errorMessage: comBuiRecordsResult.errorMessage,
    };
  }

  result.communityAffiliations = comBuiRecordsResult.value
    .map((cb) => cb.community?.id ?? '')
    .filter((cb) => cb.length > 0); // get all ids with length not 0

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
