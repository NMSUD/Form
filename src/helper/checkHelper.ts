import { cyrb53 } from "./hashHelper";

export const getCommunityCheck = (id: string, name: string, contactDetails: string,) =>
    cyrb53(`${id}-${name}-${contactDetails}`)

export const getBuilderCheck = (id: string, name: string, contactDetails: string,) =>
    cyrb53(`${id}-${name}-${contactDetails}`)