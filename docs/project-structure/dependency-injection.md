# Dependency Injection

This project uses [TypeDI][typeDI] to implement the [dependency injection][martinFowlerDi] design pattern. 

## TLDR

With this library we can easily get a class anywhere in the project. We do not need to create a new instance of that class when we need it or pass the class around. This also keeps 1 instance of the class active throughout the lifecycle of the application.

You can think of it like this: at the start of the application all the classes marked with `@Service()` will be put into a container that is accessible from anywhere. Whenever you need a class from the container, you can use `Container.get(NameOfYourClass)`;

## Create a injectable service

::: code-group

```ts [coolService.ts]
import { Container, Service } from 'typedi';

@Service()
export class CoolService {
  //...
  isCool(): string {
    return 'yes 😎';
  }
}

export const getCoolService = () => Container.get(CoolService);

```

```ts [someOtherFile.ts]
import { getCoolService } from './coolService.ts'

const coolService = getCoolService();
coolService.isCool(); // 'yes 😎'
```
:::

## Unit testing

When testing, we can create an instance of the class and test the methods in the service.

```ts
import { describe, expect, test, vi } from 'vitest';

import { CoolService } from './coolService';

describe('Cool service', () => {
  test('get isCool', async () => {
    const service = new CoolService();
    const result = service.isCool();
    expect(result).contains('yes');
  });
});
```

## Unit testing with injected dependencies

You may want to test a service that depends on getting a service that is injected in. The `ConfigService` is often used in a lot of services.

```ts
import { describe, expect, test, vi } from 'vitest';

import { CoolService } from './coolService';

describe('Cool service', () => {
  test('get isCool', async () => {
    class MockConfigService {
      getNmsUdFormDataUrl = () => 'https://form-data.nmsud.com';
    }
    Container.set(ConfigService, new MockConfigService());
    const result = getConfig().getNmsUdFormDataUrl();
    expect(result).contains('form-data.nmsud');
  });
});
```

[martinFowlerDI]: https://martinfowler.com/articles/injection.html
[typeDI]: https://docs.typestack.community/typedi/v/develop/01-getting-started