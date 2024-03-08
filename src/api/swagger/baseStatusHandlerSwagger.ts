import { ISwaggerPath, SwaggerPathMethod } from '@api/contracts/swagger';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { replaceVariableSyntax, requiredPathParams } from './common';

export const baseStatusHandlerSwaggerPaths = (props: {
  path: string;
  method: SwaggerPathMethod;
}): ISwaggerPath => {
  const correctedPath = replaceVariableSyntax(
    props.path,
    apiParams.general.segment,
    apiParams.verify.id,
  );
  return {
    [`/${correctedPath}`]: {
      [props.method]: {
        tags: ['Status'],
        description: 'Gets the status of a form submission and returns the record',
        parameters: requiredPathParams(apiParams.general.segment, apiParams.verify.id),
        responses: {
          '200': {
            description: 'Form submission status',
          },
          [ApiStatusErrorCode.recordNotFound.code]: {
            description: ApiStatusErrorCode.recordNotFound.message,
          },
        },
      },
    },
  };
};
