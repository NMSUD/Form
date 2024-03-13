import { SwaggerBuilder } from '@api/swagger/swaggerBuilder';
import { segmentLabels } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { getArrFromEnum } from '@helpers/enumHelper';
import { capitalizeFirstLetter } from '@helpers/stringHelper';

export const registerSwaggerStaticComponents = (swaggerBuilder: SwaggerBuilder) => {
  swaggerBuilder.addComponent({
    segment: {
      type: 'string',
      enum: Object.keys(segmentLabels),
      additionalProperties: false,
    },
  });
  swaggerBuilder.addComponent({
    ApprovalStatus: {
      type: 'string',
      enum: getArrFromEnum(ApprovalStatus).map(capitalizeFirstLetter),
      additionalProperties: false,
    },
  });
};
