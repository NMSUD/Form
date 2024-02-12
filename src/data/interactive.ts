import 'reflect-metadata';
import prompts from 'prompts';
import { Container } from 'typedi';

import { AppType } from '@constants/enum/appType';
import { DiscordWebhook } from '@contracts/generated/discordWebhook';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { getDiscordService } from '@services/external/discord/discordService';
import { APP_TYPE, BOT_PATH, getConfig } from '@services/internal/configService';
import { getGithubWorkflowService } from '@services/external/githubWorkflowService';

const interactive = async () => {
  Container.set(BOT_PATH, __dirname);
  Container.set(APP_TYPE, AppType.Interactive);
  console.log('Welcome to the interactive data scripts');

  const discordUrl = getConfig().getDiscordWebhookUrl();

  const menuLookup: { [key: string]: () => Promise<void> } = {
    sendDiscordMessage: async () => {
      const message: DiscordWebhook = {
        content: 'test message from interactive',
        embeds: [],
        attachments: [],
      };
      await getDiscordService().sendDiscordMessage(discordUrl, message);
    },
    getDiscordMessage: async () => {
      const discordMessageId = await prompts({
        type: 'text',
        name: 'value',
        message: `Enter discord message id:`,
      });
      await getDiscordService().getDiscordMessage(discordUrl, discordMessageId.value);
    },
    triggerGithubAction: async () => {
      await getGithubWorkflowService().createDispatchEvent();
    },
  };

  const menuChoice = await prompts({
    type: 'select',
    name: 'value',
    message: 'What would you like to do?',
    choices: Object.keys(menuLookup).map((ml) => ({
      title: capitalizeFirstLetter(addSpacesForEnum(ml)),
      value: ml,
    })),
  });

  const menuFunc = menuLookup[menuChoice.value];
  if (menuFunc == null) {
    console.error('selected menu option is not valid');
    return;
  }
  await menuFunc();
};

interactive();
