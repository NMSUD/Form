# Adding a new Status Handler

### Create new StatusHandler

- Go to this folder `src/api/routes/status`
- Create folder for the type (e.g. **community**)
- Create a file (e.g. **communityStatusHandler.ts**) that fulfills the type `VerifyStatusFunc`
  - Example:

```ts
export const communityStatusHandler: VerifyStatusFunc = async (
  params: IVerifyStatusParams,
): Promise<ResultWithValue<CommunityDto & WithApprovalStatus>> => {
  // return...
};
```

### "Register" the function

- Add the new StatusHandler to the [lookupFunctions.ts file](../lookupFunctions.ts)
