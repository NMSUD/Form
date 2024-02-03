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
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { getConfig } from '@services/internal/configService';

export interface IMessageBuilderProps<T, TP> {
  dbId: string;
  persistence: TP;
  segment: string;
  calculateCheck: number;
  dtoMeta: IFormDtoMeta<T>;
  includeActionsEmbed: boolean;
  approvalStatus: ApprovalStatus;
}

export const discordActionLink = {
  heading: 'Quick action',
  reject: '❌ Reject',
  accept: '✅ Approve',
  defaultAuthorName: 'NMSUD form Submission',
};

export const baseSubmissionMessageEmbed = (
  dbId: string,
  check: number,
  segment: string,
): DiscordWebhookEmbed => {
  const apiUrl = getConfig().getNmsUdApiUrl();

  const quickRejectUrl =
    apiUrl +
    '/' +
    api.routes.verify
      .replaceAll(`:${apiParams.verify.id}`, dbId)
      .replaceAll(`:${apiParams.general.segment}`, segment)
      .replaceAll(`:${apiParams.verify.check}`, check.toString())
      .replaceAll(`:${apiParams.verify.decision}`, approvalStatusToString(ApprovalStatus.denied));

  const quickApproveUrl =
    apiUrl +
    '/' +
    api.routes.verify
      .replaceAll(`:${apiParams.verify.id}`, dbId)
      .replaceAll(`:${apiParams.general.segment}`, segment)
      .replaceAll(`:${apiParams.verify.check}`, check.toString())
      .replaceAll(`:${apiParams.verify.decision}`, approvalStatusToString(ApprovalStatus.approved));

  return {
    fields: [
      {
        name: discordActionLink.heading,
        value: `[${discordActionLink.reject}](${quickRejectUrl})`,
        inline: true,
      },
      {
        name: discordActionLink.heading,
        value: `[${discordActionLink.accept}](${quickApproveUrl})`,
        inline: true,
      },
    ],
  };
};

export const baseSubmissionMessageBuilder = (props: {
  content: string;
  colour: number;
  authorName?: string;
  iconUrl?: string | null;
  descripLines: Array<string>;
  additionalEmbeds: Array<DiscordWebhookEmbed>;
}): DiscordWebhook => {
  const embeds: Array<DiscordWebhookEmbed> = [
    {
      description: props.descripLines.join('\n'),
      color: props.colour,
      author: {
        name: props.authorName ?? discordActionLink.defaultAuthorName,
        icon_url: props.iconUrl ?? undefined,
      },
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
    if (dtoMetaProp.displayInDiscordMessage == null) continue;

    const localData =
      (props.data as ObjectWithPropsOfValue<string | Array<string>>)[dtoMetaPropKey] ?? anyObject;
    const localMeta = (props.dtoMeta as ObjectWithPropsOfValue<IFormDtoMetaDetails<string>>)[
      dtoMetaPropKey
    ] ?? { label: capitalizeFirstLetter(addSpacesForEnum(dtoMetaPropKey)) };

    const lines = dtoMetaProp.displayInDiscordMessage(localMeta.label, localData);
    lines.map((line) => descripLines.push(line));
  }

  return descripLines;
};

export const basicDiscordLine = (label: string, value: string) => [
  `**${label}**: ${value}`, //
];
export const shortLinkDiscordLine = (linkText: string) => (label: string, value: string) => [
  `**${label}**: [${linkText}](${value})`,
];
export const arrayDiscordLine = (label: string, values: Array<string>) => [
  `**${label}**: ${makeArrayOrDefault(values).join(', ')}`,
];
