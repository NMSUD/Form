import { Box, Center } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { PageHeader } from '@web/components/common/pageHeader';

export const NotFoundPage: Component = () => {
  return (
    <>
      <PageHeader text="Not Found"></PageHeader>
      <Box m={50}></Box>

      <Center>Page not found</Center>
    </>
  );
};
