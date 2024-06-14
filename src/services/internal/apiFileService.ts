import fs from 'fs';
import path from 'path';
import { Container, Service } from 'typedi';

import { IDatabaseFile } from '@contracts/databaseFile';
import { IFile } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getLog } from './logService';

@Service()
export class ApiFileService {
  formDataToBuffer = async (formData: IFile): Promise<ResultWithValue<Buffer>> => {
    try {
      const contents = await fs.readFileSync(formData.filepath);
      return {
        isSuccess: true,
        errorMessage: '',
        value: contents,
      };
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: `Error occurred during file upload: ${ex?.toString?.()}`,
      };
    }
  };

  formDataToDatabaseFile = async (formData: IFile): Promise<ResultWithValue<IDatabaseFile>> => {
    try {
      const contents = await fs.readFileSync(formData.filepath, { encoding: 'base64' });
      return {
        isSuccess: true,
        errorMessage: '',
        value: {
          name: formData.newFilename,
          mediaType: formData.mimetype,
          base64Content: contents,
          enablePublicUrl: true,
        },
      };
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: `Error occurred during file upload: ${ex?.toString?.()}`,
      };
    }
  };

  downloadFileFromUrl = async (
    imageUrl: string,
    imageFolder: string,
    fileName: string,
  ): Promise<ResultWithValue<string>> => {
    try {
      if (imageUrl == null || imageUrl.length < 10) {
        throw 'File url is null';
      }

      const destFile = path.join(imageFolder, fileName);

      if (fs.existsSync(destFile) === true) {
        fs.unlinkSync(destFile);
      }

      const response = await fetch(imageUrl);
      const arrBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrBuffer);
      fs.writeFileSync(destFile, buffer);

      return {
        isSuccess: true,
        value: fileName,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `Error occurred while downloading a file from url: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: '',
        errorMessage: errMsg,
      };
    }
  };
}

export const getApiFileService = () => Container.get(ApiFileService);
