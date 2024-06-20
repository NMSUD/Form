import { Container, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { ArgTypes } from 'storybook-solidjs';

import { Card } from '@web/components/common/card';
import { CustomThemeProvider } from '@web/components/themeProvider';

export const UseHopeUIThemeProvider = (Story: Component) => (
  <CustomThemeProvider>
    <Story />
  </CustomThemeProvider>
);

export const displayFrame = (title: string) => (Story: Component) => (
  <Container>
    <Text>{title}</Text>
    <Card class="form">
      <Story />
    </Card>
  </Container>
);

export const getFormInputArgTypes = <T,>() =>
  ({
    id: { control: 'text' },
    label: { control: 'text' },
    helpText: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    showValidationMessages: { control: 'boolean' },
  }) as Partial<ArgTypes<T>>;
