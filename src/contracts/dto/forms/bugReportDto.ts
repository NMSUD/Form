import { ILogMessage } from '@web/contracts/logMessage';

export interface BugReportDto {
  contactDetails: string;
  description: string;
  logs: Array<ILogMessage>;
  captcha?: string;
}
