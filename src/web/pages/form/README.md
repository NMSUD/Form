# Adding a new Form

### Set up database record

- Log into [Xata.io](https://xata.io) and open the `nmsud-submission` database
- Create a new table
  - Specify the data types per column, it is better to keep the fields `not null`. It helps with the Typescript typings
- Run `npm run db:generate` in the project to get the latest types

### Create contract & validation files
_dto: domain transfer object_

- Go to this folder `src\contracts\dto\forms`
- Create a file (e.g. **builderDto.ts**) with an interface defined inside (e.g. **BuilderBto**)
  - Example:

```ts
export interface BuilderDto {
    name: string;
    profilePicFile: File;
    bio: string;
    contactDetails: string;
}
```

- In the same file, create a meta object

```ts
export const BuilderDtoMeta: IFormDtoMeta<BuilderDto> = {
    name: {
        label: 'Name',
        helpText: 'Your IN-GAME character name',
        validator: multiValidation(
            minLength(2),
            maxLength(100),
        ),
    },
    // Typescript should force you to declare an object for each property in the dto.
}
```

### Create the form page

- Go to this folder `src\pages\form`
- Create a file (e.g. **builder.tsx**) with a component that uses `<FormBuilder />`
  - Example:

```tsx
export const BuilderFormPage: Component = () => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<BuilderDto>(anyObject);

    return (
        <>
            <PageHeader text="Submit a builder profile"></PageHeader>

            <Card class="form">
                <FormBuilder
                    item={itemBeingEdited()}
                    id="BuilderDto"
                    formDtoMeta={BuilderDtoMeta}
                    mappings={{
                        // Typescript should force you to declare an object for each property in the dto.
                    }}
                    updateObject={{}}
                    updateProperty={{}}
                    submit={{}}
                />
            </Card>
        </>
    );
};

export default BuilderFormPage;
```

### Set up routing

- Go to `src\components\appShell.tsx`
- Add your page to the useRoutes function
  - Example:

```ts
{
    path: routes.form.root.path,
    children: [
        // new route
        { path: routes.form.builder.path, component: lazy(() => import("../pages/form/builder")) },
        
        // ... other routes
        // ... other routes
    ]
},
```

### Backend work
_Now things get complicated_

> TODO complete this section

- Create a form handler for the dto
- Use `baseHandleFormSubmission`
- Define functions for handling images and data
- Add function to create & edit a record in the database
- Add function to create a discord message
- Add functions to handle the quick verify request