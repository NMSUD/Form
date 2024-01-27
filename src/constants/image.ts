import { IImageRestriction } from "../validation/imageValidation"

export const AppImage = {
    socialFolder: '/assets/img/social',
    platformFolder: '/assets/img/platform',
    fallbackImg: '/assets/img/fallback.png',
}

export const DefaultImageRestrictions: { [prop: string]: IImageRestriction } = {
    profilePic: {
        maxHeight: 1024,
        maxWidth: 1024,
        minHeight: 256,
        minWidth: 256,
        maxSizeMb: 1,
    }
}