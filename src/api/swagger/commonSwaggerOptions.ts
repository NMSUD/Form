import { OpenAPIV3_1 } from 'openapi-types';

import { moduleLookup } from '@api/module/moduleLookup';
import { IApiSegment, apiParams, segmentLabels } from '@constants/api';

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

export const componentsFromModule = (): Array<string> => {
  let components: Array<string> = [];
  for (const segment of Object.keys(segmentLabels)) {
    const module = moduleLookup[segment as keyof IApiSegment];
    components.push(module.name);
  }
  return components;
};
