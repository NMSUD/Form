export enum PlatformType {
  PSX,
  XBX,
  PC,
  Apple,
}

export const friendlyPlatformName = (plat?: PlatformType) => {
  switch (plat) {
    case PlatformType.PSX:
      return 'Playstation';
    case PlatformType.XBX:
      return 'Xbox';
    case PlatformType.PC:
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
    [PlatformType[PlatformType.PC]]: PlatformType.PC,
    [PlatformType[PlatformType.Apple]]: PlatformType.Apple,

    [PlatformType.PSX.toString()]: PlatformType.PSX,
    [PlatformType.XBX.toString()]: PlatformType.XBX,
    [PlatformType.PC.toString()]: PlatformType.PC,
    [PlatformType.Apple.toString()]: PlatformType.Apple,
  };
  const lookupValue = platformTypeLookup[platformType];
  if (lookupValue != null) return lookupValue;
  return PlatformType.PC;
};
