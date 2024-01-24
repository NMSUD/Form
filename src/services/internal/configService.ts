import { Container, Service, Token } from "typedi";

@Service()
export class ConfigService {
    /* If the .env var name starts with VITE_ it is available on the UI & API */

    getNmsUdApiUrl = (): string => this.get<string>('VITE_NMSUD_API_URL');
    getApiPort = (): number => this.get<number>('API_PORT', 3001);

    getXataApiKey = (): string => this.get<string>('XATA_API_KEY');
    getXataDbUrl = (): string => this.get<string>('XATA_DB_URL');
    getXataFallbackBranch = (): string => this.get<string>('XATA_FALLBACK_BRANCH');

    getDiscordWebhookUrl = (): string => this.get<string>('DISCORD_WEBHOOK_URL');

    getHCaptchaSecret = (): string => this.get<string>('HCAPTCHA_SECRET');
    getHCaptchaSiteKey = (): string => this.get<string>('VITE_HCAPTCHA_SITE_KEY');

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

export const getConfig = () => Container.get(ConfigService);
