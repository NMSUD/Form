# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.19](https://github.com/NMSUD/Form/compare/1.0.19...1.0.18) - 2024-06-19

### Fixed

- Production only bugs & styling

## [1.0.18](https://github.com/NMSUD/Form/compare/1.0.18...1.0.16) - 2024-06-19

### Changed

- Domain names that the site and back-end are hosted under!

## [1.0.16](https://github.com/NMSUD/Form/compare/1.0.16...1.0.14) - 2024-06-19

### Changed

- Scripts location
- Error handling on the API side

### Added

- Server-side image validation
- Generate code coverage badge
- Bug report form

## [1.0.14](https://github.com/NMSUD/Form/compare/1.0.14...1.0.12) - 2024-06-16

### Changed

- File uploading logic to be more reliable and easier to validate
- Added anonymous user guid
- Better error handling on the API
- Better feedback for NMSUD organisers

### Added

- Better debug info
- Added Homepage!

### WIP

- Bug report form

## [1.0.12](https://github.com/NMSUD/Form/compare/1.0.12...1.0.7) - 2024-06-16

### 🚨 MAJOR 🚨

- Setup prod deploys

### Changed

- Changed Logo
- Refactored Form submission API, to better centralize logic

## [1.0.7](https://github.com/NMSUD/Form/compare/1.0.7...1.0.6) - 2024-06-14

### Added

- Additional fields on Community and Builder JSON exports
- Multi Media upload form component

### Changed

- Refactored API & Downloader logic to take advantage of how similar actions are performed on database tables
- Storybook version and the addons we use
- Improved the automation of release notes

### WIP

- Bug report form
- Homepage

## [1.0.6](https://github.com/NMSUD/Form/releases/tag/1.0.6) - 2024-03-21

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
