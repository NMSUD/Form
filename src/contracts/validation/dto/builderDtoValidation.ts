import { BuilderDto } from "../../dto/forms/builderDto";
import { minItems } from "../../validation/arrayValidation";
import { multiValidation, noValidation, validateForEach } from "../../validation/baseValidation";
import { maxLength, minLength, shouldBeUrl } from "../../validation/textValidation";
import { ValidationResult } from "../../validationResult";

export const BuilderDtoValidation: { [prop in keyof BuilderDto]: (val: any) => ValidationResult } = {
    name: multiValidation([
        minLength(2),
        maxLength(100),
    ]),
    profilePic: multiValidation([
        minLength(2),
        maxLength(500),
    ]),
    bio: multiValidation([
        minLength(2),
        maxLength(500),
    ]),
    platforms: minItems(1),
    labels: noValidation,
    socials: validateForEach(
        multiValidation([
            minLength(2),
            shouldBeUrl
        ]),
    ),
}