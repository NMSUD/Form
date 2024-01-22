
import { Avatar, Center, Flex, FormLabel, Spacer } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { AppImage } from '../../constants/image';

interface IFormProfileImageUrlProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string;
    imageValue?: string;
    onChange: (newValue: string) => void;
}

export const FormProfileImageInput: Component<IFormProfileImageUrlProps> = (props: IFormProfileImageUrlProps) => {

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        props.onChange(value);
    }

    const getImageOrFallback = (textUrl: string, imageUrl?: string) => {
        if (imageUrl != null) {
            return imageUrl;
        }

        if (textUrl == null) return AppImage.fallbackImg;
        if (textUrl.length < 3) return AppImage.fallbackImg;
        return textUrl;
    }

    return (
        <Center>
            <Flex direction="column" class="img-profile-hover pointer">
                <FormLabel for={props.id}>{props.label}</FormLabel>
                <Avatar
                    mt="$3"
                    size="xl"
                    name="+"
                    src={getImageOrFallback(props.value, props.imageValue)}
                />
            </Flex>
        </Center>
    );
};
