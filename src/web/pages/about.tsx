// prettier-ignore
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Divider, Grid, HStack, Text, } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { AppImage, ExternalImages } from '@constants/image';
import { site } from '@constants/site';
import { AboutCreditCol } from '@web/components/aboutCreditCol';
import { PageHeader } from '@web/components/common/pageHeader';
import {
  AssistantAppsDiscordLink,
  AssistantNmsHomeLink,
  NMSUDHomeLink,
  NMSUDRepoLink,
} from '@web/components/core/link';
import { FormFieldGrid } from '@web/components/form/grid';

export const AboutPage: Component = () => {
  const headingSize = 24;
  const subHeadingSize = 18;
  return (
    <>
      <PageHeader text="About"></PageHeader>
      <Box m={25}></Box>

      <Container maxWidth="1200px" px="2em">
        <Text textAlign="center">
          Due to the success of the previous events (especially 2023), there were a huge amount of
          submissions. The submissions had to be handled manually, which included gathering more
          information on submissions, updating of the <NMSUDHomeLink /> website, planning the
          event's schedule and more. This consumed a large amount of time and effort for the small
          NMSUD organisers group.
        </Text>
        <br />
        <Text textAlign="center">
          For this year, the <NMSUDHomeLink /> has developed a system that should make it easy for
          players to submit their builds easily, provide a way for more <NMSUDHomeLink /> organisers
          to participate in managing the submissions from players and automate a lot of processes
          that were manual. abillities from <AssistantNmsHomeLink />
          &nbsp; we were able to build this tool.
        </Text>
      </Container>

      <Container my="2em" class="hidden">
        <Divider variant="dashed" />
      </Container>

      <Container class="hidden">
        <Center>
          <Text fontSize={headingSize} mb="$4">
            Frequently Asked Questsions
          </Text>
        </Center>
        <Accordion allowMultiple maxW="712px" mx="auto">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>Where does the data come from?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                The pet data comes directly from the game files. Thanks to the we can extract
                information from the game files.
              </Text>
              <Text mt={3}>
                Specifically the <b>*.DESCRIPTOR.MBIN</b> files. These files contain the parts that
                can be selected based on creature type and other selected parts.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>How do I get access?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <s>
                <Text>
                  You will need to get in contact with or <AssistantNmsHomeLink /> to get a licence
                  key.
                </Text>
              </s>
              <Text>
                <br />
                This tool is now completely free! 🥳
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>Why was access limited to select individuals?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                This was because the tool was still under construction and required a lot of
                testing. Invalid pet JSON can easily break NMS saves. We did our best to ensure that
                the tool will be safe for everyone to use.
              </Text>
              <Text mt={3}>
                We also did not (and still do not) want people abusing the tool and using it to sell
                creatures to the community.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>How do I report a bug? 🐛</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                You create an issue on the <NMSUDRepoLink />
              </Text>
              <br />
              <Text>Otherwise, you can reach out to:</Text>
              <Text>
                - <b>KhaozTopsy</b> on the <AssistantAppsDiscordLink />
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>

      <Container my="2em">
        <Divider variant="dashed" />
      </Container>

      <Container class="credit-row">
        <Text fontSize={headingSize} textAlign="center" mb="$2">
          The team
        </Text>
        <FormFieldGrid>
          <AboutCreditCol
            imageUrl={AppImage.kurt}
            heading={site.kurt.name}
            subtitle="Project Architecture & Development"
            link={site.kurt.website}
          />
          <AboutCreditCol
            imageUrl={AppImage.lenni}
            heading={site.lenni.name}
            subtitle="Software Development"
            link={site.lenni.website}
          />
          <AboutCreditCol
            imageUrl={AppImage.t3553ract}
            heading="t3553ract"
            subtitle="Data management"
            link={site.nmsud.website}
          />
        </FormFieldGrid>
        <Text fontSize={headingSize} textAlign="center" mt="$8" mb="$2">
          Supported by
        </Text>
        <FormFieldGrid>
          <AboutCreditCol
            imageUrl={ExternalImages.nmsud}
            heading="NMSUD organisers"
            subtitle="Organising events & processing submissions"
            link={site.nmsud.website}
          />
          <AboutCreditCol
            imageUrl={ExternalImages.assistantNMS}
            heading={site.assistantNMS.name}
            subtitle="Software Development"
            link={site.assistantNMS.website}
          />
          <AboutCreditCol
            imageUrl={AppImage.eisvana}
            heading={site.eisvana.name}
            subtitle="Software Development"
            link={site.eisvana.website}
          />
          <AboutCreditCol
            imageUrl={ExternalImages.nmscd}
            heading="NMSCD"
            subtitle="Github expertise and support"
            link={site.nmscd.website}
          />
        </FormFieldGrid>
      </Container>

      <Box m={100}></Box>
    </>
  );
};

export default AboutPage;
