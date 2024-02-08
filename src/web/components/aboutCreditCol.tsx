import { Component } from 'solid-js';
import { BasicLink } from './core/link';
import { Box, Center, Flex, VStack, Image, Text } from '@hope-ui/solid';

import { AppImage } from '@constants/image';
import { FormFieldGridCell, GridItemSize } from './form/grid';

interface IAboutCreditColProps {
  imageUrl: string;
  heading: string;
  subtitle: string;
  link: string;
}

export const AboutCreditCol: Component<IAboutCreditColProps> = (props: IAboutCreditColProps) => {
  return (
    <FormFieldGridCell colSpan={GridItemSize.medium} rowSpan={GridItemSize.xsmol}>
      <BasicLink href={props.link} additionalClassNames="credit-col">
        <Box bg="rgba(150,150,150, 0.2)" borderRadius={5}>
          <Flex>
            <Center maxW="75px" maxH="75px">
              <Image
                src={props.imageUrl}
                fallbackSrc={AppImage.fallbackImg}
                maxH="100%"
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}
              />
            </Center>
            <Box
              flexGrow="1"
              minW="1px"
              bg="rgba(150,150,150, 0.2)"
              borderTopRightRadius={5}
              borderBottomRightRadius={5}
            >
              <VStack gap="0" alignItems="flex-start" px="0.5em">
                <Text pl={3} fontSize={22} mt="5px" maxW="100%" className="max-lines-1">
                  {props.heading}
                </Text>
                <Text pl={3} marginTop="3px" opacity="50%" maxW="100%" className="max-lines-1">
                  {props.subtitle}
                </Text>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </BasicLink>
    </FormFieldGridCell>
  );
};
