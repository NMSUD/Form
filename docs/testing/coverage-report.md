# Coverage Report

When running unit tests via the `npm run test:dev` command, [vitest][vitest] will also generate a coverage report (thanks to our project's config). This coverage report is great for helping you find pieces of code that do not have unit tests. 

::: warning
Just because a piece of code is covered in the coverage report, does not mean it has good tests written 😝
:::

## Local coverage report

To navigate to the code coverage report, click on this button in the Vitest UI.

![vitest UI](/assets/img/docs/vitestUIGoToCoverageScreenshot.png)

<br />

You should see a page that looks like the image below. This page will give you a quick indication of which files need more unit tests.

![vitest UI](/assets/img/docs/vitestUICoverageScreenshot.png)

::: warning
It is totally expected that when making changes to tests, the report will only show a small amount of files. This can be fixed by clicking the 'Rerun all' button or typing `a` into the terminal while the process is running.
:::

## Production coverage report

On merge into `main`, a coverage report is generated and hosted in Github Pages along side this documentation site. You can view the coverage reports <!--@include: ../generated.md{1,1}-->

<!-- Links used in the page -->

[vitest]: https://vitest.dev

