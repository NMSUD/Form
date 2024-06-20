// prettier-ignore
import { Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Text, createDisclosure, notificationService } from '@hope-ui/solid';
import { Component, For, Match, Show, Switch, createEffect, createSignal } from 'solid-js';

import { AppAnimation } from '@constants/animation';
import { NetworkState } from '@constants/enum/networkState';
import { minUrlLength } from '@constants/validation';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { onTargetFiles } from '@helpers/eventHelper';
import { getImageParams } from '@helpers/imageHelper';
import { getLog } from '@services/internal/logService';
import { multiValidation } from '@validation/baseValidation';
import { minLength, shouldBeUrl, shouldBeYoutubeUrl } from '@validation/textValidation';
import { Card } from '@web/components/common/card';
import { ImageIcon } from '@web/components/common/icon/imageIcon';
import { UploadIcon } from '@web/components/common/icon/uploadIcon';
import { VideoIcon } from '@web/components/common/icon/videoIcon';
import { DebugNode } from '@web/components/core/debugNode';
import { LoadingSpinner } from '@web/components/core/loading';
import { FormInputProps } from '@web/contracts/formTypes';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';
import { useValidation } from '../../../hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { FormLongInput } from '../text/input';
import { FormMediaUploadItem } from './mediaUploadItem';

interface IFormMediaUploadProps extends FormInputProps<Array<IMediaUpload>> {
  maxUploads?: number;
}

export const FormMediaUploadInput: Component<IFormMediaUploadProps> = (
  props: IFormMediaUploadProps,
) => {
  let inputRef: HTMLDivElement;
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [isValid, calcIsValid] = useValidation(props.validation);

  const [uploads, setUploads] = createSignal<Array<IMediaUpload>>(
    makeArrayOrDefault(props.value).filter((mu) => mu.type != MediaUploadType.File),
  );
  const [selectedCard, setSelectedCard] = createSignal<string>('');
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
      setUploads((prev) => {
        const allMediaUploads = [...makeArrayOrDefault(prev), ...newUploads];
        props.onChange(allMediaUploads);
        calcIsValid(allMediaUploads);
        return allMediaUploads;
      });
      setNetworkState(NetworkState.Success);
    } catch (ex) {
      setNetworkState(NetworkState.Error);
      getLog().e('Media upload exception', ex);
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
      calcIsValid(allMediaUploads);
      props.onChange(allMediaUploads);
      return allMediaUploads;
    });
    closeModalAndClearInputs();
  };

  const closeModalAndClearInputs = () => {
    setExternalImageUrl('');
    setExternalVideoUrl('');
    setNetworkState(NetworkState.Pending);
    onClose();
  };

  const removeItem = (index: number) => () => {
    setUploads((prev) => {
      const local = [...prev];
      local.splice(index, 1);
      props.onChange(local);
      calcIsValid(local);
      return local;
    });
  };

  const getLabel = (localProps: IFormMediaUploadProps) => {
    if ((props.maxUploads ?? 0) <= 0) {
      return localProps.label;
    }

    return `${localProps.label} (${(uploads() ?? []).length} / ${props.maxUploads ?? 0})`;
  };

  return (
    <>
      <FormControl invalid={!isValid().isValid}>
        <DebugNode name="FormMediaUploadInput" />
        <FormLabel textAlign="center" for={props.id}>
          <HelpIconTooltip label={getLabel(props)} helpText={props.helpText} />
        </FormLabel>
        <Flex gap="$2" flexWrap="wrap">
          <Button colorScheme="warning" onClick={onOpen}>
            Upload
          </Button>
          <For each={uploads()}>
            {(data, index) => (
              <FormMediaUploadItem upload={data} removeItem={removeItem(index())} />
            )}
          </For>
        </Flex>
        <Show when={!isValid().isValid}>
          <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
        </Show>
      </FormControl>
      <Modal size="5xl" opened={isOpen()} onClose={closeModalAndClearInputs}>
        <ModalOverlay />
        <ModalContent
          onClick={() => {
            if (filesToProcess() == null) {
              setNetworkState(NetworkState.Pending);
            }
          }}
        >
          <ModalCloseButton />
          <ModalHeader>Upload media</ModalHeader>
          <ModalBody pt="1em" pb="2em">
            <SimpleGrid columns={3} gap="10px">
              <Card class="pointer">
                <Center
                  flexDirection="column"
                  justifyContent="center"
                  height="100%"
                  onClick={() => {
                    inputRef?.click?.();
                    setTimeout(
                      () => setNetworkState(NetworkState.Loading),
                      AppAnimation.backgroundDelay,
                    );
                  }}
                >
                  <Switch>
                    <Match when={networkState() !== NetworkState.Loading}>
                      <UploadIcon font-size="7em" opacity="0.7" />
                      <Text>Upload image</Text>
                    </Match>
                    <Match when={networkState() === NetworkState.Loading}>
                      <LoadingSpinner />
                    </Match>
                  </Switch>
                </Center>
              </Card>
              <Card class="pointer">
                <Center flexDirection="column" onClick={() => setSelectedCard('imageUrl')}>
                  <ImageIcon font-size="7em" opacity="0.7" />
                  <Text>Enter image url</Text>
                </Center>
              </Card>
              <Card class="pointer">
                <Center flexDirection="column" onClick={() => setSelectedCard('videoUrl')}>
                  <VideoIcon font-size="7em" opacity="0.7" />
                  <Text>Enter video url</Text>
                </Center>
              </Card>
            </SimpleGrid>

            <Show when={selectedCard() === 'imageUrl'}>
              <Flex direction="row" gap="1em" mt="2em">
                <FormLongInput
                  id="hostedImage"
                  label="Image url"
                  value={externalImageUrl()}
                  placeholder="https://i.imgur.com/aKaOqIh.gif"
                  onChange={setExternalImageUrl}
                  showValidationMessages={false}
                  validation={(url) => {
                    const validationFunc = multiValidation(shouldBeUrl, minLength(minUrlLength));
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
            </Show>

            <Show when={selectedCard() === 'videoUrl'}>
              <Flex direction="row" gap="1em" mt="2em">
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
            </Show>

            <input
              ref={(el) => (inputRef = el)}
              id="file-upload"
              type="file"
              accept="image/*"
              class="hidden"
              multiple
              onChange={onTargetFiles(handleFilesUpload)}
            />

            <HStack mt="2em" justifyContent="center">
              <Button variant="outline" colorScheme="warning" onClick={closeModalAndClearInputs}>
                Cancel
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
