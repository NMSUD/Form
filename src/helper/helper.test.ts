import { test, describe, expect } from 'vitest';

import { makeArrayOrDefault } from "./arrayHelper";
import { formatDate } from './dateHelper';
import { getArrFromEnum, getDropDownOptionsFromEnum } from './enumHelper';
import { PlatformType } from '../contracts/dto/enum/platformType';
import { onTargetFile, onTargetValue, preventDefault } from './eventHelper';

describe('Helper tests', () => {

    describe('Make array or default', () => {
        test('makeArrayOrDefault on undefined', () => {
            const arr: any = undefined;
            const arrVal = makeArrayOrDefault(arr);
            expect(Array.isArray(arrVal)).toBeTruthy();
        });
        test('makeArrayOrDefault on null', () => {
            const arr: any = null;
            const arrVal = makeArrayOrDefault(arr);
            expect(Array.isArray(arrVal)).toBeTruthy();
        });
        test('makeArrayOrDefault on null with defined value', () => {
            const arr: any = null;
            const defaultArr = ['test1', 'test2'];
            const arrVal = makeArrayOrDefault(arr, defaultArr);
            expect(Array.isArray(arrVal)).toBeTruthy();
            expect(arrVal.length).toBe(defaultArr.length);
        });
    });

    describe('Date formatter', () => {
        test('formatDate', () => {
            const dateStr = formatDate('2023-01-01');
            expect(dateStr).toBe('01 Jan 23 12:00');
        });
    });

    describe('Enum helper', () => {
        test('getArrFromEnum', () => {
            const arr = getArrFromEnum(PlatformType);
            expect(arr.length > 3).toBeTruthy();
        });
        test('getDropDownOptionsFromEnum', () => {
            const dropdownOpt = getDropDownOptionsFromEnum(PlatformType);
            expect(dropdownOpt.length > 3).toBeTruthy();
        });
    });

    describe('Event helper', () => {
        test('onTargetValue', () => {
            const event = {
                target: {
                    value: 'test',
                }
            }
            let value = 'no';
            const eventHandler = onTargetValue<string>((result) => {
                value = result;
            });
            eventHandler(event);
            expect(value).toBe('test');
        });
        test('onTargetFile', () => {
            const event = {
                target: {
                    files: ['test'] as any,
                }
            }
            let value: any = 'no';
            const eventHandler = onTargetFile((result) => {
                value = result;
            });
            eventHandler(event);
            expect(value).toBe('test');
        });
        test('preventDefault', () => {
            let value = 'no';
            const event = {
                preventDefault: () => {
                    value = 'test'
                }
            }
            preventDefault(event);
            expect(value).toBe('test');
        });
    });
});
