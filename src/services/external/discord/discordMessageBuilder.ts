import { api, apiParams } from '@constants/api';
import { ApprovalStatus, approvalStatusToString } from '@constants/enum/approvalStatus';
import { IFormDtoMeta, IFormDtoMetaDetails } from '@contracts/dto/forms/baseFormDto';
import {
  DiscordWebhook,
  DiscordWebhookAttachment,
  DiscordWebhookEmbed,
} from '@contracts/generated/discordWebhook';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { ObjectWithPropsOfValue, anyObject } from '@helpers/typescriptHacks';
import { getConfig } from '../../internal/configService';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';

export interface IMessageBuilderProps<T, TP> {
  dbId: string;
  persistence: TP;
  segment: string;
  calculateCheck: number;
  dtoMeta: IFormDtoMeta<T>;
  includeActionsEmbed: boolean;
  approvalStatus: ApprovalStatus;
}

export const baseSubmissionMessageEmbed = (
  dbId: string,
  check: number,
  segment: string,
): DiscordWebhookEmbed => {
  const apiUrl = getConfig().getNmsUdApiUrl();
  const quickApproveUrl =
    apiUrl +
    '/' +
    api.routes.verify
      .replaceAll(`:${apiParams.verify.id}`, dbId)
      .replaceAll(`:${apiParams.verify.segment}`, segment)
      .replaceAll(`:${apiParams.verify.check}`, check.toString())
      .replaceAll(
        `:${apiParams.verify.decision}`,
        approvalStatusToString(ApprovalStatus.approvedAndProcessing),
      );
  const quickRejectUrl =
    apiUrl +
    '/' +
    api.routes.verify
      .replaceAll(`:${apiParams.verify.id}`, dbId)
      .replaceAll(`:${apiParams.verify.segment}`, segment)
      .replaceAll(`:${apiParams.verify.check}`, check.toString())
      .replaceAll(`:${apiParams.verify.decision}`, approvalStatusToString(ApprovalStatus.denied));

  return {
    fields: [
      {
        name: 'Quick action',
        value: `[❌ Reject](${quickRejectUrl})`,
        inline: true,
      },
      {
        name: 'Quick action',
        value: `[✅ Approve](${quickApproveUrl})`,
        inline: true,
      },
    ],
  };
};

export const baseSubmissionMessageBuilder = (props: {
  content: string;
  colour: number;
  descripLines: Array<string>;
  additionalEmbeds: Array<DiscordWebhookEmbed>;
}): DiscordWebhook => {
  const embeds: Array<DiscordWebhookEmbed> = [
    {
      description: props.descripLines.join('\n'),
      color: props.colour,
    },
    ...props.additionalEmbeds,
  ];
  const attachments: Array<DiscordWebhookAttachment> = [];

  return {
    content: props.content,
    embeds,
    attachments,
  };
};

export const getDescriptionLines = <T, TK>(props: {
  data: T;
  dtoMeta: IFormDtoMeta<TK>;
  additionalItemsToDisplay?: Array<string>;
}) => {
  const descripLines: Array<string> = [];

  for (const dtoMetaPropKey in props.dtoMeta) {
    if (Object.prototype.hasOwnProperty.call(props.dtoMeta, dtoMetaPropKey) == false) continue;
    const dtoMetaProp = props.dtoMeta[dtoMetaPropKey];
    if (dtoMetaProp.displayInDiscordMessage != true) continue;

    const localData =
      (props.data as ObjectWithPropsOfValue<string | Array<string>>)[dtoMetaPropKey] ?? anyObject;
    const localMeta = (props.dtoMeta as ObjectWithPropsOfValue<IFormDtoMetaDetails<string>>)[
      dtoMetaPropKey
    ] ?? { label: capitalizeFirstLetter(addSpacesForEnum(dtoMetaPropKey)) };

    if (Array.isArray(localData)) {
      descripLines.push(`${localMeta.label}:`);
      for (const dtoItem of makeArrayOrDefault(localData)) {
        descripLines.push(`- ${dtoItem}`);
      }
      continue;
    }
    descripLines.push(`${localMeta.label}: ${localData}`);
  }

  return descripLines;
};
