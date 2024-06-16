///<reference types="@hcaptcha/types"/>
import { Container, Service } from 'typedi';

import { ICaptchaResponse } from '@api/contracts/hcaptcha';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { addScriptToHead } from '@helpers/documentHelper';
import { ConfigService, getConfig } from '../internal/configService';
import { getLog } from '../internal/logService';

@Service()
export class CaptchaService {
  private _config: ConfigService;

  constructor() {
    this._config = getConfig();
  }

  async loadUI(elem: HTMLElement) {
    addScriptToHead({
      id: 'hcaptcha',
      url: 'https://js.hcaptcha.com/1/api.js',
      async: true,
      defer: true,
    });
    elem.dataset.sitekey = this._config.getHCaptchaSiteKey();
    elem.dataset.theme = 'dark';
    elem.dataset.size = 'invisible';
  }

  async promptUser(): Promise<ResultWithValue<string>> {
    try {
      const response = await window.hcaptcha.execute({ async: true });
      if (response == null) {
        return {
          isSuccess: false,
          value: '',
          errorMessage: 'Failed to get a captcha token',
        };
      }

      return {
        isSuccess: true,
        value: (response as HCaptchaResponse)?.response ?? '',
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `Failed to prompt for captcha: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: '',
        errorMessage: ex?.toString?.() ?? 'exception occurred during captcha test',
      };
    }
  }

  async verifyToken(token: string): Promise<Result> {
    let formData = new FormData();
    formData.append('response', token);
    formData.append('secret', this._config.getHCaptchaSecret());
    getLog().i('verify captcha token');

    try {
      const apiResult = await fetch('https://api.hcaptcha.com/siteverify', {
        method: 'POST',
        body: formData,
      });

      const response: ICaptchaResponse = await apiResult.json();
      if (response == null || response.success === false) {
        return {
          isSuccess: false,
          errorMessage: 'Failed to verify captcha token',
        };
      }

      return {
        isSuccess: true,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `Failed to verify captcha token: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
      };
    }
  }
}

export const getCaptchaService = () => Container.get(CaptchaService);
