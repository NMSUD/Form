export const imgFileName = {
  profilePic: (id: string) => `${id}_profile_pic.png`,
  bioMediaUrls: (id: string, index: number) => `${id}_bio_media_${index}.png`,
} as const;
