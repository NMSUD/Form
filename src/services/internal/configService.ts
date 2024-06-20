import { Container, Service, Token } from 'typedi';
import { AppType } from '@constants/enum/appType';

@Service()
export class ConfigService {
  private _internalIsProd?: boolean;

  /* If the .env var name starts with VITE_ it is available on the UI & API */
  getNmsUdFormWebUrl = () => this.get('VITE_NMSUD_FORM_WEB_URL');
  getNmsUdApiUrl = () => this.get('VITE_NMSUD_API_URL');
  getNmsUdFormDataUrl = () => this.get('VITE_NMSUD_FORM_DATA_URL');
  getNmsUdFormDocsUrl = () => this.get('VITE_NMSUD_FORM_DOCS_URL');

  getApiPort = () => this.getNumber('API_PORT', 3001);
  getApiSecret = () => this.get('API_SECRET');

  getXataApiKey = () => this.get('XATA_API_KEY');
  getXataDbUrl = () => this.get('XATA_DB_URL');
  getXataFallbackBranch = () => this.get('XATA_FALLBACK_BRANCH');

  getDiscordWebhookUrl = () => this.get('DISCORD_WEBHOOK_URL');

  getGithubActionTriggerOnDecision = () => this.getBool('GITHUB_ACTION_TRIGGER_ON_DECISION');
  getGithubActionOwner = () => this.get('GITHUB_ACTION_OWNER');
  getGithubActionRepo = () => this.get('GITHUB_ACTION_REPO');
  getGithubActionWorkflowId = () => this.get('GITHUB_ACTION_WORKFLOW_ID');
  getGithubActionMinBetweenRuns = () => this.getNumber('GITHUB_ACTION_MINUTES_BETWEEN_RUN');
  getGithubActionAuthToken = () => this.get('GITHUB_AUTH_TOKEN');

  getCaptchaEnabled = () => this.getBool('VITE_ENABLE_CAPTCHA');
  getHCaptchaSecret = () => this.get('HCAPTCHA_SECRET');
  getHCaptchaSiteKey = () => this.get('VITE_HCAPTCHA_SITE_KEY');

  /* Special case, available on UI & API */
  isProd = () => {
    if (this._internalIsProd == null) {
      this._internalIsProd =
        this.get('NODE_ENV').toLocaleLowerCase() === 'production' ||
        this.get('MODE').toLocaleLowerCase() === 'production';
    }

    return this._internalIsProd;
  };
  packageVersion = () => this.get('PACKAGE_VERSION');
  buildVersion = () => this.get('BUILD_VERSION');

  get(property: string, defaultValue?: string): string {
    const value = process?.env?.[property];
    if (defaultValue != null) {
      return value ?? defaultValue;
    }
    return value ?? '';
  }
  getBool = (property: string, defaultValue?: string) =>
    this.get(property, defaultValue).toLowerCase() == 'true';
  getNumber = (property: string, defaultValue?: number) =>
    Number(this.get(property, defaultValue?.toString?.()));
}

export const BOT_PATH = new Token<string>('BOT_PATH');
export const getBotPath = () => Container.get(BOT_PATH);

export const APP_TYPE = new Token<AppType>('APP_TYPE');
export const getAppType = () => Container.get(APP_TYPE);

export const getConfig = () => Container.get(ConfigService);
