import { handleImageFromFormData } from '@api/facade/handleImageFromFormData';
import { FormDataKey } from '@constants/form';
import { BioMediaImageSize, DefaultImageRestrictions, DefaultImageSize } from '@constants/image';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';

export interface ICommunityImages {
  profilePicFile?: IDatabaseFile;
  bioMediaFiles?: Array<IDatabaseFile>;
}

export const communityFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<ICommunityImages>> => {
  const result: ICommunityImages = {
    bioMediaFiles: [],
  };

  const profilePicResult = await handleImageFromFormData({
    fileFromForm: formData[FormDataKey.profilePicFile],
    restrictions: DefaultImageRestrictions.profilePic,
    fileName: 'profilePic',
    handlerName: 'communityFileHandler',
    ...DefaultImageSize,
  });
  if (profilePicResult.isSuccess == false) {
    return { ...profilePicResult, value: result };
  }
  result.profilePicFile = profilePicResult.value;

  // ---

  const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
  if (result.bioMediaFiles == null) result.bioMediaFiles = [];
  for (const bioMediaFileFromForm of makeArrayOrDefault(bioMediaFilesFromForm)) {
    const bioMediaFileResult = await handleImageFromFormData({
      fileFromForm: bioMediaFileFromForm,
      restrictions: DefaultImageRestrictions.bioMediaPic,
      fileName: 'bioMediaPic',
      handlerName: 'communityFileHandler',
      ...BioMediaImageSize,
    });
    if (bioMediaFileResult.isSuccess == false) {
      continue;
    }
    result.bioMediaFiles.push(bioMediaFileResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
