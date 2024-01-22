export enum PlatformType {
    PSX,
    XBX,
    Steam,
    Apple,
}

export const friendlyPlatformName = (plat: PlatformType) => {
    switch (plat) {
        case PlatformType.PSX: return 'Playstation';
        case PlatformType.XBX: return 'Xbox';
        case PlatformType.Steam: return 'PC';
        case PlatformType.Apple: return 'Apple';
    }
    return 'Unknown';
}