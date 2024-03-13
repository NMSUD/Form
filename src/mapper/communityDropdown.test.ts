import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, test } from 'vitest';

import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { anyObject } from '@helpers/typescriptHacks';
import { ConfigService } from '@services/internal/configService';
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
    class MockConfigService {
      getNmsUdFormDataUrl = () => '';
    }
    Container.set(ConfigService, new MockConfigService());
    expect(communityToDropdown(community)).toStrictEqual(expected);
  });
});
