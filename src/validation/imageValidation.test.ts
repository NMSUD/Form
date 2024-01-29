import { describe, expect, test } from 'vitest';

import { IImageParams } from '../helper/imageHelper';
import { IImageRestriction, webImageRestrictions } from './imageValidation';

describe('Image Validation', () => {
    const imgWithParams: IImageParams = {
        width: 100,
        height: 100,
        fileSize: 100 * (1024.0 * 1024.0),
        fileExtension: '.png',
    }

    test('webImageRestrictions maxWidth', () => {
        const imgRestriction: IImageRestriction = {
            maxWidth: 90
        }
        const validator = webImageRestrictions(imgRestriction);
        const result = validator(imgWithParams as any);
        expect(result.isValid).toBeFalsy();
    });
    test('webImageRestrictions maxHeight', () => {
        const imgRestriction: IImageRestriction = {
            maxHeight: 90
        }
        const validator = webImageRestrictions(imgRestriction);
        const result = validator(imgWithParams as any);
        expect(result.isValid).toBeFalsy();
    });
    test('webImageRestrictions minWidth', () => {
        const imgRestriction: IImageRestriction = {
            minWidth: 101
        }
        const validator = webImageRestrictions(imgRestriction);
        const result = validator(imgWithParams as any);
        expect(result.isValid).toBeFalsy();
    });
    test('webImageRestrictions minHeight', () => {
        const imgRestriction: IImageRestriction = {
            minHeight: 101
        }
        const validator = webImageRestrictions(imgRestriction);
        const result = validator(imgWithParams as any);
        expect(result.isValid).toBeFalsy();
    });
    test('webImageRestrictions maxSizeMb', () => {
        const imgRestriction: IImageRestriction = {
            maxSizeMb: 90
        }
        const validator = webImageRestrictions(imgRestriction);
        const result = validator(imgWithParams as any);
        expect(result.isValid).toBeFalsy();
    });
});
