# Create the form page

- Go to this folder `src/web/pages/form`
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
          mappings={
            {
              // Typescript should force you to declare an object for each property in the dto.
            }
          }
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
