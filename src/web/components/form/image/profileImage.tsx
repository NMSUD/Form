import {
  Box,
  Button,
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
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '../../../hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { FormProfileImageLoading } from './profileImageLoading';
import { InfoIcon } from '@web/components/common/icon/infoIcon';
import { ImageParamsPopover } from './imageParamsPopover';

interface IFormProfileImageUrlProps extends FormInputProps<File> {
  imageValue?: string;
}

const getImageOrFallback = (textUrl: File, imageUrl?: string): string => {
  if (imageUrl != null) {
    return imageUrl;
  }

  if (textUrl == null) return AppImage.fallbackImg;
  // if (textUrl.length < 3) return AppImage.fallbackImg;
  return textUrl?.toString?.();
};

export const FormProfileImageInput: Component<IFormProfileImageUrlProps> = (
  props: IFormProfileImageUrlProps,
) => {
  let inputRef: HTMLDivElement;
  const [isValid, calcIsValid] = useValidation(props.validation);

  const [currentImage, setCurrentImage] = createSignal<string>(
    getImageOrFallback(props.value, props.imageValue),
  );
  const [imageDetails, setImageDetails] = createSignal<IImageParams>();
  const [fileToProcess, setFileToProcess] = createSignal<File>();
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Success);

  createEffect(() => {
    if (props.showValidationMessages === true) {
      calcIsValid({
        ...new File([], ''),
        ...imageDetails(),
      });
    }
  }, [props.showValidationMessages]);

  createEffect(async () => {
    const localFileToProcess = fileToProcess();
    if (localFileToProcess == null) return;

    try {
      setCurrentImage(URL.createObjectURL(localFileToProcess));
      const imgWithExtraDetails = await getImageParams(localFileToProcess);
      setImageDetails(imgWithExtraDetails);
      calcIsValid({
        ...localFileToProcess,
        ...imgWithExtraDetails,
      });
      props.onChange(localFileToProcess);
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
      setCurrentImage(getImageOrFallback(props.value, props.imageValue));
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
    }
    setNetworkState(NetworkState.Loading);
    setFileToProcess(uploadedFile[0]);
  };

  return (
    <Center flexDirection="column">
      <Flex
        direction="column"
        class="img-profile-hover pointer"
        onClick={() => inputRef?.click?.()}
      >
        <FormLabel textAlign="center" for={props.id}>
          {props.label}
          <HelpIconTooltip helpText={props.helpText} />
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
