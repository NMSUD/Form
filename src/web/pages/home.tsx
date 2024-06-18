import { Box, Container, Divider, HStack, Image, Spacer, Text, VStack } from '@hope-ui/solid';
import { Link, useNavigate } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';

import { AppImage } from '@constants/image';
import { routes } from '@constants/route';
import { site } from '@constants/site';
import { Card } from '@web/components/common/card';
import { OpenInNewIcon } from '@web/components/common/icon/openInNewIcon';
import { PageHeader } from '@web/components/common/pageHeader';
import { BasicLink } from '@web/components/core/link';
import { CenterLoading } from '@web/components/core/loading';
import classNames from 'classnames';

export const HomePage: Component = () => {
  const headingSize = 30;
  const subHeadingSize = 24;

  const steps = [
    {
      image: AppImage.homeForm,
      heading: 'Fill in a form',
      description:
        'Choose one of the available forms and fill in all the details! You can upload your images or link to images that are on external websites (like imgur.com).',
      action: {
        title: 'Get started',
        url: routes.form.community.sidebarPath,
      },
    },
    {
      image: AppImage.homePendingApproval,
      heading: 'Wait for approval',
      description:
        'Our team will verify your submission! We may reach out if there have any issues with your submission or if we have questions.',
      action: {
        title: 'View the status of your submissions',
        url: routes.status.sidebarPath,
      },
    },
    {
      image: AppImage.homeGeneratedWebsite,
      heading: 'Automation',
      description:
        'Once your submission is approved, then our little worker bots will use the submission to generate pages on our website and make the data consumable for others to integrate with.',
      action: {
        title: 'View the data',
        url: site.nmsud.website,
        external: true,
      },
    },
    {
      image: AppImage.homeFavourite,
      heading: 'Spotlight',
      description:
        'Our team will work with Communities & Builders who submitted to feature/spotlight unique builds.',
    },
  ];

  return (
    <>
      <PageHeader text="Welcome to the NMSUD submission page!"></PageHeader>
      <Box m={50}></Box>

      <Card class="form">
        <Text textAlign="center" fontSize={headingSize} mb="$5">
          Overview of the process
        </Text>

        <Container mt="1em" mb="2em">
          <Divider variant="dashed" />
        </Container>

        <For each={steps}>
          {(step, index) => (
            <HStack
              py="$2"
              class={classNames('step', {
                flipped: index() % 2,
              })}
            >
              <Spacer class="hidden-in-mobile" flex={1} order="0" />
              <Image flex={2} class="image" src={step.image} w="15vw" />
              <VStack class="text" flex={4} alignItems="flex-start">
                <Text fontSize={subHeadingSize} mb="$3" borderBottom="1px dashed darkgrey">
                  {step.heading}
                </Text>
                <Text>{step.description}</Text>
                <Show when={step.action != null}>
                  <Show
                    when={!step.action!.external}
                    fallback={
                      <BasicLink href={step.action!.url}>
                        <Text mt="$2">
                          {step.action?.title} <OpenInNewIcon />
                        </Text>
                      </BasicLink>
                    }
                  >
                    <Link href={step.action!.url}>
                      <Text mt="$2">{step.action?.title} &gt;&gt;</Text>
                    </Link>
                  </Show>
                </Show>
              </VStack>
              <Spacer class="hidden-in-mobile" flex={1} order="3" />
            </HStack>
          )}
        </For>
      </Card>

      <Box p={50}></Box>
    </>
  );
};

export const RedirectToHome: Component = () => {
  const navigate = useNavigate();
  navigate(routes.actualHome.path);

  return <CenterLoading />;
};
