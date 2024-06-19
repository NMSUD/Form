import Koa from 'koa';

import { hasCaptcha } from '@api/guard/hasCaptcha';
import { errorResponse } from '@api/misc/httpResponse/errorResponse';
import { successResponse } from '@api/misc/httpResponse/successResponse';
import { ApiStatusErrorCode } from '@constants/api';
import { BugReportDto } from '@contracts/dto/forms/bugReportDto';
import { baseSubmissionMessageBuilder } from '@helpers/discordMessageHelper';
import { uuidv4 } from '@helpers/guidHelper';
import { anyObject } from '@helpers/typescriptHacks';
import { getDiscordService } from '@services/external/discord/discordService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';

export const bugReportEndpoint = async (
  ctx: Koa.DefaultContext,
  next: () => Promise<Koa.BaseResponse>,
) => {
  const handlerName = `bugReport-${uuidv4()}`;
  getLog().i(handlerName);

  const bodyParams: BugReportDto = ctx.request.body;
  const isCaptchaEnabled = getConfig().getCaptchaEnabled();
  if (isCaptchaEnabled === true) {
    const captchaString = bodyParams.captcha ?? '';
    const captchaTest = hasCaptcha(captchaString);
    const captchaIsValid = await captchaTest(ctx, next);
    if (captchaIsValid === false) {
      const errMsg = `${handlerName} - Captcha test: could not verify result`;
      getLog().i(errMsg);
      await errorResponse({
        ctx,
        next,
        statusCode: ApiStatusErrorCode.badCaptcha.code,
        message: errMsg,
      });
      return;
    }
  }

  const descripLines: Array<string> = [
    `Contact details: ${bodyParams.contactDetails}`,
    `Description: ${bodyParams.description}`,
  ];
  if ((bodyParams.logs?.length ?? 0) > 0) {
    descripLines.push('Logs attached');
  }

  const discordUrl = getConfig().getDiscordWebhookUrl();
  const webhookPayload = baseSubmissionMessageBuilder({
    content: '',
    authorName: 'Bug Report',
    colour: 13369858,
    descripLines,
    fields: (bodyParams.logs ?? []).map((l) => ({
      name: l.type,
      value: l.message ?? '---',
    })),
    additionalEmbeds: [],
  });

  const discordResponse = await getDiscordService().sendDiscordMessage(discordUrl, webhookPayload);
  if (!discordResponse.isSuccess) {
    const errMsg = `${handlerName} - Send discord message - ${discordResponse.errorMessage}`;
    getLog().e(errMsg);
    await errorResponse({
      ctx,
      next,
      statusCode: ApiStatusErrorCode.couldNotPersistData.code,
      message: errMsg,
    });
    return;
  }

  await successResponse({ ctx, body: anyObject, next });
};
