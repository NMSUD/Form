import { segments } from '../../../constants/api';
import { ApprovalStatus, colourFromApprovalStatus } from '../../../constants/enum/approvalStatus';
import { BuilderDto } from '../../../contracts/dto/forms/builderDto';
import { DiscordWebhook, DiscordWebhookEmbed } from '../../../contracts/generated/discordWebhook';
import { getBuilderCheck } from '../../../helper/checkHelper';
import { IMessageBuilderProps, baseSubmissionMessageBuilder, baseSubmissionMessageEmbed, getDescriptionLines } from '../../../services/external/discord/discordMessageBuilder';

export const builderMessageBuilder = (props: IMessageBuilderProps<BuilderDto>): DiscordWebhook => {
    const descripLines = getDescriptionLines({
        dto: props.dto,
        dtoMeta: props.dtoMeta,
        itemsToDisplay: [
            'name',
            'bio',
            'platforms',
            'startedPlaying',
            'buildTechniquesUsed',
            'communityAffiliations',
            'labels',
            'socials',
            'contactDetails',
        ],
    });

    const additionalEmbeds: Array<DiscordWebhookEmbed> = [];
    if (props.includeActionsEmbed == true) {
        const check = getBuilderCheck(props.id, props.dto.name, props.dto.contactDetails);
        additionalEmbeds.push(baseSubmissionMessageEmbed(props.id, check, segments.community));
    }

    const messages = {
        [ApprovalStatus.pending]: 'New Builder submitted! 🏘️',
        [ApprovalStatus.changesNeeded]: 'Builder submission needs changes ✒️',
        [ApprovalStatus.approvedAndProcessing]: 'Builder submission approved 🎉',
        [ApprovalStatus.approved]: 'Builder submission approved 🎉',
        [ApprovalStatus.denied]: 'Builder submission denied ❌',
    }

    return baseSubmissionMessageBuilder({
        content: messages[props.approvalStatus],
        colour: colourFromApprovalStatus(props.approvalStatus),
        descripLines,
        additionalEmbeds,
    });
}
