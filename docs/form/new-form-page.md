# Create the form page

- Go to this folder `src/web/pages/form`
- Create a file (e.g. **builder.tsx**) with a component that uses `<FormBuilder />`
  - Example:

```tsx
export const BuilderFormPage: Component = () => {
  const dataFromState: BuilderDto = getStateService().getForm('builder');
  const initialItem: BuilderDto = {
    ...dataFromState,
    startedPlaying:
      dataFromState.startedPlaying ?? formatDate(builderStartedPlayingMaxDate, 'YYYY-MM-DD'),
  };

  return (
    <>
      <PageHeader text="Submit a builder profile"></PageHeader>

      <Card class="form">
        <FormBuilder
          item={initialItem}
          id="BuilderDto"
          segment="builder"
          getName={/*(dto: BuilderDto) => dto.name*/}
          formDtoMeta={BuilderDtoMeta}
          mappings={
            {
              // Typescript should force you to declare an object for each property in the dto.
            }
          }
        />
      </Card>
    </>
  );
};

export default BuilderFormPage;
```

### Set up routing

- Go to `src/web/appShell.tsx`
- Add your page to the useRoutes function
  - Example:

```ts
{
    path: routes.form.root.path,
    children: [
        // new route
        {
          path: routes.form.builder.path,
          component: lazy(() => import('@web/pages/form/builder')),
        },

        // ... other routes
        // ... other routes
    ]
},
```

<br />
<br />
<br />
