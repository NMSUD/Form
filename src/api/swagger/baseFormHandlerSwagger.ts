import { ISwaggerPath, SwaggerPathMethod } from '@api/contracts/swagger';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { replaceVariableSyntax, requiredPathParams } from './common';

export const baseFormHandlerSwaggerPaths = (props: {
  path: string;
  method: SwaggerPathMethod;
}): ISwaggerPath => {
  const correctedPath = replaceVariableSyntax(props.path, apiParams.general.segment);
  return {
    [`/${correctedPath}`]: {
      [props.method]: {
        tags: ['Form'],
        description: 'Handles a form submission and returns the created record',
        parameters: requiredPathParams(apiParams.general.segment),
        responses: {
          '200': {
            description: 'Form was successfully handled',
            content: {
              'application/json': {
                // schema: {
                //   type: 'object',
                //   items: {
                //     $ref: '#/components/schemas/pet',
                //   },
                // },
              },
            },
          },
          [ApiStatusErrorCode.badCaptcha.code]: {
            description: ApiStatusErrorCode.badCaptcha.message,
          },
          [ApiStatusErrorCode.invalidFormFiles.code]: {
            description: ApiStatusErrorCode.invalidFormFiles.message,
          },
          [ApiStatusErrorCode.invalidFormData.code]: {
            description: ApiStatusErrorCode.invalidFormData.message,
          },
          [ApiStatusErrorCode.validation.code]: {
            description: ApiStatusErrorCode.validation.message,
          },
          [ApiStatusErrorCode.couldNotPersistData.code]: {
            description: ApiStatusErrorCode.couldNotPersistData.message,
          },
        },
      },
    },
  };
};
