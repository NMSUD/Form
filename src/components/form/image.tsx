import { Avatar, Box, Center, Flex, FormControl, FormErrorMessage, FormLabel } from '@hope-ui/solid';
import { Component, createEffect, createSignal } from 'solid-js';
import { AppImage } from '../../constants/image';
import { onTargetFile } from '../../helper/eventHelper';
import { useValidation } from '../../hooks/validation';
import { IFormInputProps } from './formBuilder';

interface IFormProfileImageUrlProps extends IFormInputProps<File> {
    imageValue?: string;
}

export const FormProfileImageInput: Component<IFormProfileImageUrlProps> = (props: IFormProfileImageUrlProps) => {
    let inputRef: any;
    const [currentImage, setCurrentImage] = createSignal<File>();
    const [isValid, calcIsValid] = useValidation(props.validation);

    createEffect(() => {
        if (props.showValidationMessages === true) {
            console.log(calcIsValid(props.value));
        }
    }, [props.showValidationMessages]);

    const handleFileChange = (uploadedFile: File) => {
        setCurrentImage(uploadedFile);
        props.onChange(uploadedFile);
    };

    const getImageOrFallback = (textUrl: File, imageUrl?: string): any => {
        const uploadedFile = currentImage();
        if (uploadedFile != null) {
            return URL.createObjectURL(uploadedFile);
        }
        if (imageUrl != null) {
            return imageUrl;
        }

        if (textUrl == null) return AppImage.fallbackImg;
        // if (textUrl.length < 3) return AppImage.fallbackImg;
        return textUrl;
    }

    return (
        <Center>
            <Flex
                direction="column"
                class="img-profile-hover pointer"
                onClick={() => inputRef?.click?.()}
            >
                <FormLabel textAlign="center" for={props.id}>{props.label}</FormLabel>
                <Center>
                    <Avatar
                        mt="$3"
                        size="xl"
                        name="+"
                        borderRadius="0.25em"
                        src={getImageOrFallback(props.value, props.imageValue)}
                    />
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
