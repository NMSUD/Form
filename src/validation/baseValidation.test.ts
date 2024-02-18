import 'reflect-metadata';
import { describe, expect, test } from 'vitest';

import Container from 'typedi';
import { AppType } from '@constants/enum/appType';
import { IFormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { anyObject } from '@helpers/typescriptHacks';
import { APP_TYPE } from '@services/internal/configService';
import {
  multiValidation,
  noValidation,
  notNull,
  seperateValidation,
  validateForEach,
  validateObj,
} from './baseValidation';

describe('Base Validation', () => {
  test('noValidation always valid', () => {
    expect(noValidation(anyObject).isValid).toBeTruthy();
  });
  test('notNullValidator on notNull', () => {
    const arr: any = anyObject;
    const validator = notNull();
    expect(validator(arr).isValid).toBeTruthy();
  });
  test('notNullValidator on null', () => {
    const arr: any = null;
    const validator = notNull();
    expect(validator(arr).isValid).toBeFalsy();
  });
  test('notNullValidator custom error message', () => {
    const arr: any = null;
    const err = 'tester test test';
    const validator = notNull(err);
    expect(validator(arr).isValid).toBeFalsy();
    expect(validator(arr).errorMessage).toBe(err);
  });

  describe('Multi Validation ', () => {
    test('multiple validators exec each validator', () => {
      let count = 0;
      const fakeValidator = () => {
        count++;
        return { isValid: true };
      };
      const valArr = [fakeValidator, fakeValidator, fakeValidator];
      const validator = multiValidation(...valArr);
      validator(anyObject);
      expect(count).toBe(valArr.length);
    });
    test('multiple validators exec each validator until failure', () => {
      let count = 0;
      const fakeValidator = () => {
        count++;
        return { isValid: false };
      };
      const validator = multiValidation(fakeValidator, fakeValidator, fakeValidator);
      validator(anyObject);
      expect(count).toBe(1);
    });
  });

  describe('Seperate Validation', () => {
    test.each([
      [AppType.Api],
      [AppType.UI], //
    ])('only run validators base on platform %s', (appType) => {
      Container.set(APP_TYPE, appType as AppType);
      let count = 0;
      const fakeValidator = () => {
        count = appType;
        return { isValid: true };
      };
      const validator = seperateValidation({
        api: fakeValidator,
        ui: fakeValidator,
      });
      validator(anyObject);
      expect(count).toBe(appType);
    });
    test('return success if platform not accounted for', () => {
      Container.set(APP_TYPE, AppType.Interactive);
      const fakeValidator = () => ({ isValid: false });
      const validator = seperateValidation({
        api: fakeValidator,
        ui: fakeValidator,
      });
      const result = validator(anyObject);
      expect(result.isValid).toBeTruthy();
    });
  });

  describe('Validate for each', () => {
    test('Runs a validator for each item in array', () => {
      let count = 0;
      const items = ['test', 'test', 'test', 'test'];
      const fakeValidator = () => {
        count++;
        return { isValid: true };
      };
      const validator = validateForEach(fakeValidator);
      validator(items);
      expect(count).toBe(items.length);
    });
  });

  describe('Validate Object', () => {
    test('Runs validators for each prop on item', () => {
      interface TestDto {
        name: string;
        descrip: string;
      }
      let count = 0;
      const fakeValidator = () => {
        count++;
        return { isValid: false };
      };
      const testDto: TestDto = {
        name: 'fred',
        descrip: 'fredster',
      };
      const testValidation: IFormDtoMeta<TestDto> = {
        name: {
          label: 'Name',
          validator: fakeValidator,
        },
        descrip: {
          label: 'Description',
          validator: fakeValidator,
        },
      };
      const validatorResults = validateObj<TestDto>({
        data: testDto,
        validationObj: testValidation,
      });
      expect(validatorResults.length).toBe(2);
    });
  });
});
