import { Box } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { PageHeader } from '@web/components/common/pageHeader';
import { BugReportForm } from './bugReportForm';
import { Card } from '@web/components/common/card';

export const BugReportPage: Component = () => {
  return (
    <>
      <PageHeader text="Bug Report"></PageHeader>
      <Box m={25}></Box>
      <Card class="form">
        <BugReportForm />
      </Card>
    </>
  );
};

export default BugReportPage;
