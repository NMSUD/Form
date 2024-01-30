import { Container, Service, Token } from "typedi";
import { AppType } from "../../constants/enum/appType";

@Service()
export class ConfigService {
    /* If the .env var name starts with VITE_ it is available on the UI & API */

    getNmsUdFormWebUrl = () => this.get<string>('VITE_NMSUD_FORM_WEB_URL');
    getNmsUdApiUrl = () => this.get<string>('VITE_NMSUD_API_URL');
    getApiPort = () => this.get<number>('API_PORT', 3001);

    getXataApiKey = () => this.get<string>('XATA_API_KEY');
    getXataDbUrl = () => this.get<string>('XATA_DB_URL');
    getXataFallbackBranch = () => this.get<string>('XATA_FALLBACK_BRANCH');

    getDiscordWebhookUrl = () => this.get<string>('DISCORD_WEBHOOK_URL');

    getCaptchaEnabled = () => this.get<boolean>('ENABLE_CAPTCHA');
    getHCaptchaSecret = () => this.get<string>('HCAPTCHA_SECRET');
    getHCaptchaSiteKey = () => this.get<string>('VITE_HCAPTCHA_SITE_KEY');

    /* Special case, available on UI & API */
    isProd = () => this.get<string>('NODE_ENV') === 'production';
    packageVersion = () => this.get<string>('PACKAGE_VERSION');
    buildVersion = () => this.get<string>('BUILD_VERSION');

    get<T>(property: string, defaultValue?: T): T {
        const value = process?.env?.[property];
        if (defaultValue != null) {
            return (value ?? defaultValue) as T;
        }
        return (value ?? '') as T;
    };
}

export const BOT_PATH = new Token<string>('BOT_PATH');
export const getBotPath = () => Container.get(BOT_PATH);

export const APP_TYPE = new Token<AppType>('APP_TYPE');
export const getAppType = () => Container.get(APP_TYPE);

export const getConfig = () => Container.get(ConfigService);
