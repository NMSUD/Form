export interface ICaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit: boolean;
}
