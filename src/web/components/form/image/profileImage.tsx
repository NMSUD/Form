import { Box, Center, Flex, FormControl, FormErrorMessage, FormLabel } from '@hope-ui/solid';
import { Component, createEffect, createSignal } from 'solid-js';

import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { onTargetFile } from '@helpers/eventHelper';
import { IImageParams, getImageParams } from '@helpers/imageHelper';
import { FormInputProps } from '@web/contracts/formTypes';
import { useValidation } from '../../../hooks/useValidation';
import { HelpIconTooltip } from '../helpIcon/helpIconTooltip';
import { FormProfileImageLoading } from './profileImageLoading';

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
      setCurrentImage(getImageOrFallback(props.value, props.imageValue));
    }
  }, [props.value]);

  const handleFileChange = async (uploadedFile: File) => {
    setNetworkState(NetworkState.Loading);
    setFileToProcess(uploadedFile);
  };

  return (
    <Center>
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
            onChange={onTargetFile(handleFileChange)}
          />
        </Box>
        <Box mt="$3" textAlign="center">
          <FormControl invalid={!isValid().isValid}>
            <FormErrorMessage textAlign="center">{isValid().errorMessage}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>
    </Center>
  );
};
