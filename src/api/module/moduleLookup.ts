import { builderModule } from '@api/module/builder/builderModule';
import { communityModule } from '@api/module/community/communityModule';
import { ModuleLookupType } from '@api/types/handlerTypes';
import { noopModule } from './noopModule';

export const moduleLookup: ModuleLookupType = {
  community: communityModule,
  builder: builderModule,
  planetBase: noopModule,
};
