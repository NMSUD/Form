# Steps for creating a new Form

- Create a database table
  - Log into [Xata.io](https://xata.io) and open the `nmsud-submission` database
  - Create a new table
    - Specify the data types per column, it is better to keep the fields `not null`. It helps with the Typescript typings
  - Run `npm run db:generate` in the project to get the latest types

- [Create new Dto](/src/contracts/dto/forms/NewDto.md)
- Add new item to the `IApiSegment` interface in [api.ts](/src/constants/api.ts)
- [Create new form page](/src/web/pages/form/NewFormPage.md)
- [Create API module](/src/api/module/NewApiModule.md)

