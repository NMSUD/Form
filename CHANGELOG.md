# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.6]

> _2024-0---_

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

## [1.0.5]

> _2024-03-13_

### Added

- Swagger documentation
- Image processing
- Unit tests
  - Swagger
  - Image processing

## 1.0.4

> _2024-03-07_

### Added

- Automate the hostname of the docs site
- Documentation
  - Around creating new forms
  - Styling

### Fixed

- favicon

## 1.0.3

> _2024-02-29_

### Added

- Documentation site using vitepress
- Automation through Github Actions
- Lots of unit tests
- Unit test coverage report
- App Notices from AssistantApps API
- Docker build instructions

### Fixed

- Data downloader

[unreleased]: https://github.com/NMSUD/Form/compare/1.0.6...HEAD
[1.0.6]: https://github.com/NMSUD/Form/compare/1.0.6...1.0.5
[1.0.5]: https://github.com/NMSUD/Form/releases/tag/1.0.5
