import { Box, Heading } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';

import { routes } from '@constants/route';
import { PageHeader } from '@web/components/common/pageHeader';
import { CenterLoading } from '@web/components/core/loading';

export const HomePage: Component = () => {
  return (
    <>
      <PageHeader text="Home"></PageHeader>
      <Box m={50}></Box>

      <Box m={50}></Box>

      <Heading size="3xl" textAlign="center">
        Welcome to the NMSUD <b>user submission page!</b>
      </Heading>
    </>
  );
};

export const RedirectToHome: Component = () => {
  const navigate = useNavigate();
  navigate(routes.actualHome.path);

  return <CenterLoading />;
};
