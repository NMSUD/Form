import { IApiModule, IRecordRequirements } from '@api/types/baseModule';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { cyrb53 } from '@helpers/hashHelper';
import { promiseFromResult } from '@helpers/typescriptHacks';

const fakeStringResult = {
  isSuccess: true,
  value: '',
  errorMessage: '',
};
const fakeSingleResult = {
  ...fakeStringResult,
  value: { id: '', approvalStatus: ApprovalStatus.approved },
};
const fakeArrayResult = {
  ...fakeSingleResult,
  value: [{ id: '', approvalStatus: ApprovalStatus.approved }],
};

export const noopModule: IApiModule<string, string, IRecordRequirements> = {
  segment: 'planetBase',
  dtoMeta: '',
  persistenceMeta: {},
  getName: (persistence: IRecordRequirements) => persistence.id,
  getIcon: (persistence: IRecordRequirements) => persistence.id,

  mapDtoWithImageToPersistence: () => fakeSingleResult.value,
  mapPersistenceToDto: () => '',
  mapRecordRelationshipsToDto: () => promiseFromResult(fakeStringResult),

  createRecord: () => promiseFromResult(fakeSingleResult),
  readRecord: () => promiseFromResult(fakeSingleResult),
  readAllRecords: () => promiseFromResult(fakeArrayResult),
  updateRecord: () => promiseFromResult(fakeSingleResult),

  handleFilesInFormData: (_) => promiseFromResult(fakeStringResult),
  getPublicUrlsOfUploads: (p) => p,

  calculateCheck: (p) => cyrb53([p.id].join('-')),
};
