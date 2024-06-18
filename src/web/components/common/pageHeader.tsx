import { Flex, Heading } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { site } from '@constants/site';
import { getDocumentServ } from '@services/internal/documentService';

interface IProps {
  text: string;
}

export const PageHeader: Component<IProps> = (props: IProps) => {
  getDocumentServ().setDocumentTitle(props.text);
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
