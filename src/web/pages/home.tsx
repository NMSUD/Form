import { Box, Container, Divider, Text } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';

import { routes } from '@constants/route';
import { PageHeader } from '@web/components/common/pageHeader';
import { CenterLoading } from '@web/components/core/loading';

export const HomePage: Component = () => {
  const headingSize = 24;
  const subHeadingSize = 18;

  return (
    <>
      <PageHeader text="Welcome to the NMSUD submission page!"></PageHeader>
      <Box m={50}></Box>

      <Container maxWidth="1200px" px="2em">
        <Text textAlign="center">Add quick explanation of the process</Text>
        <br />
        <Text textAlign="center">Explain what this site can do and what it is not meant for</Text>
      </Container>

      <Container my="2em">
        <Divider variant="dashed" />
      </Container>
    </>
  );
};

export const RedirectToHome: Component = () => {
  const navigate = useNavigate();
  navigate(routes.actualHome.path);

  return <CenterLoading />;
};
