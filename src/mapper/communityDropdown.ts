import { CommunityDto } from '@contracts/dto/forms/communityDto';

export const communityToDropdown = (r: CommunityDto) => ({
  title: r.name,
  value: r.id,
  image: r.profilePicUrl,
});
