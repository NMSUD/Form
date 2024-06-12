import {
  Alert,
  AlertDescription,
  AlertIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressIndicator,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  createDisclosure,
  notificationService,
} from '@hope-ui/solid';
import { Component, For, Show, createEffect, createSignal, JSX } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { onTargetFiles, onTargetValue } from '@helpers/eventHelper';
import { IImageParams, getImageParams } from '@helpers/imageHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '../../../hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { FormLongInput } from '../text/input';
import { minLength, shouldBeUrl, shouldBeYoutubeUrl } from '@validation/textValidation';
import { multiValidation } from '@validation/baseValidation';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';
import { getLog } from '@services/internal/logService';
import { WrapWhen } from '@web/components/common/wrapWhen';
import { OpenInNewIcon } from '@web/components/common/icon/openInNewIcon';
import { makeArrayOrDefault } from '@helpers/arrayHelper';

interface IFormMediaUploadProps extends FormInputProps<Array<IMediaUpload>> {
  maxUploads?: number;
}

export const FormMediaUploadInput: Component<IFormMediaUploadProps> = (
  props: IFormMediaUploadProps,
) => {
  let inputRef: HTMLDivElement;
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [isValid, calcIsValid] = useValidation(props.validation);

  const [uploads, setUploads] = createSignal<Array<IMediaUpload>>(props.value);
  const [externalImageUrl, setExternalImageUrl] = createSignal<string>('');
  const [externalVideoUrl, setExternalVideoUrl] = createSignal<string>('');
  const [filesToProcess, setFilesToProcess] = createSignal<Array<File>>();
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Success);

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid(uploads());
    }
  }, [props.showValidationMessages]);

  createEffect(() => {
    if (props.value == null || props.value.length === 0) {
      setUploads([]);
    }
  }, [props.value]);

  createEffect(async () => {
    const localFilesToProcess = filesToProcess();
    if (localFilesToProcess == null) return;

    const newUploads: Array<IMediaUpload> = [];
    for (const localFileToProcess of localFilesToProcess) {
      try {
        const imgPreview = URL.createObjectURL(localFileToProcess);
        const imgWithExtraDetails = await getImageParams(localFileToProcess);
        newUploads.push({
          type: MediaUploadType.File,
          url: imgPreview,
          file: localFileToProcess,
          imageDetails: imgWithExtraDetails,
        });
      } catch (ex) {
        notificationService.show({
          status: 'danger',
          title: 'Image upload upload error!',
          description: `"${localFileToProcess.name ?? 'unknown name'}" caused an error! Can you try again?`,
        });
      }
    }

    try {
      calcIsValid(newUploads);
      setUploads((prev) => {
        const allMediaUploads = [...makeArrayOrDefault(prev), ...newUploads];
        props.onChange(allMediaUploads.filter((mu) => mu.type !== MediaUploadType.File));
        return allMediaUploads;
      });
      setNetworkState(NetworkState.Success);
    } catch (ex) {
      setNetworkState(NetworkState.Error);
      getLog().e(ex);
      notificationService.show({
        status: 'danger',
        title: 'Error processing uploads!',
        description: 'Something went wrong when processing all the uploaded items.',
      });
    } finally {
      setFilesToProcess(undefined);
      closeModalAndClearInputs();
    }
  }, [filesToProcess]);

  const handleFilesUpload = async (uploadedFiles: FileList) => {
    setNetworkState(NetworkState.Loading);
    const files: Array<File> = [];
    for (let fileIndex = 0; fileIndex < uploadedFiles.length; fileIndex++) {
      const uploadedFile = uploadedFiles[fileIndex];
      files.push(uploadedFile);
    }
    setFilesToProcess(files);
  };

  const handleExternalUrl = async (type: MediaUploadType, url: string) => {
    setUploads((prev: Array<IMediaUpload>) => {
      const allMediaUploads = [
        ...makeArrayOrDefault(prev),
        {
          type,
          url: url,
        },
      ];
      props.onChange(allMediaUploads);
      return allMediaUploads;
    });
    closeModalAndClearInputs();
  };

  const closeModalAndClearInputs = () => {
    setExternalImageUrl('');
    setExternalVideoUrl('');
    onClose();
  };

  const renderMediaUpload = (data: IMediaUpload): JSX.Element => {
    if (data.type === MediaUploadType.ImageUrl) {
      return (
        <Avatar name={data.url} src={data.url} maxWidth="3em" maxHeight="3em" borderRadius="5px" />
      );
    }
    if (data.type === MediaUploadType.VideoUrl) {
      return (
        <Center backgroundColor="$neutral6" borderRadius="5px">
          <Anchor href={data.url} external px="1em">
            Video <OpenInNewIcon />
          </Anchor>
        </Center>
      );
    }
    if (data.type === MediaUploadType.File) {
      return (
        <Flex flexDirection="row" backgroundColor="$neutral6" borderRadius="5px">
          <Avatar
            flex={1}
            mr="$2"
            name={data.url}
            src={data.url}
            maxWidth="3em"
            maxHeight="3em"
            borderRadius="5px"
          />
          <Center flex={4} maxWidth="10em" overflow="hidden">
            <WrapWhen
              condition={data.file?.name != null}
              wrapComp={Tooltip}
              wrapProps={{ label: data.file?.name }}
            >
              <Text class="max-lines-1">{data.file?.name ?? 'unknown name'}</Text>
            </WrapWhen>
          </Center>
        </Flex>
      );
    }
    return <Text>unknown upload type</Text>;
  };

  return (
    <>
      <FormControl invalid={!isValid().isValid}>
        <FormLabel textAlign="center" for={props.id}>
          <span>{props.label}</span>
          <span>
            &nbsp;
            <Show when={(props.maxUploads ?? 0) > 0}>
              ({(uploads() ?? []).length}&nbsp;/&nbsp;{props.maxUploads ?? 0})
            </Show>
          </span>
          <HelpIconTooltip helpText={props.helpText} />
        </FormLabel>
        <Flex gap="$2" flexWrap="wrap">
          <Button colorScheme="warning" onClick={onOpen}>
            Upload
          </Button>
          <For each={uploads()}>{(data) => renderMediaUpload(data)}</For>
          <Show when={networkState() === NetworkState.Loading}>
            <CircularProgress indeterminate>
              <CircularProgressIndicator />
            </CircularProgress>
          </Show>
        </Flex>
        <Show when={!isValid().isValid}>
          <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
        </Show>
      </FormControl>
      <Modal size="5xl" opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Upload media</ModalHeader>
          <ModalBody pt="1em" pb="5em">
            <Center>
              <Button onClick={() => inputRef?.click?.()}>Upload image</Button>
            </Center>

            <Text textAlign="center" mt="2em" mb="1em">
              Or
            </Text>

            <Flex direction="row" gap="1em">
              <FormLongInput
                id="hostedImage"
                label="Image url"
                value={externalImageUrl()}
                placeholder="https://i.imgur.com/aKaOqIh.gif"
                onChange={setExternalImageUrl}
                showValidationMessages={false}
                validation={(url) => {
                  const validationFunc = multiValidation(shouldBeUrl, minLength(10));
                  return validationFunc((url ?? '').toString());
                }}
              />
              <Button
                variant="solid"
                mt="1.5em"
                onClick={() => handleExternalUrl(MediaUploadType.ImageUrl, externalImageUrl())}
              >
                Add
              </Button>
            </Flex>

            <Text textAlign="center" mt="2em" mb="1em">
              Or
            </Text>

            <Flex direction="row" gap="1em">
              <FormLongInput
                id="youtubeUrl"
                label="Youtube video url"
                value={externalVideoUrl()}
                placeholder="https://www.youtube.com/watch?v=XXX"
                onChange={setExternalVideoUrl}
                showValidationMessages={false}
                validation={(url) => {
                  const validationFunc = multiValidation(shouldBeUrl, shouldBeYoutubeUrl);
                  return validationFunc((url ?? '').toString());
                }}
              />
              <Button
                variant="solid"
                mt="1.5em"
                onClick={() => handleExternalUrl(MediaUploadType.VideoUrl, externalVideoUrl())}
              >
                Add
              </Button>
            </Flex>

            <Box display="none">
              <input
                ref={(el) => (inputRef = el)}
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={onTargetFiles(handleFilesUpload)}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
