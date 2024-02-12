import { IApiSegment } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormDtoMeta, IFormPersistenceMeta } from '@contracts/dto/forms/baseFormDto';
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
  segment: keyof IApiSegment;
  dtoMeta: IFormDtoMeta<TD>;
  persistenceMeta: IFormPersistenceMeta<TP>;
  getName: (persistence: TP) => string;
  getIcon?: (persistence: TP) => string | null | undefined;

  mapDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<TD, TF, TP>;
  mapPersistenceToDto: Mapper<TP, TD>;
  mapRecordRelationshipsToDto?: (id: string, dto: TD) => Promise<ResultWithValue<TD>>;

  createRecord: (persistence: Omit<TP, 'id'>) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  createRecordRelationships?: (dto: TD, persistence: TP) => Promise<Result>;
  readRecord: (id: string) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  readAllRecords: () => Promise<ResultWithValue<Array<TP>>>;
  updateRecord: (id: string, persistence: TP & IRecordRequirements) => Promise<Result>;

  handleFilesInFormData: (formData: IFormWithFiles) => Promise<ResultWithValue<TF>>;
  getPublicUrlsOfUploads: (persistence: TP) => TP & IRecordRequirements;

  calculateCheck: (persistence: TP) => number;
};
