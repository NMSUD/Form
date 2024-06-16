// prettier-ignore
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Divider, Image, List, ListItem, Text, UnorderedList, } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { AppImage, ExternalImages } from '@constants/image';
import { site } from '@constants/site';
import { AboutCreditCol } from '@web/components/aboutCreditCol';
import { PageHeader } from '@web/components/common/pageHeader';
import {
  AssistantAppsDiscordLink,
  AssistantNmsHomeLink,
  NMSUDDiscordLink,
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
          that were manual. abilities from <AssistantNmsHomeLink />
          &nbsp; we were able to build this tool.
        </Text>
      </Container>

      <Container my="3em">
        <Divider variant="dashed" />
      </Container>

      <Container pb="2em" class="faq">
        <Center>
          <Text fontSize={headingSize} mb="$4">
            Frequently Asked Questions
          </Text>
        </Center>
        <Accordion allowMultiple maxW="712px" mx="auto">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>Why isn't my submission approved?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text my="0.5em">
                There are many things that go into approving submissions. This is a mostly manual
                process and the NMSUD organisers need to ensure that we do not allow fraudulent or
                offensive submissions.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>How do I edit a submission?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                Unfortunately there is no way to edit a submission yet. We are working on a
                solution, as a temporary work-around, you may resubmit your submission but please
                make sure that you mention in the contact details section that you wish to update a
                previous submission. Please also leave valid contact details so that we can verify
                that you are the author of a submission.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize={subHeadingSize}>My submission failed... What should I do?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>If you received an error message such as this:</Text>
              <Center>
                <Image
                  src={AppImage.exampleSubmissionError}
                  position="relative"
                  alt="example of a message you would receive if a submission failed to submit"
                />
              </Center>
              <Text>
                Then please reach out to us on the <NMSUDDiscordLink />
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
                <UnorderedList>
                  <ListItem>
                    <b>{site.kurt.discordName}</b> on the <NMSUDDiscordLink />
                  </ListItem>
                  <ListItem>
                    <b>{site.lenni.discordName}</b> on the <NMSUDDiscordLink />
                  </ListItem>
                </UnorderedList>
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

      <Box m={200}></Box>
    </>
  );
};

export default AboutPage;
