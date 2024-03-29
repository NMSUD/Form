import { site } from '@constants/site';
import { Flex, Heading } from '@hope-ui/solid';
import { Component } from 'solid-js';

interface IProps {
  text: string;
}

export const PageHeader: Component<IProps> = (props: IProps) => {
  return (
    <>
      <Flex
        class="page-title noselect"
        direction="row"
        justifyContent="center"
        paddingTop="2em"
        mb="1em"
      >
        <Heading size="3xl" textAlign="center">
          {props.text}
        </Heading>
      </Flex>
      <div class="full-page-app-notice">
        <assistant-apps-app-notice-list
          prop:appguid={site.assistantApps.appGuid}
          prop:langcode="en"
        ></assistant-apps-app-notice-list>
      </div>
    </>
  );
};
