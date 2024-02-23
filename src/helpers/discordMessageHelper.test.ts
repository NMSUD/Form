import 'reflect-metadata';
import Container from 'typedi';
import { beforeEach, describe, expect, test } from 'vitest';

import { ConfigService } from '../services/internal/configService';
import {
  arrayDiscordLine,
  arrayFromDatabaseDiscordLines,
  baseSubmissionMessageBuilder,
  baseSubmissionMessageEmbed,
  basicDiscordLine,
  discordActionLink,
  getDescriptionLines,
  shortDateDiscordLine,
  shortLinkDiscordLine,
} from './discordMessageHelper';
import { promiseFromResult } from './typescriptHacks';
import { IFormDtoMeta, IFormPersistenceMeta } from '@contracts/dto/forms/baseFormDto';

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
      const fieldValues = (webhookEmbed?.fields ?? []).map((f) => f.value);
      expect(
        fieldValues.filter((fv) => fv.includes(`[${discordActionLink.reject}]`)).length, //
      ).toBe(1);
    });
    test('should add an accept option', () => {
      const webhookEmbed = baseSubmissionMessageEmbed('', 0, '');
      const fieldValues = (webhookEmbed?.fields ?? []).map((f) => f.value);
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
      expect((webhookEmbed?.fields ?? [])[0].value).toBe(expectedRejected);
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
      expect(webhookEmbeds.embeds[0].author!.name).toBe(discordActionLink.defaultAuthorName);
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

  describe('getDescriptionLines', () => {
    const testObj = {
      title: 'fred',
      role: 'tester',
      notInDiscordMsg: 'hi',
    };
    const testObjMeta: IFormDtoMeta<typeof testObj> = {
      title: { label: 'Title', validator: () => ({ isValid: true }) },
      role: { label: '', validator: () => ({ isValid: true }) },
      notInDiscordMsg: { label: '', validator: () => ({ isValid: true }) },
    };
    const testPersMeta: IFormPersistenceMeta<typeof testObj> = {
      title: {
        label: 'DB Title',
        displayInDiscordMessage: (lbl, data) => promiseFromResult([`${lbl}, ${data}`]),
      },
      role: {
        displayInDiscordMessage: (lbl, data) => promiseFromResult([`${lbl}, ${data}`]),
      },
    };
    test('should return 2 discord lines', async () => {
      const descripLines = await getDescriptionLines({
        data: testObj,
        dtoMeta: testObjMeta,
        persistenceMeta: testPersMeta,
      });
      expect(descripLines.length).toBe(2);
    });
    test('if no labels supplied, use propName', async () => {
      const descripLines = await getDescriptionLines({
        data: testObj,
        dtoMeta: testObjMeta,
        persistenceMeta: testPersMeta,
      });
      expect(descripLines[1]).toBe('Role, tester');
    });
  });

  describe('Discord display funcs', () => {
    test('basicDiscordLine', async () => {
      const out = await basicDiscordLine('label', 'value');
      expect(out[0]).toBe('**label**: value');
    });
    test('shortLinkDiscordLine', async () => {
      const outFunc = shortLinkDiscordLine('linkText');
      const out = await outFunc('label', 'value');
      expect(out[0]).toBe('**label**: [linkText](value)');
    });
    test('arrayDiscordLine', async () => {
      const out = await arrayDiscordLine('label', ['1', '2', '3']);
      expect(out[0]).toBe('**label**: 1, 2, 3');
    });
    test('shortDateDiscordLine', async () => {
      const out = await shortDateDiscordLine('label', '2024-02-03');
      expect(out[0]).toBe('**label**: 03 Feb 24');
    });
    describe('arrayFromDatabaseDiscordLines', () => {
      test('display items', async () => {
        const outFunc = arrayFromDatabaseDiscordLines({
          dbCall: (id) => promiseFromResult({ isSuccess: true, value: id, errorMessage: '' }),
          mapValue: (db) => db,
        });
        const out = await outFunc('label', ['test', 'tester']);
        expect(out[0]).toBe('**label**: test, tester');
      });
      test('some items faile to load', async () => {
        const outFunc = arrayFromDatabaseDiscordLines({
          dbCall: (id) =>
            promiseFromResult({ isSuccess: id != 'tester', value: id, errorMessage: '' }),
          mapValue: (db) => db,
        });
        const out = await outFunc('label', ['test', 'tester', 'testers']);
        expect(out[0]).toBe('**label**: test, **error**, testers');
      });
    });
  });
});
