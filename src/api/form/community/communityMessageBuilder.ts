import { verifySegments } from '../../../constants/api';
import { CommunityDto } from '../../../contracts/dto/forms/communityDto';
import { DiscordWebhook, DiscordWebhookAttachment, DiscordWebhookEmbed } from '../../../contracts/generated/discordWebhook';
import { makeArrayOrDefault } from '../../../helper/arrayHelper';
import { getCommunityCheck } from '../../../helper/checkHelper';
import { IMessageBuilderProps, baseSubmissionMessageEmbed } from '../../../services/external/discord/discordMessageBuilder';

export const communityMessageBuilder = (props: IMessageBuilderProps<CommunityDto>): DiscordWebhook => {
    const descripLines: Array<string> = [
        `${props.dtoMeta.bio.label}: ${props.dto.bio}`,
    ];

    descripLines.push(`${props.dtoMeta.bioMediaUrls.label}:`);
    for (const bioMediaUrl of makeArrayOrDefault(props.dto.bioMediaUrls)) {
        descripLines.push(bioMediaUrl);
    }

    descripLines.push(`${props.dtoMeta.homeGalaxies.label}:`);
    for (const homeGalaxy of makeArrayOrDefault(props.dto.homeGalaxies)) {
        descripLines.push(homeGalaxy);
    }

    descripLines.push(`${props.dtoMeta.tags.label}:`);
    for (const tag of makeArrayOrDefault(props.dto.tags)) {
        descripLines.push(tag);
    }

    descripLines.push(`${props.dtoMeta.socials.label}:`);
    for (const social of makeArrayOrDefault(props.dto.socials)) {
        descripLines.push(social);
    }

    descripLines.push(`${props.dtoMeta.contactDetails.label}: ||${props.dto.contactDetails}||`);
    const check = getCommunityCheck(props.id, props.dto.name, props.dto.contactDetails);
    const embeds: Array<DiscordWebhookEmbed> = [
        {
            description: descripLines.join('\n'),
            color: 5814783,
        },
        baseSubmissionMessageEmbed(props.id, check, verifySegments.community),
    ];
    const attachments: Array<DiscordWebhookAttachment> = [];

    return {
        content: 'New Community submitted! 🏘️',
        embeds,
        attachments,
    };
}