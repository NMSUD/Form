import { Container, Service } from 'typedi';

interface ILogMessage {
  type: 'log' | 'warn' | 'error';
  content: Array<unknown>;
}

@Service()
export class LogService {
  private _logs: Array<ILogMessage> = [];

  constructor() {
    console.originalLog = console.log.bind(console);
    console.log = (...data: Array<unknown>) => {
      this._logs.push({ type: 'log', content: data });
      console.stdlog.apply(console, arguments);
    };
  }

  i = console.log;
  w = console.warn;
  e = console.error;
}

export const getLog = () => Container.get(LogService);
