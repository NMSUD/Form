
import { Avatar, Box, Center, Flex, FormControl, FormErrorMessage, FormLabel, Spacer } from '@hope-ui/solid';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { AppImage } from '../../constants/image';
import { ValidationResult } from '../../contracts/validationResult';
import { useValidation } from '../../hooks/validation';

interface IFormProfileImageUrlProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string;
    imageValue?: string;
    showValidationMessages?: boolean;
    onChange: (newValue: string) => void;
    validation?: (value: string) => ValidationResult;
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

    const handleFileChange = (event: any) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            console.log(fileList[0])
            setCurrentImage(fileList[0]);
        } else {
            setCurrentImage(undefined);
        }
    };

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        props.onChange(value);
    }

    const getImageOrFallback = (textUrl: string, imageUrl?: string): any => {
        if (currentImage() != null) {
            return currentImage();
        }
        if (imageUrl != null) {
            return imageUrl;
        }

        if (textUrl == null) return AppImage.fallbackImg;
        if (textUrl.length < 3) return AppImage.fallbackImg;
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
                        src={getImageOrFallback(props.value, props.imageValue)}
                    />
                </Center>
                <Box display="none">
                    <input
                        ref={el => inputRef = el}
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
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
