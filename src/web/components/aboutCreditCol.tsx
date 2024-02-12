import { Component, Match, Switch, createSignal } from 'solid-js';
import { BasicLink } from './core/link';
import { Box, Center, Flex, VStack, Image, Text } from '@hope-ui/solid';

import { AppImage } from '@constants/image';
import { FormFieldGridCell, GridItemSize } from './form/grid';
import { LoadingSpinner } from './core/loading';
import { NetworkState } from '@constants/enum/networkState';

interface IAboutCreditColProps {
  imageUrl: string;
  heading: string;
  subtitle: string;
  link: string;
}

export const AboutCreditCol: Component<IAboutCreditColProps> = (props: IAboutCreditColProps) => {
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
  return (
    <FormFieldGridCell colSpan={GridItemSize.medium} rowSpan={GridItemSize.xsmol}>
      <BasicLink href={props.link} additionalClassNames="credit-col">
        <Box bg="rgba(150,150,150, 0.2)" borderRadius={5}>
          <Flex>
            <Center width="75px" height="75px">
              <Switch
                fallback={
                  <Image
                    src={props.imageUrl}
                    fallback={<LoadingSpinner />}
                    maxH="100%"
                    borderTopLeftRadius={5}
                    borderBottomLeftRadius={5}
                    onLoad={() => setNetworkState(NetworkState.Success)}
                    onError={() => setNetworkState(NetworkState.Error)}
                  />
                }
              >
                <Match when={networkState() === NetworkState.Error}>
                  <Image
                    src={AppImage.failedToLoadImg}
                    maxH="100%"
                    borderTopLeftRadius={5}
                    borderBottomLeftRadius={5}
                  />
                </Match>
              </Switch>
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
