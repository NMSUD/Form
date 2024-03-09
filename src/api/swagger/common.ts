import { OpenAPIV3_1 } from 'openapi-types';

export const replaceVariableSyntax = (fullPath: string, ...variables: Array<string>) => {
  let result = fullPath.toString();
  for (const variable of variables) {
    result = result.replace(`:${variable}`, `{${variable}}`);
  }
  return result;
};
export const requiredPathParams = (...variables: Array<string>) => {
  const result: Array<OpenAPIV3_1.ParameterObject> = [];
  for (const variable of variables) {
    result.push({
      name: variable,
      in: 'path',
      required: true,
      allowEmptyValue: false,
    });
  }
  return result;
};
