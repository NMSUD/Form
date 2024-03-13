import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { ApiStatusErrorCode, apiParams } from '@constants/api';
import { OpenAPIV3_1 } from 'openapi-types';
import {
  commonPathParam,
  componentsFromModule,
  replaceVariableSyntax,
} from './commonSwaggerOptions';

export const baseFormHandlerSwagger = (props: {
  path: string;
  method: string;
  swaggerBuilder: SwaggerBuilder;
}) => {
  const correctedPath = replaceVariableSyntax(props.path, apiParams.general.segment);
  const componentsFromMod = componentsFromModule();
  const componentsReqAndResp = componentsFromMod.map((comp) => ({
    $ref: `#/components/schemas/${comp}`,
  }));
  const swaggerPath: OpenAPIV3_1.PathsObject = {
    [`/${correctedPath}`]: {
      [props.method]: {
        tags: ['Form'],
        description: `Handles a form submission (either ${componentsFromMod.join(', ')}) and returns the created record`,
        parameters: [commonPathParam.segment],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: componentsReqAndResp,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Form was successfully handled',
            content: {
              'application/json': {
                schema: {
                  oneOf: componentsReqAndResp,
                },
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
  props.swaggerBuilder.addPath(swaggerPath);
};
