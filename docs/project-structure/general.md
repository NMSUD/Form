# Project Structure

The project was set up by [Khaoz-Topsy (AssistantNMS)][khaoztopsy] and could probably do with a few more refactors 😅

## Important folders

```
.
├─ src
│  ├─ api
│  ├─ data
│  ├─ services
│  ├─ validation
│  ├─ web
│  └─ ...
└─ package.json
```

::: details Click here to show more folders
```
├─ src
│  ├─ api
│  │  ├─ module
│  │  ├─ routes
│  │  └─ api.ts
│  ├─ data
│  │  ├─ downloader.ts
│  │  └─ interactive.ts
│  ├─ services
│  │  ├─ api
│  │  ├─ external
│  │  ├─ internal
│  │  └─ json
│  ├─ validation
│  └─ web
│     ├─ components
│     │  └─ form
│     ├─ pages
│     └─ index.tsx
└─ package.json
```
:::

## API

This is the back-end code of the project. This contains a KoaJS API, any backend specific code code should be in this folder. The web project is set up to not be able to import code from this folder. This is mostly because JS in the web is a bit different than JS running in a server environment... 😅

## Data

_TODO_

## Services

_TODO_

## Validation

This folder is specifically for all the validation logic, the validators are shared between the front-end and back-end with some validators specific to some environments.

## Web

This is the front-end code of the project. It is a [SolidJS][solidjs] app and is focused on rendering the form pages, handling the user input, validating and sending the data in the correct format to the back-end. This front-end could be deployed separately from the back-end, although the current plan for the [deploying of the project with Docker](../deploy/docker.md) is to package the front-end in the [Docker][docker] container.

<!-- Links used in the page -->

[khaoztopsy]: https://github.com/Khaoz-Topsy
[koajs]: https://koajs.com
[docker]: https://www.docker.com
[solidjs]: https://www.solidjs.com

