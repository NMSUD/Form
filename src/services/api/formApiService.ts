import { Container, Service } from 'typedi';

import { IApiSegment, api, apiParams } from '@constants/api';
import { FormDataKey } from '@constants/form';
import { FormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { BuilderDtoMeta } from '@contracts/dto/forms/meta/builderDto.meta';
import { CommunityDtoMeta } from '@contracts/dto/forms/meta/communityDto.meta';
import { PlanetBuildDtoMeta } from '@contracts/dto/forms/meta/planetBuildDto.meta';
import { PlanetBuildDto } from '@contracts/dto/forms/planetBuildDto';
import { IFormResponse } from '@contracts/response/formResponse';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { ObjectWithPropsOfValue, anyObject } from '@helpers/typescriptHacks';
import { getLog } from '@services/internal/logService';
import { getStateService } from '@services/internal/stateService';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';
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

    this.addMultiFilesToFormData([profilePicFile], (_, file: File) =>
      formData.append(FormDataKey.profilePicFile, file),
    );

    const actualBioMediaUrls = this.addMultiFilesToFormData(
      bioMediaFiles,
      (key: string, file: File) => formData.append(key, file),
    );

    const extraDtoData = { ...dataWithoutFiles, bioMediaUrls: actualBioMediaUrls };
    const mappedFromDtoMeta = this.mapFieldsFromMeta(extraDtoData, CommunityDtoMeta);
    formData.append(FormDataKey.data, this.getFormData(mappedFromDtoMeta));

    return formData;
  }

  private async createFormFromBuilder(data: BuilderDto): Promise<FormData> {
    const { profilePicFile, ...dataWithoutFiles } = data;
    const formData = new FormData();

    this.addMultiFilesToFormData([profilePicFile], (_, file: File) =>
      formData.append(FormDataKey.profilePicFile, file),
    );

    const mappedFromDtoMeta = this.mapFieldsFromMeta(dataWithoutFiles, BuilderDtoMeta);
    formData.append(FormDataKey.data, this.getFormData(mappedFromDtoMeta));

    return formData;
  }

  private async createFormFromPlanetBuild(data: PlanetBuildDto): Promise<FormData> {
    const { mediaFiles, ...dataWithoutFiles } = data;
    const formData = new FormData();

    const actualMediaUrls = this.addMultiFilesToFormData(
      mediaFiles, //
      (key: string, file: File) => formData.append(key, file),
    );

    const extraDtoData = { ...dataWithoutFiles, mediaUrls: actualMediaUrls };
    const mappedFromDtoMeta = this.mapFieldsFromMeta(extraDtoData, PlanetBuildDtoMeta);
    formData.append(FormDataKey.data, this.getFormData(mappedFromDtoMeta));

    return formData;
  }

  private getFormData<T>(data: T): string {
    return JSON.stringify({
      ...data,
      anonymousUserGuid: getStateService().getAnonymousUserGuid(),
    });
  }

  private addMultiFilesToFormData(
    files: Array<File>,
    formDataAppend: (key: string, file: File) => void,
  ): Array<string> {
    const mediaUrls: Array<string> = [];
    for (const mediaFile of makeArrayOrDefault(files as unknown as Array<IMediaUpload>)) {
      if (mediaFile.type != MediaUploadType.File) {
        mediaUrls.push(mediaFile.url);
        continue;
      }
      if (mediaFile.file != null) {
        formDataAppend(FormDataKey.bioMediaFiles, mediaFile.file);
      }
    }
    return mediaUrls;
  }

  private mapFieldsFromMeta<T>(data: T, dtoMeta: FormDtoMeta<T>): T {
    const modifiedData = { ...data };
    for (const dbMetaPropKey in dtoMeta) {
      if (Object.prototype.hasOwnProperty.call(dtoMeta, dbMetaPropKey) == false) {
        continue;
      }
      const dtoMetaProp = dtoMeta[dbMetaPropKey];

      if (dtoMetaProp.onSubmitMapping != null) {
        const valueOnDto =
          (modifiedData as unknown as ObjectWithPropsOfValue<unknown>)[dbMetaPropKey] ?? anyObject;
        (modifiedData as ObjectWithPropsOfValue<unknown>)[dbMetaPropKey] =
          dtoMetaProp.onSubmitMapping(valueOnDto);
      }
    }

    return modifiedData;
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
      if (apiResult.status != 200) {
        const errorMessage = await apiResult.text();
        getLog().e('FormApiService submitForm', errorMessage);
        return {
          isSuccess: false,
          value: anyObject,
          errorMessage: errorMessage,
        };
      }

      const resultValue: IFormResponse = await apiResult.json();
      return {
        isSuccess: true,
        value: resultValue,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = ex?.toString?.() ?? '';
      getLog().e('FormApiService submitForm', errMsg);
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: errMsg,
      };
    }
  }
}

export const getFormApiService = () => Container.get(FormApiService);
