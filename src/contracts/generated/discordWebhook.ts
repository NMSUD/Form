export interface DiscordWebhook {
  content: string;
  embeds: Array<DiscordWebhookEmbed>;
  // flags: number;
  attachments: Array<DiscordWebhookAttachment>;
}

export interface DiscordWebhookEmbed {
  description?: string;
  color?: number;
  author?: DiscordWebhookAuthor;
  thumbnail?: DiscordWebhookThumbnail;
  fields?: Array<DiscordWebhookField>;
}

export interface DiscordWebhookAuthor {
  name: string;
  icon_url?: string;
}

export interface DiscordWebhookThumbnail {
  url: string;
}

export interface DiscordWebhookAttachment {
  id: number;
  description: string;
  filename: string;
}

export interface DiscordWebhookField {
  name: string;
  value: string;
  inline: boolean;
}
