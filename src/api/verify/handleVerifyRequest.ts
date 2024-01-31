import Koa from 'koa';

import { ApiStatusErrorCode, apiParams, segments } from '../../constants/api';
import { approvalStatusFromString } from '../../constants/enum/approvalStatus';
import { IVerifyRequestParams, VerifyRequestFunc } from '../../contracts/verifyRequestParam';
import { getDiscordService } from '../../services/external/discord/discordService';
import { getConfig } from '../../services/internal/configService';
import { getLog } from '../../services/internal/logService';
import { errorResponse } from '../httpResponse/errorResponse';
import { handleCommunityVerifyRequest } from './community/handleCommunityVerifyRequest';
import { routes } from '../../constants/route';

export const handleVerifyRequest = async (ctx: Koa.DefaultContext, next: () => Promise<Koa.BaseResponse>) => {
    const params: IVerifyRequestParams = {
        id: ctx.params[apiParams.verify.id],
        decision: ctx.params[apiParams.verify.decision],
        segment: ctx.params[apiParams.verify.segment],
        check: ctx.params[apiParams.verify.check],
    }
    getLog().i(`verify-submission - ${params.id}`);

    const approvalStatus = approvalStatusFromString(params.decision);
    if (approvalStatus == null) {
        const errMsg = `Approval status not understood: ${params.decision}`;
        getLog().e(errMsg);
        await errorResponse({
            ctx,
            next,
            statusCode: ApiStatusErrorCode.decisionNotFound,
            message: errMsg,
        });
        return;
    }

    const lookupFunctions: { [x: string]: VerifyRequestFunc } = {
        [segments.community]: handleCommunityVerifyRequest,
    }

    const dbFunc = lookupFunctions[params.segment];
    if (dbFunc == null) {
        const errMsg = `Database function lookup failed for segment: ${params.segment}`;
        getLog().e(errMsg);
        await errorResponse({
            ctx,
            next,
            statusCode: ApiStatusErrorCode.segmentNotFound,
            message: errMsg,
        });
        return;
    }

    const updateRecordResult = await dbFunc(params, approvalStatus);
    if (updateRecordResult.isSuccess == false || updateRecordResult.value == null) {
        const errMsg = `An error occurred while updating the approval status of record: ${params.id}`;
        getLog().e(errMsg);
        await errorResponse({
            ctx,
            next,
            statusCode: ApiStatusErrorCode.couldNotPersistData,
            message: errMsg,
        });
        return;
    }

    const discordUrl = getConfig().getDiscordWebhookUrl();
    await getDiscordService().updateDiscordMessage(
        discordUrl,
        updateRecordResult.value.id,
        updateRecordResult.value.message,
    );

    const urlSegments = [
        getConfig().getNmsUdFormWebUrl(),
        '/#/',
        routes.verify.path,
        '?',
        routes.verify.queryParam.decision,
        '=',
        params.decision,
    ];
    ctx.response.status = 301;
    ctx.redirect(urlSegments.join(''));

    await next();
}