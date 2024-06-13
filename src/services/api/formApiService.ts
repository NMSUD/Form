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
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';

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
    const functionMap: {
      [prop in keyof IApiSegment]: Promise<FormData>;
    } = {
      community: this.createFormFromCommunity(data as CommunityDto),
      builder: this.createFormFromBuilder(data as BuilderDto),
      planetBuild: this.createFormFromPlanetBuild(data as PlanetBuildDto),
    };
    const formData = await functionMap[segment];
    formData.append(FormDataKey.captcha, captcha);
    return this.submitForm(segment, formData);
  }

  private async createFormFromCommunity(data: CommunityDto): Promise<FormData> {
    const { profilePicFile, bioMediaFiles, ...dataWithoutFiles } = data;

    const formData = new FormData();
    formData.append(FormDataKey.profilePicFile, profilePicFile);

    const actualBioMediaUrls: Array<string> = [];
    for (const bioMediaFile of makeArrayOrDefault(bioMediaFiles)) {
      const actualBioMediaFile = bioMediaFile as unknown as IMediaUpload;
      if (actualBioMediaFile.type != MediaUploadType.File) {
        actualBioMediaUrls.push(actualBioMediaFile.url);
        continue;
      }
      if (actualBioMediaFile.file != null) {
        formData.append(FormDataKey.bioMediaFiles, actualBioMediaFile.file);
      }
    }
    formData.append(
      FormDataKey.data,
      JSON.stringify({ ...dataWithoutFiles, bioMediaUrls: actualBioMediaUrls }),
    );

    return formData;
  }

  private async createFormFromBuilder(data: BuilderDto): Promise<FormData> {
    const { profilePicFile, ...dataWithoutFiles } = data;

    const formData = new FormData();
    formData.append(FormDataKey.profilePicFile, profilePicFile);
    formData.append(FormDataKey.data, JSON.stringify(dataWithoutFiles));

    return formData;
  }

  private async createFormFromPlanetBuild(data: PlanetBuildDto): Promise<FormData> {
    const { mediaFiles, ...dataWithoutFiles } = data;

    const formData = new FormData();
    const actualMediaUrls: Array<string> = [];
    for (const bioMediaFile of makeArrayOrDefault(mediaFiles)) {
      const actualBioMediaFile = bioMediaFile as unknown as IMediaUpload;
      if (actualBioMediaFile.type != MediaUploadType.File) {
        actualMediaUrls.push(actualBioMediaFile.url);
        continue;
      }
      formData.append(FormDataKey.bioMediaFiles, bioMediaFile);
    }
    formData.append(
      FormDataKey.data,
      JSON.stringify({ ...dataWithoutFiles, bioMediaUrls: actualMediaUrls }),
    );

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
