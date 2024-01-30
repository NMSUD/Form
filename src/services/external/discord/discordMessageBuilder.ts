import { api, apiParams } from '../../../constants/api';
import { ApprovalStatus, approvalStatusToString } from '../../../constants/enum/approvalStatus';
import { IFormDtoMeta } from '../../../contracts/dto/forms/baseFormDto';
import { DiscordWebhook, DiscordWebhookAttachment, DiscordWebhookEmbed } from '../../../contracts/generated/discordWebhook';
import { makeArrayOrDefault } from '../../../helper/arrayHelper';
import { anyObject } from '../../../helper/typescriptHacks';
import { getConfig } from '../../internal/configService';

export interface IMessageBuilderProps<T> {
    id: string;
    dto: T;
    dtoMeta: IFormDtoMeta<T>;
    includeActionsEmbed: boolean;
    approvalStatus: ApprovalStatus;
}

export const baseSubmissionMessageEmbed = (
    id: string,
    check: number,
    segment: string,
): DiscordWebhookEmbed => {

    const apiUrl = getConfig().getNmsUdApiUrl();
    const quickApproveUrl = apiUrl + '/' + api.routes.verify
        .replaceAll(`:${apiParams.verify.id}`, id)
        .replaceAll(`:${apiParams.verify.segment}`, segment)
        .replaceAll(`:${apiParams.verify.check}`, check.toString())
        .replaceAll(`:${apiParams.verify.decision}`, approvalStatusToString(ApprovalStatus.approvedAndProcessing));
    const quickRejectUrl = apiUrl + '/' + api.routes.verify
        .replaceAll(`:${apiParams.verify.id}`, id)
        .replaceAll(`:${apiParams.verify.segment}`, segment)
        .replaceAll(`:${apiParams.verify.check}`, check.toString())
        .replaceAll(`:${apiParams.verify.decision}`, approvalStatusToString(ApprovalStatus.denied));

    return {
        fields: [
            {
                name: 'Quick action',
                value: `[❌ Reject](${quickRejectUrl})`,
                inline: true
            },
            {
                name: 'Quick action',
                value: `[✅ Approve](${quickApproveUrl})`,
                inline: true
            }
        ]
    };;
}

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
}

export const getDescriptionLines = <T extends {}, TK extends {}>(props: {
    dto: T;
    dtoMeta: TK;
    itemsToDisplay: Array<keyof T | TK>;
}) => {
    const descripLines: Array<string> = [];

    for (const dtoProp of props.itemsToDisplay) {
        const localDto = (props.dto as any)[dtoProp] ?? anyObject;
        const localMeta = (props.dtoMeta as any)[dtoProp];
        if (localMeta == null) continue;

        if (Array.isArray(localDto)) {
            descripLines.push(`${localMeta.label}:`);
            for (const dtoItem of makeArrayOrDefault(localDto)) {
                descripLines.push(`- ${dtoItem}`);
            }
            continue;
        }
        descripLines.push(`${localMeta.label}: ${localDto}`);
    }

    return descripLines;
}
