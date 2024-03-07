<div align="center">
  
  # NMSUD Form
  _Makes submitting your builds for [Unification Days][nmsudWebsite] easier._
  
  <br />  
  
  ![header](https://github.com/NMSUD/.github/blob/main/img/banner.png?raw=true) 
  
  <br />
  
  ![madeWithLove](https://github.com/NMSUD/.github/blob/main/badge/made-with-love.svg)
  ![gitmoji](https://github.com/NMSUD/.github/blob/main/badge/gitmoji.svg?raw=true)<br />
  ![Profile views](https://komarev.com/ghpvc/?username=NMSUD&color=green&style=for-the-badge)<br />
  
  <br /> 
</div>

## 📦 Projects in this repo

### Website

This is the website that contains the forms that users will see. It allows for user inputs, with validation and knows how to package all the information to be sent to the API.

### API

This is able to accept requests, prevent spam, unpack and verify the contents and ultimately securely store the information in a database.

### Data generator

This script is able to pull all the uploaded images and the records out of the database. Then the script manipulates and writes the data to json files to be consumed by websites, apps, etc later.

<br />

## 🏃‍♂️ Running the project

### Requirements

- Almost any desktop computer (eg.. MacOS X, Linux, Windows)
- An IDE with (e.g. IntelliJ, Android Studio, VSCode etc)
- [NodeJS](https://nodejs.org) installed

### Steps:

<!-- This is used in vitepress, don't change the position of the following lines (46 to 54) -->

1. Clone this repository.
2. Copy and rename the `env.dart.template` file to `env.dart`.
3. In the directory where the `package.json` file is, run `npm i` to install all the required packages.
4. Run `npm run setup` to run the initial setup.
5. Run the app
   - **Web** can be run locally using `npm run start:web`.
   - **API** can be run locally using `npm run start:api`.
   - **Data** can be run locally using `npm run start:data`.

<br />

## 🧪 Running the tests

This project uses [vitest](https://vitest.dev) for unit tests. The tests in this project are mostly testing the validation functions used on both the **website** and **API** projects. Hoping to add more tests in the future!

To run the tests, use the command `npm run test`.

<br />

## 🎨 Storybook

This project has [Storybook](https://storybook.js.com) set up. This is mostly for visual testing and is suitable for components such as the reusable form components in `src/components/form`.

To run storybook use the command `npm run storybook:dev`. \
Then open [localhost:3003](http://localhost:3003)

<br />

## 👪 Contributing

Please take a look at the [Contribution Guideline](./.github/CONTRIBUTING.md) before creating an issue or pull request.

<br />

## 📄 Documentation

We have a [documentation][documentation] website, here you can find information on how to run the project on your machine, how the project was setup, how to add new forms, how to run unit tests and more.

<br />

## 🔗 Links

[![Website](https://img.shields.io/badge/Website-nmsud.com-blue?color=7986cc&style=for-the-badge)][nmsudWebsite] <br />
[![Discord](https://img.shields.io/badge/Discord-NMSUD-blue?color=5865F2&style=for-the-badge)][discord] <br />

<br />

<!-- Links used in the page -->

[nmsudWebsite]: https://nmsud.com
[docker]: https://www.docker.com
[dockerHub]: https://hub.docker.com
[documentation]: https://nmsud-form-docs.nmsassistant.com
[discord]: https://discord.gg/jQrNeWeTwR
