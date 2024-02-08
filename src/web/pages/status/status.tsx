// prettier-ignore
import { Alert, AlertDescription, AlertIcon, Box, Button, Center, Container, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, createDisclosure } from "@hope-ui/solid";
import { Component, For, Match, Show, Switch, createSignal } from 'solid-js';

import { IApiSegment, segmentLabels } from '@constants/api';
import { ApprovalStatus, getFriendlyApprovalStatus } from '@constants/enum/approvalStatus';
import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { IDropdownOption } from '@contracts/dropdownOption';
import { IFormWithApprovalResponse } from '@contracts/response/formResponse';
import { getFormStatusApiService } from '@services/api/formStatusApiService';
import { getStateService } from '@services/internal/stateService';
import { PageHeader } from '@web/components/common/pageHeader';
import { CenterLoading } from '@web/components/core/loading';
import { StatusTile } from '@web/components/tile/statusTile';
import { SingleStatusCard } from './singleStatusCard';

interface IEnhancedDropdown extends IDropdownOption {
  approvalStatus: ApprovalStatus;
}

interface IRows {
  title: string;
  segment: keyof IApiSegment;
  items: Array<IEnhancedDropdown>;
}

export const StatusPage: Component = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [rows, setRows] = createSignal<Array<IRows>>([]);
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

  const loadStatusForAllItems = async () => {
    const rows: Array<IRows> = [];
    for (const seg of Object.keys(segmentLabels)) {
      const segKey = seg as keyof IApiSegment;
      const options = getStateService().getSubmissions(segKey);

      // const itemsToRemove: Array<string> = [];
      const enhancedItems: Array<IEnhancedDropdown> = [];
      for (const opt of options) {
        if (enhancedItems.filter((e) => e.value == opt.value).length > 0) {
          // itemsToRemove.push(opt.value)
          continue;
        }
        const dtoResult =
          await getFormStatusApiService().getRecordFromApi<IFormWithApprovalResponse>(
            opt.value,
            seg,
          );
        if (dtoResult.isSuccess == false) continue;
        enhancedItems.push({
          title: dtoResult.value.name,
          value: dtoResult.value.id,
          image: dtoResult.value.iconUrl ?? AppImage.fallbackImg,
          approvalStatus: dtoResult.value.approvalStatus,
        });
      }

      if (enhancedItems.length < 1) continue;

      rows.push({
        title: segmentLabels[segKey],
        segment: segKey,
        items: enhancedItems,
      });
    }

    setRows(rows);
    setNetworkState(NetworkState.Success);
  };
  loadStatusForAllItems();

  const onFindItem = (segment: string, newItem: IFormWithApprovalResponse) => {
    const dropDown: IDropdownOption = {
      title: newItem.name,
      value: newItem.id,
      image: newItem.iconUrl,
    };
    getStateService().addSubmission(segment as keyof IApiSegment, dropDown);
    setNetworkState(NetworkState.Loading);
    loadStatusForAllItems();
    onClose();
  };

  return (
    <>
      <PageHeader text="Status"></PageHeader>
      <Box m={25}></Box>

      <Container maxW="50em" mt="3em" mb="2em">
        <Alert mt="2em" status="info" variant="subtle">
          <AlertIcon mr="$2_5" />
          <AlertDescription>
            <Text>
              All submission needs to be approved and then processed by our automated systems before
              they become visible for everyone else.
            </Text>
          </AlertDescription>
        </Alert>
      </Container>

      <Switch
        fallback={
          <Container>
            <Show
              when={rows().length > 0}
              fallback={
                <Container maxW="50em" mt="3em" mb="2em">
                  <Alert mt="2em" status="warning" variant="subtle" justifyContent="center">
                    <AlertIcon mr="$2_5" />
                    <AlertDescription>No Items to display</AlertDescription>
                  </Alert>
                </Container>
              }
            >
              <For each={rows()}>
                {(row) => (
                  <Container mb="3em">
                    <Text size="2xl" textAlign="center">
                      {row.title}
                    </Text>
                    <HStack mt="$2" flexWrap="wrap" justifyContent="center">
                      <For each={row.items}>
                        {(option) => (
                          <StatusTile
                            imgUrl={option.image ?? AppImage.fallbackImg}
                            name={option.title ?? ''}
                            description={getFriendlyApprovalStatus(option.approvalStatus)}
                            actionText="❌"
                            actionTooltipText="Click this to stop tracking the status of this submission"
                            onClick={() => {
                              getStateService().delSubmission(row.segment, option.value);
                              setNetworkState(NetworkState.Loading);
                              loadStatusForAllItems();
                            }}
                          />
                        )}
                      </For>
                    </HStack>
                  </Container>
                )}
              </For>
            </Show>
          </Container>
        }
      >
        <Match when={networkState() === NetworkState.Loading}>
          <CenterLoading />
        </Match>
        <Match when={networkState() === NetworkState.Error}>
          <Container maxW="50em" mb="2em">
            <Alert mt="2em" status="danger" variant="subtle">
              <AlertIcon mr="$2_5" />
              <AlertDescription>
                <strong>Something went wrong</strong>: Please refresh the page to try again. If the
                problem persists, please reach out to us on the NMSUD Discord
              </AlertDescription>
            </Alert>
          </Container>
        </Match>
      </Switch>

      <Center>
        <Button onClick={onOpen}>Add new submission to track</Button>
      </Center>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Track form submission</ModalHeader>
          <ModalBody pb="2em">
            <SingleStatusCard onFindItem={onFindItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StatusPage;
