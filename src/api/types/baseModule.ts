import { IApiSegment } from '@constants/api';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { IFormWithFiles } from '@contracts/file';
import { DtoAndImageMapperToNewPersistence, Mapper } from '@contracts/mapper';
import { Result, ResultWithValue } from '@contracts/resultWithValue';

export interface IRecordRequirements {
  id: string;
  discordWebhookId?: string | null;
  approvalStatus: ApprovalStatus;
  anonymousUserGuid: string;
}

export interface IApiModule<TD, TF, TP> {
  segment: keyof IApiSegment;
  dtoMeta: IFormDtoMeta<TD>;
  sendDiscordMessageOnSubmission: boolean;
  getName: (persistence: TP) => string;
  getIcon?: (persistence: TP) => string | null | undefined;

  // Mappers
  mapDtoWithImageToPersistence: DtoAndImageMapperToNewPersistence<TD, TF, TP>;
  mapPersistenceToDto: Mapper<TP, TD>;
  mapRecordRelationshipsToDto?: (id: string, dto: TD) => Promise<ResultWithValue<TD>>;

  // Database
  createRecord: (persistence: Omit<TP, 'id'>) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  createRecordRelationships?: (dto: TD, persistence: TP) => Promise<Result>;
  readRecord: (id: string) => Promise<ResultWithValue<TP & IRecordRequirements>>;
  readAllRecords: () => Promise<ResultWithValue<Array<TP>>>;
  updateRecord: (id: string, persistence: TP & IRecordRequirements) => Promise<Result>;

  // Files
  handleFilesInFormData: (formData: IFormWithFiles) => Promise<ResultWithValue<TF>>;
  getPublicUrlsOfUploads: (persistence: TP) => TP & IRecordRequirements;

  calculateCheck: (persistence: TP) => number;
}
