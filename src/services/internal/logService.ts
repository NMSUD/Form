import { LogType } from '@constants/enum/logType';
import { ILogMessage } from '@web/contracts/logMessage';
import { Container, Service } from 'typedi';
import { getAppType, getConfig } from './configService';
import { AppType } from '@constants/enum/appType';

@Service()
export class LogService {
  private _logs: Array<ILogMessage> = [];

  private _logStyle = (type: LogType) => {
    switch (type) {
      case 'log':
        return 'color: green; font-size: medium';
      case 'warn':
        return 'color: orange; font-size: medium';
      case 'error':
        return 'color: red; font-size: large';
    }
  };

  private isWebAndProd = () => {
    if (!getConfig().isProd()) return false;
    if (getAppType() !== AppType.UI) return false;

    return true;
  };

  private _track =
    (type: LogType) =>
    (message: string, ...optionalParams: Array<unknown>) => {
      const log: ILogMessage = {
        type,
        message,
        optionalParams: optionalParams.map((op) => JSON.stringify(op, null, 2)),
      };
      this._logs.push(log);

      const logStyle = this._logStyle(log.type);
      console.log(
        (log.optionalParams ?? []).length > 0
          ? `%c${log.message}\nadditional params:\n${(log.optionalParams ?? []).join('\n\r')}`
          : `%c${log.message}`,
        logStyle,
      );
    };

  i = this.isWebAndProd() ? this._track('log') : console.log;
  w = this.isWebAndProd() ? this._track('warn') : console.warn;
  e = this.isWebAndProd() ? this._track('error') : console.error;

  getLogs = () => {
    return this._logs;
  };
}

export const getLog = () => Container.get(LogService);
