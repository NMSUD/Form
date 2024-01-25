import { Container, Service } from "typedi";

import { api } from '../../constants/api';
import { BuilderDto } from '../../contracts/dto/forms/builderDto';
import { CommunityDto } from '../../contracts/dto/forms/communityDto';
import { IFormResponse } from "../../contracts/response/formResponse";
import { ResultWithValue } from '../../contracts/resultWithValue';
import { makeArrayOrDefault } from "../../helper/arrayHelper";
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';
import { anyObject } from "../../helper/typescriptHacks";
import { FormDataKey } from "../../constants/form";

@Service()
export class FormApiService extends BaseApiService {
    private _apiUrl;

    constructor() {
        const apiUrl = getConfig().getNmsUdApiUrl();
        super(apiUrl);
        this._apiUrl = apiUrl;
    }

    private _getCommonHeaders = (captcha: string) => ({
        // 'Accept': 'application/json',
        [api.captcha.header]: captcha,
    });

    async submitCommunity(data: CommunityDto, captcha: string): Promise<ResultWithValue<IFormResponse>> {
        const {
            profilePicFile,
            bioMediaFiles,
            ...dataWithoutFiles
        } = data;

        let formData = new FormData();
        formData.append(FormDataKey.captcha, captcha);
        formData.append(FormDataKey.profilePicFile, profilePicFile);
        for (const bioMediaFile of makeArrayOrDefault(bioMediaFiles)) {
            formData.append(FormDataKey.bioMediaFiles, bioMediaFile);
        }
        formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

        const url = `${this._apiUrl}/${api.routes.form.community}`;
        try {
            const apiResult = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const resultValue: IFormResponse = await apiResult.json();

            return {
                isSuccess: true,
                value: resultValue,
                errorMessage: ''
            }
        } catch (ex: any) {
            return {
                isSuccess: false,
                value: anyObject,
                errorMessage: ex?.toString?.(),
            }
        }
    }

    submitBuilder(body: BuilderDto, captcha: string): Promise<ResultWithValue<string>> {
        return this.post<string, any>(
            api.routes.form.builder,
            body,
            () => this._getCommonHeaders(captcha),
        );
    }

    // submitBaseBuild(body: CommunityDto, captcha: string): Promise<ResultWithValue<CommunityDto>> {
    //     return this.post<any, CommunityDto>(
    //         api.routes.form.community,
    //         body,
    //         this._addCaptchaToHeader(captcha),
    //     );
    // }
}

export const getFormApiService = () => Container.get(FormApiService);