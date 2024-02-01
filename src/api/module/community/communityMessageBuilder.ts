import { ApprovalStatus, colourFromApprovalStatus } from '@constants/enum/approvalStatus';
import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { DiscordWebhook, DiscordWebhookEmbed } from '@contracts/generated/discordWebhook';
import {
  IMessageBuilderProps,
  baseSubmissionMessageBuilder,
  baseSubmissionMessageEmbed,
  getDescriptionLines,
} from '@services/external/discord/discordMessageBuilder';

export const communityMessageBuilder = (
  props: IMessageBuilderProps<CommunityDto>,
): DiscordWebhook => {
  const descripLines = getDescriptionLines({
    dto: props.dto,
    dtoMeta: props.dtoMeta,
    itemsToDisplay: [
      'name', //
      'bio',
      'homeGalaxies',
      'tags',
      'socials',
      'contactDetails',
    ],
  });

  const additionalEmbeds: Array<DiscordWebhookEmbed> = [];
  if (props.includeActionsEmbed == true) {
    additionalEmbeds.push(
      baseSubmissionMessageEmbed(
        props.dbId,
        props.calculateCheck,
        props.segment, //
      ),
    );
  }

  const messages = {
    [ApprovalStatus.pending]: 'New Community submitted! 🏘️',
    [ApprovalStatus.changesNeeded]: 'Community submission needs changes ✒️',
    [ApprovalStatus.approvedAndProcessing]: 'Community submission approved 🎉',
    [ApprovalStatus.approved]: 'Community submission approved 🎉',
    [ApprovalStatus.denied]: 'Community submission denied ❌',
  };

  return baseSubmissionMessageBuilder({
    content: messages[props.approvalStatus],
    colour: colourFromApprovalStatus(props.approvalStatus),
    descripLines,
    additionalEmbeds,
  });
};
