# Package.json

We make use of the [npm-run-all][npmRunAll] package to help split up the scripts, so that we can reuse them. For example, if we have scripts `test:one`, `test:two`, `test:three` and then run `npm-run-all --sequential test:*`, then each of the scripts that start with "test:" would run one at a time.


## What do they do?

I will admit, there are a lot of scripts and dependencies. It would take far too much maintenance to keep documentation about each script up to date. So lets keep it simple, with the knowledge of the [npm-run-all][npmRunAll] package we use, here are some important scripts

- `npm run setup` - _All scripts that are important for getting the the developer environment ready_
- `npm run build` - _Generate the output of one or more projects within this solution_
- `npm run data:<id>` - _Various data projects, 
  - `npm run data:downloader` is used by [FormData][formDataGithub], to download all the data from the database and write them to disk in the correst format. 
  - `npm run data:interactive` is used to quickly run functions from an interactive console
- `npm run storybook` - _Storybook tasks_
- `npm run docs` - Documentation generation
- `npm run test` - Unit tests and coverage reports

<!-- Links used in the page -->

[npmRunAll]: https://www.npmjs.com/package/npm-run-all
[formDataGithub]: https://github.com/NMSUD/FormData

