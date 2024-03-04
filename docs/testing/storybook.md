# Storybook

This project uses [Storybook][storybook] to build and tests components rapidly and in isolation. This is only for the frontend components (mostly the components in the `src/web/components` folder). Please have a look at the current standard for _Story book stories_ on the [standards page](../project-structure/standards.md).


## Running locally

Use the following command to get the [Storybook][storybook] UI running with a watch on the files changed.

```sh
$ npm run storybook:dev
```

## Creating a story file

After creating a story file, then next step is to define the meta for the stories in the file.

```ts
const meta = {
  title: 'Form/Dropdown',
  component: FormDropdown,
  decorators: [UseHopeUIThemeProvider],
  tags: ['autodocs'],
  argTypes: {
    ...getIFormInputArgTypes(),
  },
} satisfies Meta<typeof FormDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;
```

The meta object above declares the location of the story in the UI (`title`), the component being tested, decorators (mostly this will be the `UseHopeUIThemeProvider` but we can add more as we go along), tags (`autodocs` tag generates a page containing all stories in this file) and finally argTypes for the default parameters

## Defining a stories

After the `meta` object, you will be able to declare multiple stories for the component you have declared the meta object for.

```ts
export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map((t) => ({ title: t, value: t })),
    validation: BuilderDtoMeta.platforms.validator,
  },
};

```

As with the above example, your stories will just be passing different parameters into the component. This is a great opportunity to pass bad data into the component to test how it will render.

<br />


::: details Complete example

```ts
<!--@include: ../../src/web/components/form/dropdown/dropdown.stories.tsx -->
```

:::

## Inject dependencies

There hasn't been a story that required dependencies to be mocked. In theory, components shouldn't need to use services that get injected bu should rather receive the data from their parent components. But once there is a story that runs into this issue, I will update this section.

## Production Storybook

On merge into `main`, an export of the [Storybook][storybook] UI is generated and hosted in Github Pages along side this documentation site. You can view the hosted Storybook page [here][formsStorybook].


<!-- Links used in the page -->

[storybook]: https://storybook.js.org
[storybookVisualTest]: https://storybook.js.org/blog/visual-tests-addon-beta/
[formsStorybook]: https://nmsud-form-docs.nmsassistant.com/storybook

