import { CommunityDto } from '@contracts/dto/forms/communityDto';
import { getConfig } from '@services/internal/configService';

export const communityToDropdown = (r: CommunityDto) => ({
  title: r.name,
  value: r.id,
  image: getConfig().getNmsUdFormDataUrl() + r.profilePicUrl,
});
