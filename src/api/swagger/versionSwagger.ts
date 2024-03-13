import { OpenAPIV3_1 } from 'openapi-types';

import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';

export const versionSwagger = (props: {
  path: string;
  method: string;
  swaggerBuilder: SwaggerBuilder;
}) => {
  const swaggerPath: OpenAPIV3_1.PathItemObject = {
    [`/${props.path}`]: {
      [props.method]: {
        tags: ['Version'],
        description: 'Gets version information of the current running API',
        responses: {
          '200': {
            description: 'Version info',
          },
        },
      },
    },
  };
  props.swaggerBuilder.addPath(swaggerPath);
};
