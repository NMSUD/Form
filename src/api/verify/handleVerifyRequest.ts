import Koa from 'koa';

import { ApiStatusErrorCode, apiParams, verifySegments } from '../../constants/api';
import { FormDataKey } from '../../constants/form';
import { IFormDtoMeta } from '../../contracts/dto/forms/baseFormDto';
import { IFormResponse } from '../../contracts/response/formResponse';
import { ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { getConfig } from '../../services/internal/configService';
import { getLog } from '../../services/internal/logService';
import { validateObj } from '../../validation/baseValidation';
import { hasCaptcha } from '../guard/hasCaptcha';
import { getDatabaseService } from '../../services/external/database/databaseService';
import { errorResponse } from '../httpResponse/errorResponse';

export const handleVerifyRequest = async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    getLog().i('verify-submission');

    // const params = {
    //     id: ctx.params[apiParams.verify.id],
    //     decision: ctx.params[apiParams.verify.decision],
    //     segment: ctx.params[apiParams.verify.segment],
    //     check: ctx.params[apiParams.verify.check],
    // }

    // const lookupFunctions: { [x: string]: () => Promise<ResultWithValue<any>> } = {
    //     [verifySegments.community]: () => getDatabaseService().getCommunitySubmission(params[apiParams.verify.id]);
    // }

    // const dbFunc = lookupFunctions[params.segment];
    // if (dbFunc == null) {
    //     const errMsg = `Database function lookup failed for segment: ${params.segment}`;
    //     getLog().i(errMsg);
    //     await errorResponse({
    //         ctx,
    //         next,
    //         statusCode: ApiStatusErrorCode.segmentNotFound,
    //         message: errMsg,
    //     });
    //     return;
    // }

    // const recordResult: ResultWithValue<any> = await dbFunc();

    ctx.response.status = 200;
    ctx.body = 'Decision recorded';

    await next();
}