import { Component } from 'solid-js';
import { Container, Text } from '@hope-ui/solid';

import { CustomThemeProvider } from '@web/components/themeProvider';
import { Card } from '@web/components/common/card';

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

export const getIFormInputArgTypes = () => ({
  id: { control: 'text' },
  label: { control: 'text' },
  helpText: { control: 'text' },
  value: { control: 'text' },
  placeholder: { control: 'text' },
  showValidationMessages: { control: 'boolean' },
});
