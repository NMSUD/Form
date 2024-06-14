import { ApprovalStatus } from '@constants/enum/approvalStatus';
import { Result, ResultWithValue } from '@contracts/resultWithValue';
import { anyObject } from '@helpers/typescriptHacks';
import { FilesPluginResult, Repository, XataRecord } from '@xata.io/client';
import { getLog } from '../../../internal/logService';
import { DatabaseSchema } from '../xata';

export interface ICrudOperationProps<T extends XataRecord<XataRecord<any>>> {
  repo: Repository<T>;
  files: FilesPluginResult<DatabaseSchema>;
  logName: string;
}

export const getCrudOperations = <T, TR extends XataRecord<XataRecord<any>>>(
  props: ICrudOperationProps<TR>,
) => ({
  table: props.repo,
  create: async (persistence: Omit<T, 'id'>): Promise<ResultWithValue<T>> => {
    try {
      const record = await props.repo.create({
        ...persistence,
        approvalStatus: ApprovalStatus.pending,
        ...anyObject,
      });

      return {
        isSuccess: true,
        value: record as T,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `error occurred while reading record from database. ex: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: errMsg,
      };
    }
  },

  read: async (id: string): Promise<ResultWithValue<T>> => {
    try {
      const record = await props.repo.read(id);

      if (record == null) {
        throw `read${props.logName} - Record not found for (${id})`;
      }

      return {
        isSuccess: true,
        value: record as T,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `error occurred while creating record in database. ex: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: errMsg,
      };
    }
  },

  readAll: async (): Promise<ResultWithValue<Array<T>>> => {
    try {
      const records = await props.repo.getAll();

      return {
        isSuccess: true,
        value: records as Array<T>,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `error occurred while fetching all records in database. ex: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: errMsg,
      };
    }
  },

  update: async (id: string, persistence: T): Promise<Result> => {
    try {
      await props.repo.update(id, {
        ...persistence,
        ...anyObject,
      });

      return {
        isSuccess: true,
        errorMessage: '',
      };
    } catch (ex) {
      const errMsg = `error occurred while updating record in database. ex: ${ex?.toString?.()}`;
      getLog().e(errMsg);
      return {
        isSuccess: false,
        errorMessage: errMsg,
      };
    }
  },

  // delete: async (persistence: T): Promise<Result> => {
  //   try {
  //     await props.repo.delete(persistence.id);

  //     return {
  //       isSuccess: true,
  //       errorMessage: '',
  //     };
  //   } catch (ex) {
  //     const errMsg = ex?.toString?.() ?? 'error occurred while deleting record in database';
  //     getLog().e(errMsg);
  //     return {
  //       isSuccess: false,
  //       errorMessage: errMsg,
  //     };
  //   }
  // },
});
