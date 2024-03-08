import { ISwaggerPathParameter } from '@api/contracts/swagger';

export const replaceVariableSyntax = (fullPath: string, ...variables: Array<string>) => {
  let result = fullPath.toString();
  for (const variable of variables) {
    result = result.replace(`:${variable}`, `{${variable}}`);
  }
  return result;
};
export const requiredPathParams = (...variables: Array<string>) => {
  const result: Array<ISwaggerPathParameter> = [];
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
