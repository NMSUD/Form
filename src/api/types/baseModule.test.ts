import { describe, expectTypeOf, test } from 'vitest';

import { IApiModule } from '@api/types/baseModule';
import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { IFormWithFiles } from '@contracts/file';
import { promiseFromResult } from '@helpers/typescriptHacks';

const domain = {
  test: 'test',
};
const file = {
  testFile: 'fileStuff',
};
const persistence = {
  testP: 'test',
};
export const fakeModule: IApiModule<typeof domain, typeof file, typeof persistence> = {
  segment: 'community',
  dtoMeta: {
    test: {
      label: 'tester',
      validator: (val) => ({ isValid: val === 'test' }),
    },
  },
  persistenceMeta: {
    testP: {
      label: 'TesterP',
    },
  },
  getName: (persistence) => persistence.testP,
  mapDtoWithImageToPersistence: (src, img) => ({
    testP: 'mapped',
  }),
  mapPersistenceToDto: (persistence) => ({
    test: 'mapped from persistence',
  }),

  createRecord: (persistence) => {
    return promiseFromResult({
      isSuccess: true,
      value: {
        ...persistence,
        id: 'createdId',
        approvalStatus: ApprovalStatus.pending,
      },
      errorMessage: '',
    });
  },
  readRecord: (id: string) => {
    return promiseFromResult({
      isSuccess: true,
      value: {
        id,
        testP: 'readFromDb',
        approvalStatus: ApprovalStatus.pending,
      },
      errorMessage: '',
    });
  },
  readAllRecords: () => {
    return promiseFromResult({
      isSuccess: true,
      value: [
        {
          id: 'readAllId',
          testP: 'readFromDb',
          approvalStatus: ApprovalStatus.pending,
        },
      ],
      errorMessage: '',
    });
  },
  updateRecord: (id: string, persistence) => {
    return promiseFromResult({
      isSuccess: true,
      errorMessage: '',
    });
  },

  handleFilesInFormData: (formData: IFormWithFiles) => {
    return promiseFromResult({
      isSuccess: true,
      value: {
        testFile: 'handledFile',
      },
      errorMessage: '',
    });
  },
  getPublicUrlsOfUploads: (persistence) => ({
    ...persistence,
    id: 'publicUrls',
    approvalStatus: ApprovalStatus.pending,
  }),

  calculateCheck: (persistence) => 1234,
};

describe('ApiModule', () => {
  test('the types work as expected', async () => {
    expectTypeOf(fakeModule).toMatchTypeOf<
      IApiModule<typeof domain, typeof file, typeof persistence>
    >();
    expectTypeOf(fakeModule.segment).toMatchTypeOf<string>();
  });
});
