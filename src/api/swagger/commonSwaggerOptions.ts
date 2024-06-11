import { OpenAPIV3_1 } from 'openapi-types';

import { moduleLookup } from '@api/module/moduleLookup';
import { IApiSegment, apiParams, segmentLabels } from '@constants/api';
import { getArrFromEnum } from '@helpers/enumHelper';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { capitalizeFirstLetter } from '@helpers/stringHelper';
import { SwaggerBuilder } from './swaggerBuilder';

export const replaceVariableSyntax = (fullPath: string, ...variables: Array<string>) => {
  let result = fullPath.toString();
  for (const variable of variables) {
    result = result.replace(`:${variable}`, `{${variable}}`);
  }
  return result;
};

export const requiredPathParam = (
  variable: string,
  descrip?: string,
): OpenAPIV3_1.ParameterObject => {
  return {
    name: variable,
    in: 'path',
    description: descrip,
    required: true,
    allowEmptyValue: false,
  };
};

export const commonPathParam = {
  segment: {
    ...requiredPathParam(apiParams.general.segment, 'Segment to store the form submission into'),
    schema: {
      $ref: '#/components/schemas/segment',
    },
  },
  verifyId: requiredPathParam(
    apiParams.verify.id,
    'Id of the record (e.g. rec_cn549q2beinr95oc7vdg)',
  ),
  verifyDecision: {
    ...requiredPathParam(apiParams.verify.decision, 'Decision for a submitted form'),
    schema: {
      $ref: '#/components/schemas/ApprovalStatus',
    },
  },
  verifyCheck: requiredPathParam(
    apiParams.verify.check,
    `The calculated check value of the record. This is to prevent race conditions, only allowing 1 change at a time`,
  ),
};

export const segmentComponent: Record<string, OpenAPIV3_1.SchemaObject> = {
  segment: {
    type: 'string',
    enum: Object.keys(segmentLabels),
    additionalProperties: false,
  },
};
export const approvalStatusComponent: Record<string, OpenAPIV3_1.SchemaObject> = {
  ApprovalStatus: {
    type: 'string',
    enum: getArrFromEnum(ApprovalStatus).map(capitalizeFirstLetter),
    additionalProperties: false,
  },
};
export const formWithApprovalResponseComponent: Record<string, OpenAPIV3_1.SchemaObject> = {
  IFormWithApprovalResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      iconUrl: {
        type: 'string',
      },
      approvalStatus: {
        $ref: '#/components/schemas/ApprovalStatus',
      },
    },
    additionalProperties: false,
  },
};
export const mediaUploadComponent: Record<string, OpenAPIV3_1.SchemaObject> = {
  IMediaUpload: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
      },
      url: {
        type: 'string',
      },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    additionalProperties: false,
  },
};

export const segmentToDtoName = (segment: string) => capitalizeFirstLetter(segment) + 'Dto';

export const registerSwaggerStaticComponents = (swaggerBuilder: SwaggerBuilder) => {
  swaggerBuilder.addComponent(segmentComponent);
  swaggerBuilder.addComponent(approvalStatusComponent);
  swaggerBuilder.addComponent(formWithApprovalResponseComponent);
  swaggerBuilder.addComponent(mediaUploadComponent);
};

export const componentsFromModule = (): Array<string> => {
  let components: Array<string> = [];
  for (const segment of Object.keys(segmentLabels)) {
    const module = moduleLookup[segment as keyof IApiSegment];
    components.push(segmentToDtoName(module.segment));
  }
  return components;
};
