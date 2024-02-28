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

Dignissimos fuga soluta at fuga sit non suscipit suscipit. Soluta officiis incidunt non sit molestias sit velit. Aut reiciendis tenetur pariatur eligendi ut. Omnis ad sit explicabo. Non consequatur odit eligendi occaecati recusandae.

## Services

Dignissimos fuga soluta at fuga sit non suscipit suscipit. Soluta officiis incidunt non sit molestias sit velit. Aut reiciendis tenetur pariatur eligendi ut. Omnis ad sit explicabo. Non consequatur odit eligendi occaecati recusandae.

## Validation

Ullam ut nam enim voluptates. Iste est occaecati sunt consequuntur et officiis fugit dolore. Accusamus ea doloremque atque autem. Esse similique sint sint dolorem sunt accusamus eaque. Iste voluptate laboriosam voluptatum neque eveniet id ex dolorem.

## Web

Ullam ut nam enim voluptates. Iste est occaecati sunt consequuntur et officiis fugit dolore. Accusamus ea doloremque atque autem. Esse similique sint sint dolorem sunt accusamus eaque. Iste voluptate laboriosam voluptatum neque eveniet id ex dolorem.


<!-- Links used in the page -->

[khaoztopsy]: https://github.com/Khaoz-Topsy
[koajs]: https://koajs.com

