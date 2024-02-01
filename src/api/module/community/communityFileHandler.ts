import { FormDataKey } from '@constants/form';
import { IDatabaseFile } from '@contracts/databaseFile';
import { IFormWithFiles } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getApiFileService } from '@services/internal/apiFileService';
import { getLog } from '@services/internal/logService';

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

  const profilePicFileFromForm = formData[FormDataKey.profilePicFile];
  const profilePicFileResult = await getApiFileService().formDataToDatabaseFile(
    profilePicFileFromForm, //
  );
  if (profilePicFileResult.isSuccess == false) {
    getLog().e('handleCommunityFormSubmission profilePicFileFromForm', profilePicFileResult.value);
    return {
      isSuccess: false,
      value: result,
      errorMessage: profilePicFileResult.errorMessage,
    };
  }
  result.profilePicFile = profilePicFileResult.value;

  const bioMediaFilesFromForm = formData[FormDataKey.bioMediaFiles];
  for (const bioMediaFileFromForm of makeArrayOrDefault(bioMediaFilesFromForm)) {
    const bioMediaDbFileResult = await getApiFileService().formDataToDatabaseFile(
      bioMediaFileFromForm, //
    );
    if (bioMediaDbFileResult.isSuccess == false) {
      getLog().e(
        'handleCommunityFormSubmission bioMediaFileFromForm',
        bioMediaDbFileResult.errorMessage,
      );
      return {
        isSuccess: false,
        value: result,
        errorMessage: profilePicFileResult.errorMessage,
      };
    }
    result.bioMediaFiles?.push(bioMediaDbFileResult.value);
  }

  return {
    isSuccess: true,
    value: result,
    errorMessage: '',
  };
};
