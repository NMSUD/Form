import { Container, Service } from 'typedi';

import { IApiSegment, api, apiParams } from '@constants/api';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { IFormResponse } from '@contracts/response/formResponse';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';
import { anyObject } from '@helpers/typescriptHacks';
import { FormDataKey } from '@constants/form';
import { nameof } from '@helpers/propHelper';

@Service()
export class FormApiService extends BaseApiService {
  private _apiUrl;

  constructor() {
    const apiUrl = getConfig().getNmsUdApiUrl();
    super(apiUrl);
    this._apiUrl = apiUrl;
  }

  async submitCommunity(
    data: CommunityDto,
    captcha: string,
  ): Promise<ResultWithValue<IFormResponse>> {
    const { profilePicFile, bioMediaFiles, ...dataWithoutFiles } = data;

    let formData = new FormData();
    formData.append(FormDataKey.captcha, captcha);
    formData.append(FormDataKey.profilePicFile, profilePicFile);
    for (const bioMediaFile of makeArrayOrDefault(bioMediaFiles)) {
      formData.append(FormDataKey.bioMediaFiles, bioMediaFile);
    }
    formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

    return this.submitForm(nameof<IApiSegment>('community'), formData);
  }

  async submitBuilder(data: BuilderDto, captcha: string): Promise<ResultWithValue<IFormResponse>> {
    const { profilePicFile, ...dataWithoutFiles } = data;

    let formData = new FormData();
    formData.append(FormDataKey.captcha, captcha);
    formData.append(FormDataKey.profilePicFile, profilePicFile);
    formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

    return this.submitForm(nameof<IApiSegment>('builder'), formData);
  }

  async submitForm(segment: string, formData: FormData): Promise<ResultWithValue<IFormResponse>> {
    const urlPath = api.routes.form.replace(`:${apiParams.form.segment}`, segment);
    const url = `${this._apiUrl}/${urlPath}`;
    try {
      const apiResult = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const resultValue: IFormResponse = await apiResult.json();

      return {
        isSuccess: true,
        value: resultValue,
        errorMessage: '',
      };
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }
  }
}

export const getFormApiService = () => Container.get(FormApiService);
