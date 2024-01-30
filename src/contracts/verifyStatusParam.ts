import { ResultWithValue } from "./resultWithValue";

export interface IVerifyStatusParams {
    id: string;
    segment: string;
}

export type VerifyStatusFunc = (params: IVerifyStatusParams) => Promise<ResultWithValue<any>>;