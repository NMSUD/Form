import { Container, Service, Token } from 'typedi';
import { AppType } from '@constants/enum/appType';

@Service()
export class ConfigService {
  /* If the .env var name starts with VITE_ it is available on the UI & API */

  getNmsUdFormWebUrl = () => this.get('VITE_NMSUD_FORM_WEB_URL');
  getNmsUdApiUrl = () => this.get('VITE_NMSUD_API_URL');
  getNmsUdBaseImgUrl = () => this.get('NMSUD_IMG_BASE_URL');
  getApiPort = () => this.getNumber('API_PORT', 3001);

  getXataApiKey = () => this.get('XATA_API_KEY');
  getXataDbUrl = () => this.get('XATA_DB_URL');
  getXataFallbackBranch = () => this.get('XATA_FALLBACK_BRANCH');

  getDiscordWebhookUrl = () => this.get('DISCORD_WEBHOOK_URL');

  getCaptchaEnabled = () => this.getBool('VITE_ENABLE_CAPTCHA');
  getHCaptchaSecret = () => this.get('HCAPTCHA_SECRET');
  getHCaptchaSiteKey = () => this.get('VITE_HCAPTCHA_SITE_KEY');

  /* Special case, available on UI & API */
  isProd = () => this.get('NODE_ENV') === 'production';
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
