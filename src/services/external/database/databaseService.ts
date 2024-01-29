import { Container, Inject, Service } from 'typedi';
import { ConfigService } from '../../internal/configService';
import { createCommunity, readCommunity, updateWebhookIdCommunity } from './table/communityTableOperations';
import { createBuilder, readBuilder, updateWebhookIdBuilder } from './table/builderTableOperations';
import { XataClient, Community, Builder } from './xata';

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

    getCommunity = (id: string) => readCommunity(this.xata, id);
    addCommunity = (persistence: Omit<Community, 'id'>) => createCommunity(this.xata, persistence);
    addWebhookIdToCommunity = (recordId: string, webhookMessageId: string) => updateWebhookIdCommunity(this.xata, recordId, webhookMessageId);

    getBuilder = (id: string) => readBuilder(this.xata, id);
    addBuilder = (persistence: Omit<Builder, 'id'>) => createBuilder(this.xata, persistence);
    addWebhookIdToBuilder = (recordId: string, webhookMessageId: string) => updateWebhookIdBuilder(this.xata, recordId, webhookMessageId);
}

export const getDatabaseService = () => Container.get(DatabaseService);

