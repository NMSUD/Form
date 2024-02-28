# Environment Variables

## Setup

This solution makes use of [dotenv][dotenv] to easily setup environment variables on your machine that are ~~used~~ required for the application to run properly. 

To setup your environment variables, copy and rename the `env.dart.template` file to `env.dart`. Then fill in the values for all the keys that you need, more on that below.

## Format of the .env files

```txt
KEY1=value
KEY2="value with spaces"
```

## .env.template

Contains the keys of expected environment variables. It should not contain any sensitive information.

::: details View contents
```
<!--@include: @.env.template-->
```
:::

## Deeper look

Keys that start with `VITE_` are available on the frontend as well as the backend. If the key does not start with `VITE_` it will only be available in the backend. 

_We may change the name of this key in the future._

## Adding a new Key & Value

1. Make sure that you add the new key to both the `.env` and `.env.template` files. 
1. Add a function to the [configService.ts](/src/services/internal/configService.ts). 
1. Use your new environment variable with 
```ts
const myNewValue = getConfig().getMyNewVariable();
```


<!-- Links used in the page -->

[dotenv]: https://www.npmjs.com/package/dotenv-cli

