import { Container, Inject, Service } from "typedi";
import { ConfigService } from "../../internal/configService";
import { createCommunity, readCommunity, updateWebhookIdCommunity } from "./table/communityTableOperations";
import { Community, XataClient } from "./xata";

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

    getCommunitySubmission = (id: string) => readCommunity(this.xata, id);
    addCommunitySubmission = (persistence: Omit<Community, 'id'>) => createCommunity(this.xata, persistence);
    addWebhookIdToCommunitySubmission = (recordId: string, webhookMessageId: string) => updateWebhookIdCommunity(this.xata, recordId, webhookMessageId);
}

export const getDatabaseService = () => Container.get(DatabaseService);

