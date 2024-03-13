import { OpenAPIV3_1 } from 'openapi-types';

import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { commonPathParam, replaceVariableSyntax } from './commonSwaggerOptions';

export const baseVerifyHandlerSwagger = (props: {
  path: string;
  method: string;
  swaggerBuilder: SwaggerBuilder;
}) => {
  const correctedPath = replaceVariableSyntax(
    props.path,
    apiParams.general.segment,
    apiParams.verify.id,
    apiParams.verify.decision,
    apiParams.verify.check,
  );
  const swaggerPath: OpenAPIV3_1.PathItemObject = {
    [`/${correctedPath}`]: {
      [props.method]: {
        tags: ['Verify'],
        description:
          'Verifies (approve, deny, etc) a form submission and returns the created record',
        parameters: [
          commonPathParam.segment,
          commonPathParam.verifyDecision,
          commonPathParam.verifyId,
          commonPathParam.verifyCheck,
        ],
        responses: {
          '303': {
            description: 'Form was successfully verified',
          },
          [ApiStatusErrorCode.decisionNotFound.code]: {
            description: ApiStatusErrorCode.decisionNotFound.message,
          },
          [ApiStatusErrorCode.recordNotFound.code]: {
            description: ApiStatusErrorCode.recordNotFound.message,
          },
          [ApiStatusErrorCode.calculatedCheckFailed.code]: {
            description: ApiStatusErrorCode.calculatedCheckFailed.message,
          },
          [ApiStatusErrorCode.couldNotPersistData.code]: {
            description: ApiStatusErrorCode.couldNotPersistData.message,
          },
        },
      },
    },
  };
  props.swaggerBuilder.addPath(swaggerPath);
};
