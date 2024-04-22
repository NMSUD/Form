import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { Mapper } from '@contracts/mapper';
import { getDatabaseService } from '@services/external/database/databaseService';

export const communityEnhancer: Mapper<CommunityDto, Promise<unknown>> = async (
  dto: CommunityDto,
) => {
  let numberOfBuilders: number = 0;

  const numBuildersResult = await getDatabaseService()
    .communityBuilder()
    .getNumberOfBuilders(dto.id);
  if (numBuildersResult.isSuccess === true) {
    numberOfBuilders = numBuildersResult.value;
  }

  return {
    ...dto,
    meta: {
      numberOfBuilders,
    },
  };
};
