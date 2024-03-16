import { moduleLookup } from '@api/module/moduleLookup';
import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { IApiSegment, segmentLabels } from '@constants/api';
import { segmentToDtoName } from './commonSwaggerOptions';

export const registerSwaggerModuleComponents = (props: { swaggerBuilder: SwaggerBuilder }) => {
  for (const segment of Object.keys(segmentLabels)) {
    const module = moduleLookup[segment as keyof IApiSegment];

    let propsObj = {};
    for (const dtoMetaKey of Object.keys(module.dtoMeta)) {
      const dtoMetaObj = module.dtoMeta[dtoMetaKey];
      let typeDescrip: Record<string, any> | null = {
        type: 'string',
      };
      if (dtoMetaObj.swaggerSchema != null) {
        typeDescrip = dtoMetaObj.swaggerSchema;
      }

      propsObj = {
        ...propsObj,
        [dtoMetaKey]: {
          ...typeDescrip,
          nullable: false,
        },
      };
    }

    props.swaggerBuilder.addComponent({
      [segmentToDtoName(module.segment)]: {
        type: 'object',
        properties: propsObj,
        additionalProperties: false,
      },
    });
  }
};
