# Github Actions

We have a few Github Action workflows in the repo, below are a few details on the workflows

## Github Pages

> [github-pages.yml](../../.github/workflows/github-pages.yml)

This workflow builds all of the pages that are hosted on Github Pages. This includes building this documentation site, the [Storybook](../testing/storybook.md) export and [unit test coverage report](../testing/coverage-report.md)
 
## Unit tests

> [unit-tests.yml](../../.github/workflows/unit-tests.yml)

This workflow runs the [unit tests](../testing/unit-tests.md), if any do not pass, the workflow should fail. This only needs to run on Pull requests into `main`

## Github Tag and Release

> [github-tag-release](../../.github/workflows/github-tag-release.yml)

This tags the repo, builds the projects, creates a release with the version number in package.json and uploads the build files to the release.

## Pull Request Checks

> [pr-checks.yml](../../.github/workflows/pr-checks.yml)

> Work In Progress, this workflow will perform several checks to make sure that the changes in the PR are adequate.

## Commit message check

> [commit-message-check.yml](../../.github/workflows/commit-message-check.yml)

> Work In Progress, this workflow will check all the commits that are about to be merged into `main`