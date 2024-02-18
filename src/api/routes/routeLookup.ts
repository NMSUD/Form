import { builderModule } from '@api/module/builder/builderModule';
import { communityModule } from '@api/module/community/communityModule';
import { IHandlerLookup } from '@api/types/handlerTypes';
import { baseFormHandler } from './baseFormHandler';
import { baseStatusHandler } from './baseStatusHandler';
import { baseVerifyHandler } from './baseVerifyHandler';

export const formHandlerLookup: IHandlerLookup = {
  community: baseFormHandler(communityModule),
  builder: baseFormHandler(builderModule),
};

export const statusHandlerLookup: IHandlerLookup = {
  community: baseStatusHandler(communityModule),
  builder: baseStatusHandler(builderModule),
};

export const verifyHandlerLookup: IHandlerLookup = {
  community: baseVerifyHandler(communityModule),
  builder: baseVerifyHandler(builderModule),
};
