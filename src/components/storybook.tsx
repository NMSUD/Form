import { Component } from "solid-js";
import { CustomThemeProvider } from "./themeProvider";
import { Container, Text } from "@hope-ui/solid";
import { Card } from "./common/card";

export const UseHopeUIThemeProvider = (Story: Component) => (
    <CustomThemeProvider>
        <Story />
    </CustomThemeProvider>
)

export const displayFrame = (title: string) => (Story: Component) => (
    <Container>
        <Text>{title}</Text>
        <Card class="form">
            <Story />
        </Card>
    </Container>
)

export const getIFormInputArgTypes = () => ({
    id: { control: 'text' },
    label: { control: 'text' },
    helpText: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    showValidationMessages: { control: 'boolean' },
});