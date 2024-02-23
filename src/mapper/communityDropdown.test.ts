import { describe, expect, test } from 'vitest';

import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { anyObject } from '@helpers/typescriptHacks';
import { communityToDropdown } from './communityDropdown';

describe('Community mapper', () => {
  test('communityToDropdown', () => {
    const expected = {
      value: 'tId',
      title: 'test',
      image: 'url',
    };
    const community: CommunityDto = {
      ...anyObject,
      id: expected.value,
      name: expected.title,
      profilePicUrl: expected.image,
    };
    expect(communityToDropdown(community)).toStrictEqual(expected);
  });
});
