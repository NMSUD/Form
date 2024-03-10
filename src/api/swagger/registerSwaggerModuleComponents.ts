import { moduleLookup } from '@api/module/moduleLookup';
import { ModuleLookupType } from '@api/types/handlerTypes';
import { SwaggerBuilder } from '@api/utils/swagger';
import { IApiSegment, segmentLabels } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { getArrFromEnum } from '@helpers/enumHelper';
import { capitalizeFirstLetter } from '@helpers/stringHelper';

export const registerSwaggerModuleComponents = (props: {
  swaggerBuilder: SwaggerBuilder;
  moduleLookup?: ModuleLookupType;
}) => {
  for (const segment of Object.keys(segmentLabels)) {
    const innerModuleLookup = props.moduleLookup ?? moduleLookup;
    const module = innerModuleLookup[segment as keyof IApiSegment];

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
