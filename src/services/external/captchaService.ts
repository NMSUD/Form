///<reference types="@hcaptcha/types"/>
import { hCaptchaLoader } from '@hcaptcha/loader';
import Container, { Inject, Service } from 'typedi';
import { verify } from 'hcaptcha';

import { ConfigService, getConfig } from '../internal/configService';
import { Result, ResultWithValue } from '../../contracts/resultWithValue';
import { getLog } from '../internal/logService';

@Service()
export class CaptchaService {
    private _config: ConfigService;
    private _hcaptcha: HCaptcha;

    constructor() {
        this._config = getConfig();
    }

    async loadUI(elem: any) {
        this._hcaptcha = await hCaptchaLoader({
            loadAsync: true,
            sentry: false,
            cleanup: true,
        });

        const widgetId = this._hcaptcha.render(elem, {
            sitekey: this._config.getHCaptchaSiteKey(),
            theme: 'dark',
            size: 'invisible',
        });
        getLog().i(`Captcha id: ${widgetId}`);
    }

    async promptUser(): Promise<ResultWithValue<string>> {
        try {
            const response = await this._hcaptcha.execute({ async: true });
            if (response == null) {
                return {
                    isSuccess: false,
                    value: '',
                    errorMessage: 'Failed to get a captcha token',
                }
            }

            return {
                isSuccess: true,
                value: response.response,
                errorMessage: '',
            }
        }
        catch (ex) {
            getLog().e(ex);
            return {
                isSuccess: false,
                value: '',
                errorMessage: ex?.toString?.() ?? 'exception occurred during captcha test',
            }
        }
    }

    async verifyToken(token: string): Promise<Result> {
        const response = await verify(this._config.getHCaptchaSecret(), token);
        if (response == null || response.success === false) {
            return {
                isSuccess: false,
                errorMessage: 'Failed to verify captcha token',
            }
        }

        return {
            isSuccess: true,
            errorMessage: '',
        }
    }
}

export const getCaptchaService = () => Container.get(CaptchaService);


