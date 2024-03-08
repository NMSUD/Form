export type SwaggerPathMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export interface ISwaggerPath {
  [path: string]: ISwaggerPathItem;
}
export interface ISwaggerPathItem {
  summary?: string;
  description?: string;
  get?: ISwaggerPathOperation;
  put?: ISwaggerPathOperation;
  post?: ISwaggerPathOperation;
  delete?: ISwaggerPathOperation;
  options?: ISwaggerPathOperation;
  head?: ISwaggerPathOperation;
  patch?: ISwaggerPathOperation;
  trace?: ISwaggerPathOperation;
  parameters?: Array<ISwaggerPathParameter>;
}
export interface ISwaggerPathOperation {
  tags?: Array<string>;
  summary?: string;
  description?: string;
  externalDocs?: string;
  operationId?: string;
  parameters?: Array<ISwaggerPathParameter>;
  requestBody?: string;
  responses?: { [param: string]: ISwaggerPathResponse };
  callbacks?: string;
  deprecated?: string;
  security?: string;
  servers?: string;
}
export interface ISwaggerPathParameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
}
// export interface ISwaggerPathResponse {
//   content: Record<string, unknown>;
//   description?: string;
//   required?: boolean;
// }

export interface ISwaggerPathResponse {
  description: string;
  content?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  links?: Record<string, unknown>;
}
