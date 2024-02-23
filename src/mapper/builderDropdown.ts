import { BuilderDto } from '@contracts/dto/forms/builderDto';

export const builderToDropdown = (r: BuilderDto) => ({
  title: r.name,
  value: r.id,
  image: r.profilePicUrl,
});
