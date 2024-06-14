import { LogType } from '@constants/enum/logType';

export interface ILogMessage {
  type: LogType;
  message?: string;
  optionalParams?: Array<string>;
}
