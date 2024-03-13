import { moduleLookup } from '@api/module/moduleLookup';
import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { IApiSegment, segmentLabels } from '@constants/api';

export const registerSwaggerModuleComponents = (props: { swaggerBuilder: SwaggerBuilder }) => {
  for (const segment of Object.keys(segmentLabels)) {
    const module = moduleLookup[segment as keyof IApiSegment];

    let propsObj = {};
    for (const dtoMeta of Object.keys(module.dtoMeta)) {
      propsObj = {
        ...propsObj,
        [dtoMeta]: {
          nullable: false,
        },
      };
    }
    props.swaggerBuilder.addComponent({
      [module.name]: {
        type: 'object',
        properties: propsObj,
        additionalProperties: false,
      },
    });
  }
};
