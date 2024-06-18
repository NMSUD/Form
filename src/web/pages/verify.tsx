import { Box, Container, Text } from '@hope-ui/solid';
import { useLocation } from '@solidjs/router';
import { Component, For, Match, Show, Switch } from 'solid-js';

import { routes } from '@constants/route';
import { PageHeader } from '@web/components/common/pageHeader';
import { lineBreak } from '@constants/form';

export const VerifyPage: Component = () => {
  const location = useLocation();

  const params: Array<string> = [];
  for (const queryParam of Object.keys(routes.verify.queryParam)) {
    params.push(decodeURI(location.query?.[queryParam] ?? ''));
  }
  const [id, code, message, detail] = params;

  const headingSize = 24;
  const subHeadingSize = 18;
  return (
    <>
      <PageHeader text="Verify submission"></PageHeader>
      <Box p={25}></Box>

      <Container maxWidth="1200px" px="2em">
        <Switch>
          <Match when={parseInt(code) >= 200 && parseInt(code) < 300}>
            <Text color="lightgreen" textAlign="center" fontSize={headingSize} mb="$4">
              ✔ Success!
            </Text>
          </Match>
          <Match when={parseInt(code) >= 300 && parseInt(code) < 500}>
            <Text color="yellow" textAlign="center" fontSize={headingSize} mb="$4">
              ❕ Minor error
            </Text>
          </Match>
          <Match when={parseInt(code) >= 500}>
            <Text color="red" textAlign="center" fontSize={headingSize} mb="$4">
              ❌ Something went wrong
            </Text>
          </Match>
        </Switch>
        <Box p={15}></Box>

        <Text textAlign="center" fontSize={subHeadingSize} mb="$4">
          {message}
        </Text>
        <Box p={15}></Box>

        <Show when={(detail.length ?? 0) > 1}>
          <Text textAlign="center">
            <Text>
              <b>Extra details:</b>
            </Text>
            <For each={detail.split(lineBreak)}>{(detailText) => <Text>{detailText}</Text>}</For>
          </Text>
        </Show>
      </Container>

      <Box p={30}></Box>
      <Text textAlign="center">
        <small>
          <b>database record id:</b> {id}
        </small>
      </Text>
      <Box p={5}></Box>
    </>
  );
};

export default VerifyPage;
