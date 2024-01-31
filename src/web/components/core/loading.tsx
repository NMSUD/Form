import { Center, Spinner } from '@hope-ui/solid';
import { Component } from 'solid-js';

export const CenterLoading: Component = () => {
  return (
    <Center height="100vh">
      <LoadingSpinner />
    </Center>
  );
};

export const LoadingSpinner: Component = () => {
  return <Spinner size="lg" thickness="3px" color="$primary9" />;
};
