import { Container, Service } from "typedi";

import { api } from '../../constants/api';
import { BuilderDto } from '../../contracts/dto/forms/builderDto';
import { CommunityDto } from '../../contracts/dto/forms/communityDto';
import { Result } from '../../contracts/resultWithValue';
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';

@Service()
export class FormApiService extends BaseApiService {
    constructor() {
        const apiUrl: string = getConfig().getNmsUdApiUrl();
        super(apiUrl);
    }

    private _addCaptchaToHeader = (captcha: string) => () => ({
        headers: {
            [api.captcha.header]: captcha,
        }
    });

    submitCommunity(body: CommunityDto, captcha: string): Promise<Result> {
        return this.post<any, CommunityDto>(
            api.routes.form.community,
            body,
            this._addCaptchaToHeader(captcha),
        );
    }

    submitBuilder(body: BuilderDto, captcha: string): Promise<Result> {
        return this.post<any, BuilderDto>(
            api.routes.form.builder,
            body,
            this._addCaptchaToHeader(captcha),
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