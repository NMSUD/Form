import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { Mapper } from '@contracts/mapper';
import { getDatabaseService } from '@services/external/database/databaseService';

export const builderEnhancer: Mapper<BuilderDto, Promise<unknown>> = async (dto: BuilderDto) => {
  const { id, communityAffiliations, ...other } = dto;
  let communityAffiliationsEnhanced: Array<unknown> = [];
  let numberOfBuilds: number = 0;

  const communitiesResult = await getDatabaseService().communityBuilder().getByBuilderId(dto.id);
  if (communitiesResult.isSuccess === true) {
    communityAffiliationsEnhanced = communitiesResult.value.map((comm) => ({
      id: comm.community?.id,
      name: comm.community?.name,
      profilePicUrl: comm.community?.profilePicUrl,
    }));
  }

  const numBuildsResult = await getDatabaseService().planetBuildBuilder().getNumberOfBuilds(dto.id);
  if (numBuildsResult.isSuccess === true) {
    numberOfBuilds = numBuildsResult.value;
  }

  return {
    id,
    ...other,
    communityAffiliations: communityAffiliationsEnhanced,
    meta: {
      numberOfBuilds,
    },
  };
};
