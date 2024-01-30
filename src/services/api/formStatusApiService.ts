import { Container, Service } from "typedi";

import { ResultWithValue } from '../../contracts/resultWithValue';
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';

@Service()
export class FormStatusApiService extends BaseApiService {

    constructor() {
        const apiUrl = getConfig().getNmsUdApiUrl();
        super(apiUrl);
    }

    async getRecordFromApi<T>(id: string, segment: string): Promise<ResultWithValue<T>> {
        const url = `status/${segment}/${id}`;
        return this.get<T>(url);
    }
}

export const getFormStatusApiService = () => Container.get(FormStatusApiService);