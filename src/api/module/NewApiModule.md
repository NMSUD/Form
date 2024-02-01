# Creating a new Module

- Go to this folder `src/api/modules`
- Create a folder for the new module (e.g. **community**)
- Create a file (e.g. **communityModule.ts**) making use of `IApiModule<dto, imageInterface, dbType>`
  - This file points to all the logic for this module
  - Example:

```ts
export const communityModule: IApiModule<CommunityDto, ICommunityImages, Community> = {
  name: 'CommunityDto',
  validationObj: CommunityDtoMeta,
  createRecord: getDatabaseService().community().create,
  readRecord: getDatabaseService().community().read,
  updateRecord: getDatabaseService().community().update,

  mapDtoWithImageToPersistence: communityDtoWithImageToPersistence,
  mapPersistenceToDto: communityPersistenceToDto,

  handleFilesInFormData: communityFileHandler,
  discordMessageBuilder: communityMessageBuilder,
  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
```

### Create new FileHandler

**e.g. `communityFileHandler.ts`**

- Define an interface with all the images that will be extracted
- Export a function that takes `formData: IFormWithFiles` and returns `Promise<ResultWithValue<INTERFACE_JUST_CREATED>>`
- Example:

```ts
export interface ICommunityImages {
  profilePicFile?: IDatabaseFile;
  bioMediaFiles?: Array<IDatabaseFile>;
}

export const communityFileHandler = async (
  formData: IFormWithFiles,
): Promise<ResultWithValue<ICommunityImages>> => {
  // ... get the images out of the form
};
```

### Create new Mapper

**e.g. `communityMapper.ts`**

- Export a function that takes `DtoAndImageMapperToNewPersistence<dto, imageInterface, dbType>{` and returns `dbType`
- Export a function that takes `Mapper<Community, CommunityDto>` and returns a `CommunityDto`
