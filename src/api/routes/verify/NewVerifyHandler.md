# Adding a new Verify Handler

### Create new VerifyHandler

- Go to this folder `src/api/routes/verify`
- Create folder for the type (e.g. **community**)
- Create a file (e.g. **communityVerifyHandler.ts**) that fulfills the type `VerifyVerifyFunc`
  - Example:

```ts
export const communityVerifyHandler: VerifyRequestFunc = async (
  params: IVerifyRequestParams,
  approvalStatus: ApprovalStatus,
): Promise<ResultWithValue<IVerifyRequestDiscordParams>> => {
  // return...
};
```

### "Register" the function

- Add the new VerifyHandler to the [lookupFunctions.ts file](../lookupFunctions.ts)
