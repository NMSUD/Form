import { Box, Center, Divider, ElementType, Flex, Heading, IconButton, Image, Text, TextProps, VStack } from '@hope-ui/solid';
import { Component, For, createSignal } from 'solid-js';

import { Link } from '@solidjs/router';
import { routes, traverseRoutes } from '../../constants/route';
import { SidebarNavLink } from './sidebarNavLink';
import { getConfig } from '../../services/internal/configService';

export const Sidebar: Component = () => {
    const [isOpen, setIsOpen] = createSignal(false);

    const SidebarTitle = <C extends ElementType = "p">(props: TextProps<C>) => {
        return (
            <Text
                fontSize="$sm"
                fontWeight="$bold"
                textTransform="uppercase"
                mb="$2"
                {...props}
            />
        );
    }

    const menuItems: Array<{ route: string, title: string }> = [];
    traverseRoutes(routes, (routeData: any) => {
        if (routeData?.showInSidebar === true) {
            menuItems.push({ route: routeData.sidebarPath, title: routeData.title });
        }
    })

    return (
        <Flex
            as="nav"
            class={isOpen() ? 'hide-scrollbar noselect close' : 'hide-scrollbar noselect expand'}
            position="sticky"
            display="flex"
            direction="column"
            flexShrink="0"
            width={isOpen() ? '$72' : '$10'}
            height="100vh"
            p={isOpen() ? '$6' : '0'}
        >
            <>
                <Box class="content" opacity={isOpen() ? '1' : '0'}>
                    <Box position="relative">
                        <Link href={routes.home.path}>
                            <Flex>
                                <Image src="/assets/img/logo.png" alt="logo" width="25%" />
                                <Box m="$2" />
                                <Center>
                                    <Heading>NMSUD<br />Submissions</Heading>
                                </Center>
                            </Flex>
                            <Box m={20} />
                            <Divider />
                        </Link>
                        <Text class='version'>v{getConfig().packageVersion() ?? '0.0.0'}</Text>
                    </Box>
                    <Box m={20} />
                    <SidebarTitle>Quick links</SidebarTitle>
                    <VStack alignItems="flex-start" spacing="$1" mb="$6">
                        <SidebarNavLink href={routes.actualHome.path}>Home</SidebarNavLink>

                        <For each={menuItems}>
                            {(menuItem) => (
                                <SidebarNavLink href={menuItem.route}>{menuItem.title}</SidebarNavLink>
                            )}
                        </For>
                    </VStack>
                    <Box m={20} />
                </Box>
                <IconButton
                    colorScheme="primary"
                    aria-label="Close drawer"
                    borderRadius="2em"
                    class={isOpen() ? 'drawer-icon close' : 'drawer-icon expand'}
                    onClick={() => setIsOpen(!isOpen())}
                    icon={<span>☰</span>}
                />
            </>
        </Flex>
    );
}