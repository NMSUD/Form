import { moduleLookup } from '@api/module/moduleLookup';
import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { IApiSegment, segmentLabels } from '@constants/api';

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
        typeDescrip = {};
        if (dtoMetaObj.swaggerSchema?.ref != null) {
          typeDescrip.$ref = dtoMetaObj.swaggerSchema.ref;
        }
        if (dtoMetaObj.swaggerSchema?.type != null) {
          typeDescrip.type = dtoMetaObj.swaggerSchema.type;
        }
        if (dtoMetaObj.swaggerSchema?.format != null) {
          typeDescrip.format = dtoMetaObj.swaggerSchema.format;
        }
        const propsThatNeedItemProp = [
          dtoMetaObj.swaggerSchema?.itemsType,
          dtoMetaObj.swaggerSchema?.itemsRef,
          dtoMetaObj.swaggerSchema?.itemsFormat,
        ];
        if (propsThatNeedItemProp.filter(Boolean).length > 0) {
          typeDescrip.items = {};
        }
        if (dtoMetaObj.swaggerSchema?.itemsType != null) {
          typeDescrip.items.type = dtoMetaObj.swaggerSchema.itemsType;
        }
        if (dtoMetaObj.swaggerSchema?.itemsRef != null) {
          typeDescrip.items.$ref = dtoMetaObj.swaggerSchema.itemsRef;
        }
        if (dtoMetaObj.swaggerSchema?.itemsFormat != null) {
          typeDescrip.items.format = dtoMetaObj.swaggerSchema.itemsFormat;
        }
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
      [module.name]: {
        type: 'object',
        properties: propsObj,
        additionalProperties: false,
      },
    });
  }
};
