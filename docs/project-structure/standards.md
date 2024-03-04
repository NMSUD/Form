# Standards

This page will list a few of the rules for working in this project. If you disagree with any of the rules below, please feel free to suggest improvements with whatever changes are required in a pull request.

## General rules

- Use the recommended VSCode extensions
    - If you are not using VSCode, please do suggest similar tools
- Commit messages should start with an emoji, have a look at [gitmoji.dev][gitmojiWebsite]

## TS rules

- Avoid default exports.
- Use Arrow functions by default, only using the conventional functional declaration or classes when `this` is required.
- Unit tests for a file should be placed next to the file being tested
- The filename of the unit test file should match the file being tested but it should have the suffix `.test.ts`
- When creating an injectable service, you should export a function to get the service from the dependency injection container

## Web

- Avoid default exports.
  - Except for lazy loaded pages, the need default exports.
- 1 component per file.
- [Storybook][storybook] stories should be located next to the component being tested.
- A [Storybook][storybook] story file should only test a single component.
- Do not import anything from `@api` and `@data` when within the `web` folder

## API & Data

- Do not import anything from `@web` when within the `api` and `data` folders


<!-- Links used in the page -->

[gitmojiWebsite]: https://gitmoji.dev
[storybook]: https://storybook.js.org