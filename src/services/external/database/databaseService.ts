import { Container, Inject, Service } from 'typedi';
import { ConfigService } from '../../internal/configService';
import { createCommunity, readCommunity, updateWebhookIdCommunity, updateApprovalStatusCommunity } from './table/communityTableOperations';
import { createBuilder, readBuilder, updateWebhookIdBuilder } from './table/builderTableOperations';
import { XataClient, Community, Builder } from './xata';
import { ApprovalStatus } from '../../../constants/enum/approvalStatus';

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
        updateWebhookId: (recordId: string, webhookMessageId: string) => updateWebhookIdCommunity(this.xata, recordId, webhookMessageId),
        updateApprovalStatus: (recordId: string, approvalStatus: ApprovalStatus) => updateApprovalStatusCommunity(this.xata, recordId, approvalStatus),
    }

    builder = {
        create: (persistence: Omit<Builder, 'id'>) => createBuilder(this.xata, persistence),
        read: (id: string) => readBuilder(this.xata, id),
        updateWebhookId: (recordId: string, webhookMessageId: string) => updateWebhookIdBuilder(this.xata, recordId, webhookMessageId),
    }
}

export const getDatabaseService = () => Container.get(DatabaseService);

