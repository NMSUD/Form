import { PlatformType } from "../enum/platformType";

export interface BuilderDto {
    name: string;
    profilePic: string;
    bio: string;
    platforms: Array<PlatformType>;
    labels: Array<string>;
    socials: Array<string>;
}

