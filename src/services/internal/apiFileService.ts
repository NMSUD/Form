import fs from 'fs';
import path from 'path';
import { XataFile } from '@xata.io/client';
import { Container, Service } from 'typedi';

import { IDatabaseFile } from '@contracts/databaseFile';
import { IFile } from '@contracts/file';
import { ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getLog } from './logService';

@Service()
export class ApiFileService {
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

  downloadXataFile = async (
    xataFile: XataFile,
    recordId: string,
    imageFolder: string,
    imgSuffix: string,
  ): Promise<ResultWithValue<string>> => {
    try {
      const imageUrl = xataFile.url;
      if (imageUrl == null) {
        throw 'File url is null';
      }
      if (recordId == null) {
        throw 'Record Id is null';
      }

      const fileName = `${recordId}_${imgSuffix}.png`;
      const localFile = path.join(imageFolder, fileName);

      if (fs.existsSync(localFile) === true) {
        fs.unlinkSync(localFile);
      }

      const response = await fetch(imageUrl);
      const arrBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrBuffer);
      fs.writeFileSync(localFile, buffer);

      getLog().i(`\tDownloaded ${fileName}`);

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
