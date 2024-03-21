<div align="center">
  
  # NMSUD Form
  _Makes submitting your builds for [Unification Days][nmsudWebsite] easier._
  
  <br />  
  
  ![header](https://github.com/NMSUD/.github/blob/main/img/banner.png?raw=true) 
  
  <br />
  
  ![madeWithLove](https://github.com/NMSUD/.github/blob/main/badge/made-with-love.svg)
  ![gitmoji](https://github.com/NMSUD/.github/blob/main/badge/gitmoji.svg?raw=true)<br />

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vitest](https://img.shields.io/badge/Vitest-202127?style=for-the-badge&logo=vitest)
![Vitepress](https://img.shields.io/badge/vitepress-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)<br />

![SolidJS](https://img.shields.io/badge/Solid%20JS-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)
![HopeUI](https://img.shields.io/badge/HopeUI-05a2c2?style=for-the-badge&logo=chakraui&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
<br />

![koaJS](https://img.shields.io/badge/koaJS-%23404d59.svg?style=for-the-badge)
![xata](https://img.shields.io/badge/xata.io-%239478FF.svg?style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Github Actions](https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=github%20actions&logoColor=white)
<br />

[![Supported by the No Man's Sky Community Developers & Designers](https://raw.githubusercontent.com/NMSCD/About/master/badge/green-ftb.svg)][nmscd]<br />
![Profile views](https://komarev.com/ghpvc/?username=NMSUD&color=green&style=for-the-badge)

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

<!-- This is used in vitepress, don't change the position of the following lines (58 to 73) -->

### Requirements

- [Node.js](https://nodejs.org/) version 18 or higher.
- Terminal for running `npm` scripts.
- [VSCode](https://code.visualstudio.com/) is recommended.

### Steps:

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
[nmscd]: https://github.com/NMSCD?ref=nmsudForm
[docker]: https://www.docker.com
[dockerHub]: https://hub.docker.com
[documentation]: https://nmsud-form-docs.nmsassistant.com
[discord]: https://discord.gg/jQrNeWeTwR
