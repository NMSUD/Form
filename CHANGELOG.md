# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2024-0-----

## [1.0.6] - 2024-03-21

### Added

- Handling of `PlanetBuild` submissions

### Changed

- Apps now start with the package.json type set to module
- Moved from `ts-node` to [tsx](https://www.npmjs.com/package/tsx)
- How the Docker files are setup
  - Improved Docker setup in general
  - Added Docker setup for the web project
  - Setup dev environment using Docker

### Removed

- `nodemon` dependency
- `ts-node` dependency

## [1.0.5] - 2024-03-13

### Added

- Swagger documentation
- Image processing
- Unit tests
  - Swagger
  - Image processing

## 1.0.4 - 2024-03-07

### Added

- Automate the hostname of the docs site
- Documentation
  - Around creating new forms
  - Styling

### Fixed

- favicon

## 1.0.3 - 2024-02-29

### Added

- Documentation site using vitepress
- Automation through Github Actions
- Lots of unit tests
- Unit test coverage report
- App Notices from AssistantApps API
- Docker build instructions

### Fixed

- Data downloader

<!-- Links used in the page -->

[1.0.7]: https://github.com/NMSUD/Form/compare/1.0.7...1.0.6
[1.0.6]: https://github.com/NMSUD/Form/releases/tag/1.0.6