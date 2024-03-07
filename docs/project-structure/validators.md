# Validators

These are small functions that take in a value and return a `ValidationResult`. These are meant to be small reusable functions that are joined together to build up complex validation logic.

## Base validators

There are a few validators that are used to build up complex validations such as:

### `multiValidation`
Takes a list of validators, these wil be run in order against the value passed to this validator and on the first failure, return the validationResult.

::: details multiValidation example
```ts
const validator = multiValidation(minLength(2), maxLength(100));
const isValidResult = validator(anyObject);
```
:::

<br />

### `separateValidation`

Takes in different validators based on the `AppType`. Use this to run different operations on the UI, API or even from the DataGenerator.

::: details separateValidation example
```ts
const validator = separateValidation({
    Api: noValidation,
    UI: validateForEach(notNull('You need to upload an image')),
});
const isValidResult = validator(anyObject);
```
:::

<br />

### `validateForEach`

For each item in the array of values passed to this validator, run the supplied validator

::: details validateForEach example
```ts
const validator = validateForEach(
    minLength(1),   
    // For each item in the array, the above validator will run.
    // In this case, checking if the length is greater than 1
),
const isValidResult = validator(['test', 'test2'. '3']);
```
:::

<br />

### `validateObj`

This function takes in a data object to be validated and an object that defines how to validate each property in the data object.

::: details validateObj example
```ts
const data: BuilderDto = { ... }
const validationObj: IFormDtoMeta<BuilderDto> = { ... }
const arrayOfValidResults = validateObj({
    data: data;
    validationObj: validationObj
}),
```
:::

## Custom validators

There are quite a few examples in the `src/validation` folder but the main idea is that your validator should be a function that takes a value of type `T` and returns a `ValidationResult` such as:

```ts
const myValidator = (value: T): ValidationResult => {
    const randomNum = Math.random() * 10;
    if (randomNum < 5) {
        return { isValid: false, errorMessage: 'Oops, number too small' };
    }

    return { isValid: true };
}
```

<!-- Links used in the page -->

[gitmojiWebsite]: https://gitmoji.dev
[storybook]: https://storybook.js.org