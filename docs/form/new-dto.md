# Create DTO & meta objects

_dto: domain transfer object_

## Create a DTO

- Go to this folder `src/contracts/dto/forms`
- Create a file (e.g. **builderDto.ts**) with an interface defined inside (e.g. **BuilderDto**)
  - Example:

```ts
export interface BuilderDto {
  name: string;
  profilePicFile: File;
  bio: string;
  contactDetails: string;
  // ...
}
```

## Meta for the new DTO

- In the same file, create a meta object

```ts
export const BuilderDtoMeta: IFormDtoMeta<BuilderDto> = {
  name: {
    label: 'Name',
    helpText: 'Your IN-GAME character name',
    validator: multiValidation(minLength(2), maxLength(100)),
  },
  // Typescript should force you to declare an object for each property in the dto.
};
```
