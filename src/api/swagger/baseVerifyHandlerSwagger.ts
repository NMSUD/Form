import { ISwaggerPath, SwaggerPathMethod } from '@api/contracts/swagger';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { replaceVariableSyntax, requiredPathParams } from './common';

export const baseVerifyHandlerSwaggerPaths = (props: {
  path: string;
  method: SwaggerPathMethod;
}): ISwaggerPath => {
  const correctedPath = replaceVariableSyntax(
    props.path,
    apiParams.general.segment,
    apiParams.verify.id,
    apiParams.verify.decision,
    apiParams.verify.check,
  );
  return {
    [`/${correctedPath}`]: {
      [props.method]: {
        tags: ['Verify'],
        description:
          'Verifies (approve, deny, etc) a form submission and returns the created record',
        parameters: requiredPathParams(
          apiParams.general.segment,
          apiParams.verify.id,
          apiParams.verify.decision,
          apiParams.verify.check,
        ),
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
};
