import 'reflect-metadata';

import url from 'url';
import path from 'path';
import prompts from 'prompts';
import { Container } from 'typedi';

import { AppType } from '@constants/enum/appType';
import { DiscordWebhook } from '@contracts/generated/discordWebhook';
import { formatDate } from '@helpers/dateHelper';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { getDiscordService } from '@services/external/discord/discordService';
import { getGithubWorkflowService } from '@services/external/githubWorkflowService';
import { APP_TYPE, BOT_PATH, getConfig } from '@services/internal/configService';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

const interactive = async () => {
  Container.set(BOT_PATH, directory);
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
    getGithubActionRuns: async () => {
      const runsResult = await getGithubWorkflowService().getWorkflowRuns();
      if (runsResult.isSuccess == false) {
        console.log('Could not get runs');
        return;
      }
      console.log(`\tNum runs: ${runsResult.value.total_count}`);
      for (const run of runsResult.value.workflow_runs) {
        console.log(`\tRun date: ${formatDate(run.run_started_at)}`);
      }
    },
  };

  const menuChoice = await prompts({
    type: 'select',
    name: 'value',
    message: 'What would you like to do?',
    choices: Object.keys(menuLookup).map((menuItem) => ({
      title: capitalizeFirstLetter(addSpacesForEnum(menuItem)),
      value: menuItem,
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
