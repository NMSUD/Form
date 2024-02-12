import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { Mapper } from '@contracts/mapper';
import { getDatabaseService } from '@services/external/database/databaseService';

export const builderEnhancer: Mapper<BuilderDto, Promise<unknown>> = async (dto: BuilderDto) => {
  const { id, communityAffiliations, ...other } = dto;
  let communityAffiliationsEnhanced: Array<unknown> = [];

  const communitiesResult = await getDatabaseService().communityBuilder().getByBuilderId(dto.id);
  if (communitiesResult.isSuccess === true) {
    console.log(communitiesResult.value);
    communityAffiliationsEnhanced = communitiesResult.value.map((comm) => ({
      id: comm.community?.id,
      name: comm.community?.name,
    }));
  }

  return {
    id,
    communityAffiliations: communityAffiliationsEnhanced,
    ...other,
  };
};
