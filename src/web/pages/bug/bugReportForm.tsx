// prettier-ignore
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertDescription, AlertIcon, Box, Button, Flex, HStack, Spacer, Text, Textarea } from '@hope-ui/solid';
import { For, Show, createSignal } from 'solid-js';

import { LogType } from '@constants/enum/logType';
import { BugReportDto } from '@contracts/dto/forms/bugReportDto';
import { getLog } from '@services/internal/logService';
import { FormLongInput } from '@web/components/form/text/input';
import { FormTextArea } from '@web/components/form/text/textArea';

interface IProps<T> {
  formBuilderModel?: T;
  submitBugReport: (bugReport: BugReportDto) => Promise<void>;
}

export const BugReportForm = <T,>(props: IProps<T>) => {
  const [contactDetails, setContactDetails] = createSignal<string>('');
  const [description, setDescription] = createSignal<string>('');

  const trackedLogs = getLog().getLogs();

  const submitReport = () => {
    props.submitBugReport({
      contactDetails: contactDetails(),
      description: description(),
      logs: trackedLogs,
    });
  };

  const logTypeToAlertStyle = (type: LogType): 'success' | 'info' | 'warning' | 'danger' => {
    switch (type) {
      case 'log':
        return 'info';
      case 'warn':
        return 'warning';
      case 'error':
      default:
        return 'danger';
    }
  };

  return (
    <Box pt="1em" pb="1em" class="bug-report">
      <Flex flexDirection="column" gap="1em">
        <FormLongInput
          id="contact"
          label="Contact Details"
          placeholder="Leave blank or provide discord, email, social media account, etc"
          helpText="Just incase we have more questions for you"
          value={contactDetails()}
          showValidationMessages={false}
          validation={() => ({ isValid: true })}
          onChange={setContactDetails}
        />
        <FormTextArea
          id="description"
          label="Description of what is wrong or what can be improved"
          placeholder="An error occurred when I tried to..."
          value={description()}
          showValidationMessages={false}
          validation={() => ({ isValid: true })}
          onChange={setDescription}
        />
        {/* TODO add option to create github issue
        https://github.com/NMSUD/Form/issues/new?assignees=&labels=bug&projects=&template=---bug-report.yaml&title=%F0%9F%90%9B+Bug+Report%3A+ */}
        <Show when={props.formBuilderModel != null}>
          Add current form in report (useful if you are trying to submit a record but it isn't
          working. The data that you have filled in will be sent to us except for files that have
          been added from your PC)
          {/* TODO Include option to include current item being edited */}
        </Show>
        <HStack justifyContent="end">
          <Button onClick={submitReport}>Submit</Button>
        </HStack>
      </Flex>
      <Show when={trackedLogs.length > 0}>
        <Text textAlign="center" mt="2em" mb="0.5em">
          Logs tracked:
        </Text>
      </Show>
      <For each={trackedLogs}>
        {(log) => (
          <Alert mb="2px" status={logTypeToAlertStyle(log.type)} variant="subtle">
            <AlertIcon mr="$2_5" />
            <AlertDescription w="100%">
              <Show
                when={(log.optionalParams?.length ?? 0) > 0}
                fallback={<Text class="msg">{log.message}</Text>}
              >
                <Accordion w="100%" mx="auto">
                  <For each={log.optionalParams}>
                    {(optParam) => (
                      <AccordionItem>
                        <AccordionButton>
                          <Text>{log.message}</Text>
                          <Spacer />
                          <small>
                            {log.optionalParams?.length ?? 0} parameter
                            {(log.optionalParams?.length ?? 0) > 1 ? 's' : ''}
                          </small>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel px={0}>
                          <Textarea readOnly minH="33vh">
                            {optParam}
                          </Textarea>
                        </AccordionPanel>
                      </AccordionItem>
                    )}
                  </For>
                </Accordion>
              </Show>
            </AlertDescription>
          </Alert>
        )}
      </For>
    </Box>
  );
};
