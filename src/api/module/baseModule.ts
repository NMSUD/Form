import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { IFormWithFiles } from '@contracts/file';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { Result, ResultWithValue } from '@contracts/resultWithValue';

export interface IRecordRequirements {
  id: string;
  discordWebhookId?: string | null;
  approvalStatus: ApprovalStatus;
}

export type IApiModule<TD, TF, TP> = {
  name: string;
  segment: string;
  dtoMeta: IFormDtoMeta<TD>;

  mapDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<TD, TF, TP>;
  mapPersistenceToDto: Mapper<TP, TD>;

  createRecord: (persistence: Omit<TP, 'id'>) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  readRecord: (id: string) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  updateRecord: (id: string, persistence: TP & IRecordRequirements) => Promise<Result>;

  handleFilesInFormData: (formData: IFormWithFiles) => Promise<ResultWithValue<TF>>;
  getPublicUrlsOfUploads: (persistence: TP) => TP;

  calculateCheck: (persistence: TP) => number;
  additionalPropsToDisplay?: Array<string>;
};
