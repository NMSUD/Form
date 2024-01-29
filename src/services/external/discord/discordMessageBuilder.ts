import { api, apiParams } from '../../../constants/api';
import { IFormDtoMeta } from '../../../contracts/dto/forms/baseFormDto';
import { DiscordWebhookEmbed } from '../../../contracts/generated/discordWebhook';
import { getConfig } from '../../internal/configService';

export interface IMessageBuilderProps<T> {
    id: string;
    dto: T;
    dtoMeta: IFormDtoMeta<T>;
}

export const baseSubmissionMessageEmbed = (
    id: string,
    check: number,
    segment: string,
): DiscordWebhookEmbed => {

    const apiUrl = getConfig().getNmsUdApiUrl();
    const quickApproveUrl = apiUrl + '/' + api.routes.verify
        .replaceAll(`:${apiParams.verify.id}`, id)
        .replaceAll(`:${apiParams.verify.decision}`, 'approve')
        .replaceAll(`:${apiParams.verify.segment}`, segment)
        .replaceAll(`:${apiParams.verify.check}`, check.toString())
    const quickRejectUrl = apiUrl + '/' + api.routes.verify
        .replaceAll(`:${apiParams.verify.id}`, id)
        .replaceAll(`:${apiParams.verify.decision}`, 'reject')
        .replaceAll(`:${apiParams.verify.segment}`, segment)
        .replaceAll(`:${apiParams.verify.check}`, check.toString())

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
