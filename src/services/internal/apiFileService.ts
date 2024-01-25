import { Container, Service } from 'typedi';
import { LocalStorageKey } from '../../constants/site';
import { IDatabaseFile } from '../../contracts/databaseFile';
import { ResultWithValue } from '../../contracts/resultWithValue';

@Service()
export class ApiFileService {

    formDataToDatabaseFile = (formData: unknown): IDatabaseFile => {

        return {
            name: 'file.png',
            mediaType: 'image/png',
            base64Content:
                'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNk+M9QzwAEjDAGACCDAv8cI7IoAAAAAElFTkSuQmCC'
        };
        // try {
        // } catch (err) {
        //     console.error('ApiFileService formDataToDatabaseFile', err)
        // }
    };
}

export const getApiFileService = () => Container.get(ApiFileService);