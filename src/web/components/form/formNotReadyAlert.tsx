import { Alert, AlertDescription, AlertIcon, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';

export const FormNotReadyAlert: Component = () => {
  return (
    <Alert
      mt="2em"
      status="warning"
      variant="subtle"
      borderBottomRadius="0"
      justifyContent="center"
      class="card-alert"
    >
      <AlertIcon mr="$2_5" />
      <AlertDescription>
        <Text>
          This form is under construction. Submissions made before the page has been made available
          are likely to be deleted.
        </Text>
      </AlertDescription>
    </Alert>
  );
};
