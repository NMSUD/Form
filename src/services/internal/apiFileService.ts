import { Container, Service } from 'typedi';
import { IDatabaseFile } from '../../contracts/databaseFile';

const fs = require('fs').promises;

@Service()
export class ApiFileService {

    formDataToDatabaseFile = async (formData: any): Promise<IDatabaseFile> => {
        const contents = await fs.readFile(formData.filepath, { encoding: 'base64' });
        return {
            name: formData.newFilename,
            mediaType: formData.mimetype,
            base64Content: contents,
        };
        // try {
        // } catch (err) {
        //     console.error('ApiFileService formDataToDatabaseFile', err)
        // }
    };
}

export const getApiFileService = () => Container.get(ApiFileService);