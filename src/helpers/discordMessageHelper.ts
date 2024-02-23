import { api, apiParams } from '@constants/api';
import { ApprovalStatus, approvalStatusToString } from '@constants/enum/approvalStatus';
import {
  IFormDtoMeta,
  IFormDtoMetaDetails,
  IFormPersistenceMeta,
  IFormPersistenceMetaDetails,
} from '@contracts/dto/forms/baseFormDto';
import {
  DiscordWebhook,
  DiscordWebhookAttachment,
  DiscordWebhookEmbed,
} from '@contracts/generated/discordWebhook';
import { ResultWithValue } from '@contracts/resultWithValue';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { ObjectWithPropsOfValue, anyObject } from '@helpers/typescriptHacks';
import { getConfig } from '@services/internal/configService';
import { formatDate } from './dateHelper';

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

export const getDescriptionLines = async <T, TK>(props: {
  data: T;
  dtoMeta: IFormDtoMeta<T>;
  persistenceMeta: IFormPersistenceMeta<TK>;
}) => {
  const descripLines: Array<string> = [];

  for (const dbMetaPropKey in props.persistenceMeta) {
    if (Object.prototype.hasOwnProperty.call(props.persistenceMeta, dbMetaPropKey) == false) {
      continue;
    }
    const persistenceMetaProp = props.persistenceMeta[dbMetaPropKey];
    if (persistenceMetaProp?.displayInDiscordMessage == null) continue;

    const localData =
      (props.data as ObjectWithPropsOfValue<string | Array<string>>)[dbMetaPropKey] ?? anyObject;
    const propKey = dbMetaPropKey.toString();
    const dtoMetaValue = (props.dtoMeta as ObjectWithPropsOfValue<IFormDtoMetaDetails<string>>)[
      propKey
    ];
    const persistenceMetaValue = (
      props.persistenceMeta as ObjectWithPropsOfValue<IFormPersistenceMetaDetails<string>>
    )[propKey];
    let labelString = persistenceMetaValue.label ?? dtoMetaValue.label;
    if (labelString?.length < 1) {
      labelString = capitalizeFirstLetter(addSpacesForEnum(dbMetaPropKey));
    }

    const lines = await persistenceMetaProp.displayInDiscordMessage(labelString, localData);
    lines.map((line) => descripLines.push(line));
  }

  return descripLines;
};

export const basicDiscordLine = async (label: string, value: string) => [
  `**${label}**: ${value}`, //
];
export const shortLinkDiscordLine = (linkText: string) => async (label: string, value: string) => [
  `**${label}**: [${linkText}](${value})`,
];
export const arrayDiscordLine = async (label: string, values: Array<string>) => [
  `**${label}**: ${makeArrayOrDefault(values).join(', ')}`,
];
export const shortDateDiscordLine = async (label: string, value: string) => [
  `**${label}**: ${formatDate(value, 'DD MMM YY')}`, //
];
export const arrayFromDatabaseDiscordLines =
  <T>(props: {
    dbCall: (id: string) => Promise<ResultWithValue<T>>;
    mapValue: (db: T) => string;
  }) =>
  async (label: string, values: Array<string>) => {
    const links: Array<string> = [];
    for (const value of values) {
      const dataResult = await props.dbCall(value);
      if (dataResult.isSuccess == false) {
        links.push('**error**');
        continue;
      }
      const dataValue = props.mapValue(dataResult.value);
      links.push(dataValue);
    }
    return [`**${label}**: ${makeArrayOrDefault(links).join(', ')}`];
  };
