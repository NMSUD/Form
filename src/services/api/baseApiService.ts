import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { getLog } from '@services/internal/logService';

export class BaseApiService {
  private _baseUrl: string = 'https://api.assistantapps.com';
  constructor(newBaseUrl: string) {
    this._baseUrl = newBaseUrl;
  }

  protected async get<T>(
    url: string,
    manipulateHeaders?: () => { [prop: string]: string },
    manipulateResponse?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, options);

      if (manipulateResponse != null) {
        return manipulateResponse(result);
      }
    } catch (ex) {
      getLog().i('BaseApiService get', ex?.toString?.());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async post<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => { [prop: string]: string },
    customMapper?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex) {
      getLog().i('BaseApiService post', ex?.toString?.());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async put<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => { [prop: string]: string },
    customMapper?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex) {
      getLog().i('BaseApiService put', ex?.toString?.());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      getLog().i('BaseApiService post', ex?.toString?.());
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async delete(
    url: string,
    manipulateHeaders?: () => { [prop: string]: string },
  ): Promise<Result> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'DELETE',
      });
    } catch (ex) {
      getLog().i('BaseApiService delete', ex?.toString?.());
      return {
        isSuccess: false,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      getLog().i('BaseApiService post', ex?.toString?.());
      return {
        isSuccess: false,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      errorMessage: '',
    };
  }
}
