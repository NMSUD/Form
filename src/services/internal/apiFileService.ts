import { Container, Service } from 'typedi';
import { IDatabaseFile } from '../../contracts/databaseFile';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';

const fs = require('fs').promises;

@Service()
export class ApiFileService {

    formDataToDatabaseFile = async (formData: any): Promise<ResultWithValue<IDatabaseFile>> => {
        try {
            const contents = await fs.readFile(formData.filepath, { encoding: 'base64' });
            return {
                isSuccess: true,
                errorMessage: '',
                value: {
                    name: formData.newFilename,
                    mediaType: formData.mimetype,
                    base64Content: contents,
                }
            };
        } catch (ex) {
            return {
                isSuccess: false,
                value: anyObject,
                errorMessage: `Error occurred during file upload: ${ex?.toString?.()}`,
            };
        }
    };
}

export const getApiFileService = () => Container.get(ApiFileService);