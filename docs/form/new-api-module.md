# Creating a new API Module

How to create a module to handle form submissions and other logic

## Create the new module

- Go to this folder `src/api/modules`
- Create a folder for the new module (e.g. **community**)
- Create a file (e.g. **communityModule.ts**) making use of `IApiModule<dto, imageInterface, dbType>`
  - This file points to all the logic for this module
  - Example:

```ts
export const communityModule: IApiModule<CommunityDto, ICommunityImages, Community> = {
  name: 'CommunityDto',
  segment: 'community',
  dtoMeta: CommunityDtoMeta,
  getName: (persistence: Community) => persistence.name,

  mapDtoWithImageToPersistence: communityDtoWithImageToPersistence,
  mapPersistenceToDto: communityPersistenceToDto,

  createRecord: (persistence) => getDbTable().create(persistence),
  readRecord: (id: string) => getDbTable().read(id),
  readAllRecords: () => getDbTable().readAll(),
  updateRecord: (id, persistence) => getDbTable().update(id, persistence),

  handleFilesInFormData: communityFileHandler,
  getPublicUrlsOfUploads: communityPublicUrlHandler,

  calculateCheck: (p) => cyrb53([p.id, p.name, p.contactDetails].join('-')),
};
```

## Create the new FileHandler

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

## Create a new Mapper

**e.g. `communityMapper.ts`**

- Export a function that takes `DtoAndImageMapperToNewPersistence<dto, imageInterface, dbType>{` and returns `dbType`
- Export a function that takes `Mapper<Community, CommunityDto>` and returns a `CommunityDto`

## Create a new PublicUrlHandler

**e.g. `communityPublicUrlHandler.ts`**

- Export a function that takes a `dbType` and returns `dbType`
- Example:

```ts
export const communityPublicUrlHandler = (persistence: Community): Community => {
  const localP = { ...persistence };
  // logic for getting file urls
  return localP;
};
```