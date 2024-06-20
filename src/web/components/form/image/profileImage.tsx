import {
  Box,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  notificationService,
} from '@hope-ui/solid';
import { Component, Show, createEffect, createSignal } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { onTargetFiles } from '@helpers/eventHelper';
import { IImageParams, getImageParams } from '@helpers/imageHelper';
import { DebugNode } from '@web/components/core/debugNode';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '../../../hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { ImageParamsPopover } from './imageParamsPopover';
import { FormProfileImageLoading } from './profileImageLoading';
import { AppAnimation } from '@constants/animation';
import { IMediaUpload, MediaUploadType } from '@web/contracts/mediaUpload';

interface IFormProfileImageUrlProps extends FormInputProps<IMediaUpload> {}

const getImageOrFallback = (upload: IMediaUpload): string => {
  const imgUrl = upload?.file?.toString?.() ?? upload?.url;
  if (imgUrl == null) return AppImage.fallbackImg;
  return imgUrl;
};

export const FormProfileImageInput: Component<IFormProfileImageUrlProps> = (
  props: IFormProfileImageUrlProps,
) => {
  let inputRef: HTMLDivElement;
  const [isValid, calcIsValid] = useValidation(props.validation);

  const [currentImage, setCurrentImage] = createSignal<string>(getImageOrFallback(props.value));
  const [imageDetails, setImageDetails] = createSignal<IImageParams>();
  const [fileToProcess, setFileToProcess] = createSignal<File>();
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Success);

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid({
        type: MediaUploadType.File,
        url: '',
        file: new File([], ''),
        imageDetails: imageDetails(),
      });
    }
  }, [props.showValidationMessages]);

  createEffect(async () => {
    const localFileToProcess = fileToProcess();
    if (localFileToProcess == null) return;

    try {
      const imgWithExtraDetails = await getImageParams(localFileToProcess);
      const mediaUpload = {
        type: MediaUploadType.File,
        url: URL.createObjectURL(localFileToProcess),
        file: localFileToProcess,
        imageDetails: imgWithExtraDetails,
      };
      setCurrentImage(mediaUpload.url);
      setImageDetails(imgWithExtraDetails);
      calcIsValid(mediaUpload);
      props.onChange(mediaUpload);
      setNetworkState(NetworkState.Success);
    } catch (ex) {
      setNetworkState(NetworkState.Error);
    } finally {
      setFileToProcess(undefined);
    }
  }, [fileToProcess]);

  createEffect(() => {
    if (props.value == null) {
      // handle clear
      setCurrentImage(getImageOrFallback(props.value));
      setImageDetails(undefined);
    }
  }, [props.value]);

  const handleFileChange = async (uploadedFile: FileList) => {
    let errMsg: string | null = null;
    if (uploadedFile[0] == null) {
      errMsg = 'No files were supplied.';
      return;
    }
    if (uploadedFile.length > 1) {
      errMsg = 'Too many files were supplied.';
      return;
    }

    if (errMsg != null) {
      notificationService.show({
        status: 'danger',
        title: 'File upload error!',
        description: errMsg,
      });
      setNetworkState(NetworkState.Error);
      return;
    }

    setFileToProcess(uploadedFile[0]);
  };

  return (
    <Center flexDirection="column">
      <DebugNode name="FormProfileImageInput" />
      <Flex
        direction="column"
        class="img-profile-hover pointer"
        onClick={() => {
          inputRef?.click?.();
          setTimeout(
            () => setNetworkState(NetworkState.Loading), //
            AppAnimation.backgroundDelay,
          );
        }}
      >
        <FormLabel textAlign="center" for={props.id}>
          <HelpIconTooltip label={props.label} helpText={props.helpText} />
        </FormLabel>
        <Center h="100%">
          <FormProfileImageLoading imageUrl={currentImage()} networkState={networkState()} />
        </Center>
        <Box display="none">
          <input
            ref={(el) => (inputRef = el)}
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={onTargetFiles(handleFileChange)}
          />
        </Box>
        <Box my="$1" textAlign="center">
          <FormControl invalid={!isValid().isValid}>
            <FormErrorMessage textAlign="center">{isValid().errorMessage}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>
      <Show when={imageDetails() != null}>
        <ImageParamsPopover imageDetails={imageDetails()} />
      </Show>
    </Center>
  );
};
