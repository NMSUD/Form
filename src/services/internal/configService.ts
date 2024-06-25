import { AppType } from '@constants/enum/appType';
import { EnvKey } from '@constants/generated/env';
import { Container, Service, Token } from 'typedi';

@Service()
export class ConfigService {
  private _internalCache: { [name: string]: string | number | boolean } = {};

  constructor() {
    for (const configMetaKey of Object.keys(EnvKey)) {
      const configProp = (EnvKey as unknown as { [prop: string]: string })[configMetaKey];
      const isAvailableOnUI = configProp.includes('VITE_');
      if (getAppType() == AppType.UI && isAvailableOnUI === false) continue;

      let value = this._getFromProcess(configProp);
      if (value == null || value.length < 1) {
        console.warn(`Environment variable '${configProp}' is missing a value`);
      }
      this._internalCache[configProp] = value;
    }
    this._internalCache['prod'] =
      this._getFromProcess('NODE_ENV').toLocaleLowerCase() === 'production' ||
      this._getFromProcess('MODE').toLocaleLowerCase() === 'production';
  }

  private _get = (prop: string) => this._internalCache[prop];
  private _getBool = (prop: string) => () => this._internalCache[prop] == 'true';
  private _getNumber = (prop: string) => () => Number(this._internalCache[prop]);
  private _getFromProcess(property: string, defaultValue?: string): string {
    const value = process?.env?.[property];
    if (defaultValue != null) {
      return value ?? defaultValue;
    }
    return value ?? '';
  }

  getNmsUdFormWebUrl = () => this._get(EnvKey.NMSUD_FORM_WEB_URL);
  getNmsUdApiUrl = () => this._get(EnvKey.NMSUD_API_URL);
  getNmsUdFormDataUrl = () => this._get(EnvKey.NMSUD_FORM_DATA_URL);
  getNmsUdFormDocsUrl = () => this._get(EnvKey.NMSUD_FORM_DOCS_URL);

  getApiPort = () => this._getNumber(EnvKey.API_PORT);
  getApiSecret = () => this._get(EnvKey.API_SECRET);

  getXataApiKey = () => this._get(EnvKey.XATA_API_KEY);
  getXataDbUrl = () => this._get(EnvKey.XATA_DB_URL);
  getXataFallbackBranch = () => this._get(EnvKey.XATA_FALLBACK_BRANCH);

  getDiscordWebhookUrl = () => this._get(EnvKey.DISCORD_WEBHOOK_URL);

  getGithubActionTriggerOnDecision = () => this._getBool(EnvKey.GITHUB_ACTION_TRIGGER_ON_DECISION);
  getGithubActionOwner = () => this._get(EnvKey.GITHUB_ACTION_OWNER);
  getGithubActionRepo = () => this._get(EnvKey.GITHUB_ACTION_REPO);
  getGithubActionWorkflowId = () => this._get(EnvKey.GITHUB_ACTION_WORKFLOW_ID);
  getGithubActionMinBetweenRuns = () => this._getNumber(EnvKey.GITHUB_ACTION_MINUTES_BETWEEN_RUN);
  getGithubActionAuthToken = () => this._get(EnvKey.GITHUB_AUTH_TOKEN);

  getCaptchaEnabled = () => this._getBool(EnvKey.ENABLE_CAPTCHA);
  getHCaptchaSecret = () => this._get(EnvKey.HCAPTCHA_SECRET);
  getHCaptchaSiteKey = () => this._get(EnvKey.HCAPTCHA_SITE_KEY);

  /* Special case, available on UI & API */
  isProd = this._getBool('prod');
  packageVersion = () => this._get('PACKAGE_VERSION');
  buildVersion = () => this._get('BUILD_VERSION');
}

export const BOT_PATH = new Token<string>('BOT_PATH');
export const getBotPath = () => Container.get(BOT_PATH);

export const APP_TYPE = new Token<AppType>('APP_TYPE');
export const getAppType = () => Container.get(APP_TYPE);

export const getConfig = () => Container.get(ConfigService);
