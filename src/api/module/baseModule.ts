import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { IFormWithFiles } from '@contracts/file';
import { DiscordWebhook } from '@contracts/generated/discordWebhook';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { IMessageBuilderProps } from '@services/external/discord/discordMessageBuilder';

export interface IRecordRequirements {
  id: string;
  discordWebhookId?: string | null;
  approvalStatus: ApprovalStatus;
}

export type IApiModule<TD, TF, TP> = {
  name: string;
  segment: string;
  validationObj: IFormDtoMeta<TD>;

  mapDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<TD, TF, TP>;
  mapPersistenceToDto: Mapper<TP, TD>;

  createRecord: (persistence: Omit<TP, 'id'>) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  readRecord: (id: string) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  updateRecord: (id: string, persistence: TP & IRecordRequirements) => Promise<Result>;
  // addDiscordWebhookMsgId: (recordId: string, webhookMessageId: string) => Promise<Result>;

  handleFilesInFormData: (formData: IFormWithFiles) => Promise<ResultWithValue<TF>>;
  calculateCheck: (persistence: TP) => number;
  discordMessageBuilder: (props: IMessageBuilderProps<TD>) => DiscordWebhook;
};
