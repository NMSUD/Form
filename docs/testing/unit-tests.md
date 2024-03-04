# Unit tests

This project uses [vitest][vitest] to run unit tests. Please have a look at the current standard for naming and the location of this test on the [standards page](../project-structure/standards.md).


## Running locally

Use the following command to get the unit tests running with a watch on the files changed.

```sh
$ npm run test:dev
```

## Code coverage (text output)

This command will show you code coverage details in your terminal, this will rerun for any change detected in `.test.ts` files. You will also get errors when the unit tests fail.

![vitest text result](/assets/img/docs/vitestTextResultScreenshot.png)

## Vitest UI

This command also launches the UI for [vitest][vitest], otherwise open your browser to [http://localhost:3001/__vitest__/#/](http://localhost:8008/__vitest__/#/)

![vitest UI](/assets/img/docs/vitestUIScreenshot.png)

This UI is just a prettier version of the text output. One of the nice features is that you can view a code coverage report within it, see [the next page](coverage-report.md).


<!-- Links used in the page -->

[vitest]: https://vitest.dev

