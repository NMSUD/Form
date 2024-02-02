import { Box, Button, Center, notificationService } from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { IFormWithApprovalResponse } from '@contracts/response/formResponse';
import { getFormStatusApiService } from '@services/api/formStatusApiService';
import { multiValidation } from '@validation/baseValidation';
import { maxLength, minLength } from '@validation/textValidation';
import { FormLongInput } from '@web/components/form/text/input';
import { SegmentDropdown, segmentValidation } from './segmentDropdown';

interface IProps {
  onFindItem: (segment: string, newItem: IFormWithApprovalResponse) => void;
}

export const SingleStatusCard: Component<IProps> = (props: IProps) => {
  const [recordId, setRecordId] = createSignal<string>('');
  const [segment, setSegment] = createSignal<Array<string>>([]);
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Pending);
  const [showValidationMessages, setShowValidationMessages] = createSignal<boolean>(false);

  const recordIdValidation = multiValidation<string>(minLength(10), maxLength(50));

  const searchAndDisplay = async (localSegment: Array<string>, localRecordId: string) => {
    const isSegmentValid = segmentValidation(localSegment);
    const isRecordIdValid = recordIdValidation(localRecordId);

    if (isSegmentValid.isValid == false || isRecordIdValid.isValid == false) {
      setShowValidationMessages(true);
      return;
    }

    setNetworkState(NetworkState.Loading);

    const dtoResult = await getFormStatusApiService().getRecordFromApi<IFormWithApprovalResponse>(
      localRecordId,
      localSegment[0],
    );
    if (dtoResult.isSuccess == false) {
      setNetworkState(NetworkState.Error);
      notificationService.show({
        status: 'danger',
        title: 'Failed to find anything',
        description: 'Please ensure the details are correct and try again.',
      });
      return;
    }

    props.onFindItem(localSegment[0], dtoResult.value);
    setNetworkState(NetworkState.Success);
  };

  return (
    <>
      <SegmentDropdown
        value={segment()}
        showValidationMessages={showValidationMessages()}
        onChange={setSegment}
      />
      <Box m={20}></Box>
      <FormLongInput
        id="recordId"
        label="Submission Id"
        placeholder="rec_cmsf0i16rt8jls8rjqcg"
        value={recordId()}
        showValidationMessages={showValidationMessages()}
        validation={(val: string | number) => recordIdValidation(val?.toString?.())}
        onChange={setRecordId}
      />
      <Box m={20}></Box>

      <Center>
        <Button
          variant="solid"
          loading={networkState() === NetworkState.Loading}
          onClick={() => searchAndDisplay(segment(), recordId())}
        >
          Search
        </Button>
      </Center>
    </>
  );
};
