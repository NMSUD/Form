// prettier-ignore
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, createDisclosure } from '@hope-ui/solid';

import { BugReportForm } from '@web/pages/bug/bugReportForm';
import { FloatingActionButton } from './common/floatingActionButton';

interface IProps {}

export const BugReportFAB = (props: IProps) => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <FloatingActionButton
        aria-label="Submit bug report"
        colorScheme="warning"
        icon="🐛 Report"
        onClick={onOpen}
      />
      <Modal size="5xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Bug report</ModalHeader>
          <ModalBody>
            <BugReportForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
