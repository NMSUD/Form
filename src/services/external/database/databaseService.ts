import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { Container, Inject, Service } from 'typedi';
import { ConfigService } from '../../internal/configService';
import { createBuilder, readBuilder, updateWebhookIdBuilder } from './table/builderTableOperations';
import {
  createCommunity,
  readCommunity,
  updateApprovalStatusCommunity,
  updateWebhookIdCommunity,
} from './table/communityTableOperations';
import { Builder, Community, XataClient } from './xata';

@Service()
export class DatabaseService {
  private xata: XataClient;

  constructor(@Inject() config: ConfigService) {
    this.xata = new XataClient({
      apiKey: config.getXataApiKey(),
      databaseURL: config.getXataDbUrl(),
      branch: config.getXataFallbackBranch(),
    });
  }

  community = {
    create: (persistence: Omit<Community, 'id'>) => createCommunity(this.xata, persistence),
    read: (id: string) => readCommunity(this.xata, id),
    updateWebhookId: (recordId: string, webhookMessageId: string) =>
      updateWebhookIdCommunity(this.xata, recordId, webhookMessageId),
    updateApprovalStatus: (recordId: string, approvalStatus: ApprovalStatus) =>
      updateApprovalStatusCommunity(this.xata, recordId, approvalStatus),
  };

  builder = {
    create: (persistence: Omit<Builder, 'id'>) => createBuilder(this.xata, persistence),
    read: (id: string) => readBuilder(this.xata, id),
    updateWebhookId: (recordId: string, webhookMessageId: string) =>
      updateWebhookIdBuilder(this.xata, recordId, webhookMessageId),
  };
}

export const getDatabaseService = () => Container.get(DatabaseService);
