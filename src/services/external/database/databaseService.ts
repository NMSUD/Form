import { Container, Inject, Service } from "typedi";
import { Community, CommunityRecord, XataClient } from "../../../integration/xata";
import { ConfigService } from "../../internal/configService";
import { CommunityDto } from "../../../contracts/dto/forms/communityDto";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { ApprovalStatus } from "../../../constants/enum/approvalStatus";
import { IFormResponse } from "../../../contracts/response/formResponse";
import { anyObject } from "../../../helper/typescriptHacks";

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

    addCommunitySubmission = async (persistence: Omit<Community, 'id'>): Promise<ResultWithValue<IFormResponse>> => {
        try {
            const newRecordCreated = await this.xata.db.community.create({
                ...persistence,
                approvalStatus: ApprovalStatus.pending,
            });
            return {
                isSuccess: true,
                value: {
                    id: newRecordCreated.id,
                    name: newRecordCreated.name,
                },
                errorMessage: '',
            }
        } catch (ex) {
            return {
                isSuccess: false,
                value: anyObject,
                errorMessage: ex?.toString?.() ?? 'error occurred while creating record in database',
            };
        }
    };
}

export const getDatabaseService = () => Container.get(DatabaseService);

