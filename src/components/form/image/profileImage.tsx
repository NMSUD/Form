import { Avatar, Box, Center, Flex, FormControl, FormErrorMessage, FormLabel, Icon } from '@hope-ui/solid';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { NetworkState } from '../../../constants/enum/networkState';
import { AppImage } from '../../../constants/image';
import { onTargetFile } from '../../../helper/eventHelper';
import { IImageParams, getImageParams } from '../../../helper/imageHelper';
import { useValidation } from '../../../hooks/validation';
import { LoadingSpinner } from '../../core/loading';
import { IFormInputProps } from '../formBuilder';
import { HelpIcon } from '../helpIcon/helpIcon';

interface IFormProfileImageUrlProps extends IFormInputProps<File> {
    imageValue?: string;
}

const getImageOrFallback = (textUrl: File, imageUrl?: string): any => {
    if (imageUrl != null) {
        return imageUrl;
    }

    if (textUrl == null) return AppImage.fallbackImg;
    // if (textUrl.length < 3) return AppImage.fallbackImg;
    return textUrl;
}

export const FormProfileImageInput: Component<IFormProfileImageUrlProps> = (props: IFormProfileImageUrlProps) => {
    let inputRef: any;
    const [currentImage, setCurrentImage] = createSignal<string>(getImageOrFallback(props.value, props.imageValue));
    const [imageDetails, setImageDetails] = createSignal<IImageParams>();
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Success);
    const [isValid, calcIsValid] = useValidation(props.validation);

    createEffect(() => {
        if (props.showValidationMessages === true) {
            calcIsValid(imageDetails() as any);
        }
    }, [props.showValidationMessages]);

    const handleFileChange = async (uploadedFile: File) => {
        setNetworkState(NetworkState.Loading);

        setTimeout(async () => {
            try {
                setCurrentImage(URL.createObjectURL(uploadedFile));
                const imgWithExtraDetails = await getImageParams(uploadedFile);
                setImageDetails(imgWithExtraDetails);
                calcIsValid(imgWithExtraDetails as any);
                props.onChange(uploadedFile);
                setNetworkState(NetworkState.Success);
            } catch (ex) {
                setNetworkState(NetworkState.Error);
            }
        }, 200);
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
                    <HelpIcon helpText={props.helpText} />
                </FormLabel>
                <Center h="100%">
                    <Switch
                        fallback={(
                            <Avatar
                                mt="$3"
                                size="xl"
                                name="+"
                                borderRadius="0.25em"
                                src={currentImage()}
                            />
                        )}
                    >
                        <Match when={networkState() === NetworkState.Loading}>
                            <Box pt="2em"><LoadingSpinner /></Box>
                        </Match>
                        <Match when={networkState() === NetworkState.Error}>
                            <Icon />
                        </Match>
                    </Switch>
                </Center>
                <Box display="none">
                    <input
                        ref={el => inputRef = el}
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={onTargetFile(handleFileChange)}
                    />
                </Box>
                <Box mt="$3" textAlign="center">
                    <FormControl invalid={!isValid().isValid}>
                        <FormErrorMessage>{isValid().errorMessage}</FormErrorMessage>
                    </FormControl>
                </Box>
            </Flex>
        </Center>
    );
};
