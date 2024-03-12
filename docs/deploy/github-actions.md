# Github Actions

We have a few Github Action workflows in the repo, below are a few details on the workflows

## Github Pages

> [github-pages.yml](../../.github/workflows/github-pages.yml)

This workflow builds all of the pages that are hosted on Github Pages. This includes building this documentation site, the [Storybook](../testing/storybook.md) export and [unit test coverage report](../testing/coverage-report.md)
 
## Unit tests

> [unit-tests.yml](../../.github/workflows/unit-tests.yml)

This workflow runs the [unit tests](../testing/unit-tests.md), if any do not pass, the workflow should fail. This only needs to run on Pull requests into `main`

## Build Artifacts

> [build-artifacts.yml](../../.github/workflows/build-artifacts.yml)

This builds the projects in this repo and uploads the artifacts to Github, for potential future use 

## Commit message check

> [commit-message-check.yml](../../.github/workflows/commit-message-check.yml)

> Work In Progress, this workflow will check all the commits that are about to be merged into `main`