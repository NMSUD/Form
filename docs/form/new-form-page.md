# Create the form page

How to create a form for users to fill in.

## Form page

- Go to this folder `src/web/pages/form`
- Create a file (e.g. **builder.tsx**) with a component that uses `<FormBuilder />`
  - Example:

```tsx
export const BuilderFormPage: Component = () => {
  const defaultStartDate = formatForDateDropdown(builderStartedPlayingMaxDate)
  const propertyOverrides: Array<PropertyOverrides<BuilderDto>> = [
    {
      startedPlaying: (origVal) => origVal ?? defaultStartDate,
    },
  ];

  return (
    <FormBuilder
      id="BuilderDto"
      segment="builder"
      getName={(dto: BuilderDto) => dto.name}
      formDtoMeta={BuilderDtoMeta}
      propertyOverrides={propertyOverrides}
      mappings={
        {
          // Typescript should force you to declare an object 
          // for each property in the dto.
        }
      }
    />
  );
};

export default BuilderFormPage;
```

> [!IMPORTANT]
> The default export is important for these pages, it allows us to lazy load the pages to improve the initial paint of the main app.


## Set up routing

- Go to `src/web/appShell.tsx`
- Add your page to the useRoutes function
  - Example:

```ts
{
const lazyBuilder = lazy(() => import('@web/pages/form/builder'));

  // ... AppShell.tsx stuff

    path: routes.form.path,
    children: [
      { path: routes.form.builder.path, component: lazyBuilder },
      // ... other form routes
    ],

    // ... 
},
```
