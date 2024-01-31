import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { CommunityDto, CommunityDtoMeta } from '@contracts/dto/forms/communityDto';
import { IFormResponse } from '@contracts/response/formResponse';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getDatabaseService } from '@services/external/database/databaseService';
import { Community } from '@services/external/database/xata';
import { getLog } from '@services/internal/logService';
import { XataArrayFile, XataFile } from '@xata.io/client';
import { baseFormHandler } from './baseForm';
import { ICommunityImages, communityFileHandler } from './community/communityFileHandler';
import { communityMessageBuilder } from './community/communityMessageBuilder';

const handleSubmission = async (
  body: CommunityDto,
  images: ICommunityImages,
): Promise<ResultWithValue<IFormResponse>> => {
  const persistence: Omit<Community, 'id'> = {
    name: body.name,
    profilePicFile: images.profilePicFile as XataFile,
    bio: body.bio,
    bioMediaFiles: makeArrayOrDefault(images.bioMediaFiles) as Array<XataArrayFile>,
    bioMediaUrls: '',
    tags: body.tags.join(','),
    socials: body.socials.join(','),
    contactDetails: body.contactDetails,
    approvalStatus: ApprovalStatus.pending,
  };
  const formResponse = await getDatabaseService().community.create(persistence);
  if (formResponse.isSuccess == false) {
    const errMsg = `handleCommunityFormSubmission - ${formResponse.errorMessage}`;
    getLog().e(errMsg);
    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: errMsg,
    };
  }

  return {
    isSuccess: true,
    value: formResponse.value,
    errorMessage: '',
  };
};

export const communityFormHandler = baseFormHandler<CommunityDto, ICommunityImages>({
  name: 'CommunityDto',
  validationObj: CommunityDtoMeta,
  handleRequest: handleSubmission,
  handleFilesInFormData: communityFileHandler,
  discordMessageBuilder: communityMessageBuilder,
  afterDiscordMessage: getDatabaseService().community.updateWebhookId,
});
