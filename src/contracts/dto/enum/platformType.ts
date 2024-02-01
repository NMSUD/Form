export enum PlatformType {
  PSX,
  XBX,
  Steam,
  Apple,
}

export const friendlyPlatformName = (plat?: PlatformType) => {
  switch (plat) {
    case PlatformType.PSX:
      return 'Playstation';
    case PlatformType.XBX:
      return 'Xbox';
    case PlatformType.Steam:
      return 'PC';
    case PlatformType.Apple:
      return 'Apple';
  }
  return 'Unknown';
};

export const platformTypeToString = (platformType: PlatformType) => PlatformType[platformType];
export const platformTypeFromString = (platformType: string): PlatformType => {
  const platformTypeLookup = {
    [PlatformType[PlatformType.PSX]]: PlatformType.PSX,
    [PlatformType[PlatformType.XBX]]: PlatformType.XBX,
    [PlatformType[PlatformType.Steam]]: PlatformType.Steam,
    [PlatformType[PlatformType.Apple]]: PlatformType.Apple,
  };
  const lookupValue = platformTypeLookup[platformType];
  if (lookupValue != null) return lookupValue;
  return PlatformType.Steam;
};
