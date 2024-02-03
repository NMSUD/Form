import 'reflect-metadata';
import Container from 'typedi';
import { beforeEach, describe, expect, test } from 'vitest';

import { ConfigService } from '../services/internal/configService';
import {
  arrayDiscordLine,
  baseSubmissionMessageBuilder,
  baseSubmissionMessageEmbed,
  basicDiscordLine,
  discordActionLink,
  shortLinkDiscordLine,
} from './discordMessageHelper';

describe('Discord message helper', () => {
  //
  describe('baseSubmissionMessageEmbed', () => {
    const fakeApiUrl = 'http://unit.test';
    beforeEach(() => {
      class MockConfigService {
        getNmsUdApiUrl = () => fakeApiUrl;
      }
      Container.set(ConfigService, new MockConfigService());
    });
    test('should add a reject option', () => {
      const webhookEmbed = baseSubmissionMessageEmbed('', 0, '');
      const fieldValues = webhookEmbed.fields.map((f) => f.value);
      expect(
        fieldValues.filter((fv) => fv.includes(`[${discordActionLink.reject}]`)).length, //
      ).toBe(1);
    });
    test('should add an accept option', () => {
      const webhookEmbed = baseSubmissionMessageEmbed('', 0, '');
      const fieldValues = webhookEmbed.fields.map((f) => f.value);
      expect(
        fieldValues.filter((fv) => fv.includes(`[${discordActionLink.accept}]`)).length, //
      ).toBe(1);
    });
    test('should add a reject option with correct url', () => {
      const dbId = 'dbId';
      const check = 10000;
      const segment = 'test';
      const expectedRejected = `[${discordActionLink.reject}](${fakeApiUrl}/verify/${segment}/denied/${dbId}/${check})`;
      const webhookEmbed = baseSubmissionMessageEmbed(dbId, check, segment);
      expect(webhookEmbed.fields[0].value).toBe(expectedRejected);
    });
  });

  describe('baseSubmissionMessageBuilder', () => {
    test('should return atleast 1 embed', () => {
      const webhookEmbeds = baseSubmissionMessageBuilder({
        content: '',
        colour: 232323,
        descripLines: [],
        additionalEmbeds: [],
      });
      expect(webhookEmbeds.embeds.length).toBe(1);
    });
    test('should use default author if not supplied', () => {
      const webhookEmbeds = baseSubmissionMessageBuilder({
        content: '',
        colour: 232323,
        descripLines: [],
        additionalEmbeds: [],
      });
      expect(webhookEmbeds.embeds[0].author.name).toBe(discordActionLink.defaultAuthorName);
    });
    test('should add additional embeds', () => {
      const webhookEmbeds = baseSubmissionMessageBuilder({
        content: '',
        colour: 232323,
        descripLines: [],
        additionalEmbeds: [
          {
            description: 'descrip',
            color: 123123,
          },
        ],
      });
      expect(webhookEmbeds.embeds.length).toBe(2);
    });
  });

  describe('Discord display funcs', () => {
    test('basicDiscordLine', () => {
      const out = basicDiscordLine('label', 'value');
      expect(out[0]).toBe('**label**: value');
    });
    test('shortLinkDiscordLine', () => {
      const outFunc = shortLinkDiscordLine('linkText');
      const out = outFunc('label', 'value');
      expect(out[0]).toBe('**label**: [linkText](value)');
    });
    test('arrayDiscordLine', () => {
      const out = arrayDiscordLine('label', ['1', '2', '3']);
      expect(out[0]).toBe('**label**: 1, 2, 3');
    });
  });
});
