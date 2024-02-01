import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
  VStack,
  notificationService,
} from '@hope-ui/solid';
import { useParams } from '@solidjs/router';
import { Component, Show, createEffect, createSignal } from 'solid-js';

import { apiParams, IApiSegment } from '@constants/api';
import { getFriendlyApprovalStatus } from '@constants/enum/approvalStatus';
import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { IFormWithApprovalResponse } from '@contracts/response/formResponse';
import { addSpacesForEnum, capitalizeFirstLetter } from '@helpers/stringHelper';
import { getFormStatusApiService } from '@services/api/formStatusApiService';
import { minItems, selectedItemsExist } from '@validation/arrayValidation';
import { multiValidation } from '@validation/baseValidation';
import { maxLength, minLength } from '@validation/textValidation';
import { Card } from '../components/common/card';
import { PageHeader } from '../components/common/pageHeader';
import { FormDropdown } from '../components/form/dropdown/dropdown';
import { FormLongInput } from '../components/form/text/input';

const segmentObj: IApiSegment = {
  community: 'community',
  builder: 'builder',
};
const segmentOptions = Object.keys(segmentObj).map((seg) => ({
  title: capitalizeFirstLetter(addSpacesForEnum(seg)),
  value: seg,
}));

export const StatusPage: Component = () => {
  const params = useParams();

  const [recordId, setRecordId] = createSignal<string>('');
  const [segment, setSegment] = createSignal<Array<string>>([]);
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
  const [showValidationMessages, setShowValidationMessages] = createSignal<boolean>(false);
  const [formResponse, setFormResponse] = createSignal<IFormWithApprovalResponse>();
  const [showResponse, setShowResponse] = createSignal<boolean>(false);

  createEffect(() => {
    const localRecordId = params[apiParams.status.id];
    const localSegment = params[apiParams.status.segment];

    if (localRecordId != null || localSegment != null) {
      setRecordId(localRecordId);
      setSegment([localSegment]);
      searchAndDisplay([localSegment], localRecordId);
      return;
    }
    setNetworkState(NetworkState.Success);
  }, params);

  const segmentValidation = multiValidation<Array<string>>(
    minItems(1),
    selectedItemsExist(Object.keys(segmentObj)),
  );

  const recordIdValidation = multiValidation<string>(minLength(10), maxLength(50));

  const searchAndDisplay = async (localSegment: Array<string>, localRecordId: string) => {
    const isSegmentValid = recordIdValidation(localRecordId);
    const isRecordIdValid = segmentValidation(localSegment);

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

    setFormResponse(dtoResult.value);
    setNetworkState(NetworkState.Success);
    setShowResponse(true);
  };

  const getImageFromFormResponse = (local?: IFormWithApprovalResponse): string => {
    return AppImage.fallbackImg;
  };

  return (
    <>
      <PageHeader text="Status"></PageHeader>
      <Box m={100}></Box>

      <Container maxW="30em">
        <Card class="form">
          <FormDropdown
            id="segment"
            label="From type"
            placeholder="Select the form type"
            value={segment()}
            options={segmentOptions}
            showValidationMessages={showValidationMessages()}
            validation={segmentValidation}
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

          <Show
            when={showResponse() == true}
            fallback={
              <Center>
                <Button
                  variant="solid"
                  loading={networkState() === NetworkState.Loading}
                  onClick={() => searchAndDisplay(segment(), recordId())}
                >
                  Submit
                </Button>
              </Center>
            }
          >
            <Box m={30}></Box>
            <HStack
              bg="$loContrast"
              rounded="$md"
              border="1px solid $neutral7"
              shadow="$lg"
              p="$4"
              w="$full"
            >
              <Avatar
                name="approval status icon"
                src={getImageFromFormResponse(formResponse())}
                mr="$3"
              />
              <VStack alignItems="flex-start">
                <Text size="sm" fontWeight="$medium">
                  {capitalizeFirstLetter(segment()?.[0] ?? '')}: {formResponse()?.name}
                </Text>
                <Text size="sm" color="$neutral11">
                  {getFriendlyApprovalStatus(formResponse()?.approvalStatus)}
                </Text>
              </VStack>
              <Button
                variant="ghost"
                colorScheme="accent"
                size="sm"
                ml="auto"
                onClick={() => setShowResponse(false)}
              >
                Reset
              </Button>
            </HStack>
          </Show>
        </Card>
      </Container>
    </>
  );
};

export default StatusPage;
