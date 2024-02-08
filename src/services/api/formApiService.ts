import { Container, Service } from 'typedi';

import { IApiSegment, api, apiParams } from '@constants/api';
import { FormDataKey } from '@constants/form';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { IFormResponse } from '@contracts/response/formResponse';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getConfig } from '../internal/configService';
import { BaseApiService } from './baseApiService';

@Service()
export class FormApiService extends BaseApiService {
  private _apiUrl;

  constructor() {
    const apiUrl = getConfig().getNmsUdApiUrl();
    super(apiUrl);
    this._apiUrl = apiUrl;
  }

  async submit(
    segment: keyof IApiSegment,
    data: unknown,
    captcha: string,
  ): Promise<ResultWithValue<IFormResponse>> {
    let formData = new FormData();
    switch (segment) {
      case 'community':
        formData = await this.createFormFromCommunity(data as CommunityDto, captcha);
      case 'builder':
        formData = await this.createFormFromBuilder(data as BuilderDto, captcha);
    }
    return this.submitForm(segment, formData);
  }

  private async createFormFromCommunity(data: CommunityDto, captcha: string): Promise<FormData> {
    const { profilePicFile, bioMediaFiles, ...dataWithoutFiles } = data;

    let formData = new FormData();
    formData.append(FormDataKey.captcha, captcha);
    formData.append(FormDataKey.profilePicFile, profilePicFile);
    for (const bioMediaFile of makeArrayOrDefault(bioMediaFiles)) {
      formData.append(FormDataKey.bioMediaFiles, bioMediaFile);
    }
    formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

    return formData;
  }

  private async createFormFromBuilder(data: BuilderDto, captcha: string): Promise<FormData> {
    const { profilePicFile, ...dataWithoutFiles } = data;

    let formData = new FormData();
    formData.append(FormDataKey.captcha, captcha);
    formData.append(FormDataKey.profilePicFile, profilePicFile);
    formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

    return formData;
  }

  private async submitForm(
    segment: keyof IApiSegment,
    formData: FormData,
  ): Promise<ResultWithValue<IFormResponse>> {
    const urlPath = api.routes.form.replace(`:${apiParams.general.segment}`, segment);
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
