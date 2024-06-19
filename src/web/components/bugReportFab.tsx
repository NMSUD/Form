// prettier-ignore
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, createDisclosure } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { BugReportDto } from '@contracts/dto/forms/bugReportDto';
import { BugReportForm } from '@web/pages/bug/bugReportForm';
import { FloatingActionButton } from './common/floatingActionButton';
import { DebugNode } from './core/debugNode';

interface IProps {
  classNames?: string;
  submitBugReport: (bugReport: BugReportDto) => Promise<void>;
}

export const BugReportFAB: Component<IProps> = (props: IProps) => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <FloatingActionButton
        aria-label="Submit bug report"
        colorScheme="success"
        icon="🐞"
        onClick={onOpen}
      />
      <DebugNode name="BugReportFAB" />
      <Modal size="5xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Bug report</ModalHeader>
          <ModalBody>
            <BugReportForm submitBugReport={props.submitBugReport} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
