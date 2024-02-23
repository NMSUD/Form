import { describe, expect, test } from 'vitest';

import { builderToDropdown } from './builderDropdown';
import { BuilderDto } from '@contracts/dto/forms/builderDto';
import { anyObject } from '@helpers/typescriptHacks';

describe('Builder mapper', () => {
  test('builderToDropdown', () => {
    const expected = {
      value: 'tId',
      title: 'test',
      image: 'url',
    };
    const builder: BuilderDto = {
      ...anyObject,
      id: expected.value,
      name: expected.title,
      profilePicUrl: expected.image,
    };
    expect(builderToDropdown(builder)).toStrictEqual(expected);
  });
});
