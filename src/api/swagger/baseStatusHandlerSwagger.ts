import { OpenAPIV3_1 } from 'openapi-types';

import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { replaceVariableSyntax, requiredPathParams } from './common';
import { SwaggerBuilder } from '@api/utils/swagger';

export const baseStatusHandlerSwagger = (props: {
  path: string;
  method: string;
  swaggerBuilder: SwaggerBuilder;
}) => {
  const correctedPath = replaceVariableSyntax(
    props.path,
    apiParams.general.segment,
    apiParams.verify.id,
  );
  const swaggerPath: OpenAPIV3_1.PathItemObject = {
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
  props.swaggerBuilder.addPath(swaggerPath);
};
