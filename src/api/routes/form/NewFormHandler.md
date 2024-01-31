# Adding a new Form

### Create new FormHandler

- Go to this folder `src/api/routes/form`
- Create a file (e.g. **communityFormHandler.ts**) making use of `baseHandleFormSubmission`
  - Example:

```ts
export const communityFormHandler = baseFormHandler<CommunityDto, ICommunityImages>({
  name: 'CommunityDto',
  validationObj: CommunityDtoMeta,
  handleRequest: handleSubmission,
  handleFilesInFormData: communityFileHandler,
  discordMessageBuilder: communityMessageBuilder,
  afterDiscordMessage: getDatabaseService().community.updateWebhookId,
});
```

Create a folder for the new table (e.g. **community**)

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

### Create new MessageBuilder

**e.g. `communityMessageBuilder.ts`**

- Export a function that takes `IMessageBuilderProps<CommunityDto>` and returns a `DiscordWebhook`
- Example:

```ts
export const communityMessageBuilder = (
  props: IMessageBuilderProps<CommunityDto>,
): DiscordWebhook => {
  // ... some logic

  return baseSubmissionMessageBuilder({
    // ... required params
  });
};
```
