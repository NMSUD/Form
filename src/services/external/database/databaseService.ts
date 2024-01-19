import { Container, Inject, Service } from "typedi";
import { XataClient } from "../../../integration/xata";
import { ConfigService } from "../../internal/configService";

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

    // addCronusSeasonSelection = async (seasonId: number, appId: string): Promise<CronusSeasonSelections> => {
    //     const newRecord = await this.xata.db.CronusSeasonSelections.create({
    //         appId,
    //         seasonId,
    //         selectedDate: new Date(),
    //     });
    //     return newRecord;
    // };
}

export const getDatabaseService = () => Container.get(DatabaseService);

