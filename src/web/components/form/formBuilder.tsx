// prettier-ignore
import { Alert, AlertDescription, AlertIcon, Button, Center, HStack, Tag, Text } from '@hope-ui/solid';
import classNames from 'classnames';
import { For, JSXElement, Show, createSignal } from 'solid-js';

import { IApiSegment } from '@constants/api';
import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { routes } from '@constants/route';
import { IDropdownOption } from '@contracts/dropdownOption';
import { FormDtoMeta, FormDtoMetaDetails } from '@contracts/dto/forms/baseFormDto';
import { BugReportDto } from '@contracts/dto/forms/bugReportDto';
import { timeout } from '@helpers/asyncHelper';
import { capitalizeFirstLetter } from '@helpers/stringHelper';
import { ObjectWithPropsOfValue } from '@helpers/typescriptHacks';
import { getFormApiService } from '@services/api/formApiService';
import { getFormBugApiService } from '@services/api/formBugApiService';
import { getCaptchaService } from '@services/external/captchaService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { getStateService } from '@services/internal/stateService';
import { validateObj } from '@validation/baseValidation';
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from '@web/components/form/grid';
import { showStatusNotificationTile } from '@web/components/form/statusNotificationTile';
import {
  ComponentMapping,
  IPropertyToFormMapping,
  PropertyOverrides,
} from '@web/contracts/formTypes';
import { BugReportFAB } from '../bugReportFAB';
import { Card } from '../common/card';
import { PageHeader } from '../common/pageHeader';
import { DebugNode } from '../core/debugNode';
import {
  defaultNotificationSettings,
  getDtoWithDefaultValues,
  getDtoWithOverrides,
  getExtraProps,
  getNotificationFunctions,
} from './formBuilderLogic';
import { FormNotReadyAlert } from './formNotReadyAlert';

interface IProps<T> {
  id: string;
  title: string;
  segment: keyof IApiSegment;
  mappings: ComponentMapping<T>;
  formDtoMeta: FormDtoMeta<T>;
  propertyOverrides?: Array<PropertyOverrides<T>>;
  getName: (item: T) => string;
}

export const FormBuilder = <T,>(props: IProps<T>) => {
  let captchaRef: HTMLDivElement;

  const dataFromState = getDtoWithOverrides(
    getStateService().getForm(props.segment),
    props.propertyOverrides,
  );
  const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(dataFromState);
  const [forceValidationMessages, setForceValidationMessages] = createSignal<boolean>(false);
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

  const formIsDisabled = routes.form[props.segment]?.comingSoon ?? false;

  setTimeout(async () => {
    if (getConfig().getCaptchaEnabled() == true) {
      await getCaptchaService().loadUI(captchaRef);
    }

    setNetworkState(NetworkState.Pending);
  }, 500);

  const updateProperty = (prop: string, value: unknown) => {
    const dtoMeta: FormDtoMetaDetails<string> = (
      props.formDtoMeta as ObjectWithPropsOfValue<FormDtoMetaDetails<string>>
    )?.[prop];
    const saveToLocalStorage = dtoMeta?.saveToLocalStorage !== false;

    setItemBeingEdited((prev) => {
      const item = { ...prev, [prop]: value };
      if (saveToLocalStorage) {
        getStateService().setForm(props.segment, item);
      }
      return item;
    });
  };

  const submitForm = async () => {
    const editedItem = itemBeingEdited();
    getLog().i('Submitting Form with itemData:', editedItem);
    const notificationFunctions = getNotificationFunctions({
      ...defaultNotificationSettings,
      id: 'submit-notification-id',
      loading: {
        title: `Submitting ${capitalizeFirstLetter(props.segment)}`,
        description: 'Uploading details and verifying the data',
      },
      success: {
        title: 'Form submitted successfully',
        description: `Thank you for your submission! We will verify your submission as soon as possible`,
      },
    });

    const failedValidationMsgs = validateObj({
      data: editedItem,
      validationObj: props.formDtoMeta,
      includeLabelInErrMsgs: true,
    }).filter((v) => v.isValid === false);

    if (failedValidationMsgs.length > 0) {
      getLog().w('Submitting Form - validation failed');
      notificationFunctions.showValidationError();
      failedValidationMsgs
        .filter((m) => m.errorMessage != null)
        .map((m) => getLog().e(`Submitting Form - err: ${m.errorMessage}`));
      setForceValidationMessages(true);
      return;
    }

    notificationFunctions.showLoading();
    setNetworkState(NetworkState.Loading);

    let captchaResp = 'test1000080001test';
    if (getConfig().getCaptchaEnabled() == true) {
      const captchaResult = await getCaptchaService().promptUser();
      if (captchaResult.isSuccess == false) {
        notificationFunctions.showCaptchaError();
        setNetworkState(NetworkState.Success);
        return;
      }
      captchaResp = captchaResult.value;
    }

    const [_, submitTask] = await Promise.all([
      timeout(getConfig().isProd() ? 0 : 2000), // min 2 sec delay in dev. There is no delay in prod
      getFormApiService().submit(props.segment, editedItem, captchaResp),
    ]);

    if (submitTask.isSuccess === false) {
      notificationFunctions.showError();
      setNetworkState(NetworkState.Error);
      return;
    }

    const name = submitTask.value.name;
    const dropDownOpt: IDropdownOption = {
      title: name,
      value: submitTask.value.id,
      image: submitTask.value.iconUrl,
    };
    getStateService().addSubmission(props.segment, dropDownOpt);
    notificationFunctions.showSuccess();

    showStatusNotificationTile({
      href: [getConfig().getNmsUdFormWebUrl(), '/#', routes.status.path].join(''),
      imgUrl: submitTask.value.iconUrl ?? AppImage.sidebarLogo,
      description: `${capitalizeFirstLetter(props.segment)}: '{name}'`,
    });

    clearForm();
    setNetworkState(NetworkState.Success);
  };

  const submitBugReport = async (bugReport: BugReportDto) => {
    getLog().i('Submitting BugReport with data:', bugReport);
    const notificationFunctions = getNotificationFunctions({
      ...defaultNotificationSettings,
      id: 'bug-notification-id',
      loading: {
        title: 'Submitting Bug report',
        description: 'Uploading details and verifying the data',
      },
      success: {
        title: 'Report submitted successfully',
        description: `Thank you for your bug report!`,
      },
    });
    notificationFunctions.showLoading();
    setNetworkState(NetworkState.Loading);

    if (getConfig().getCaptchaEnabled() == true) {
      const captchaResult = await getCaptchaService().promptUser();
      if (captchaResult.isSuccess == false) {
        notificationFunctions.showCaptchaError();
        setNetworkState(NetworkState.Success);
        return;
      }
      bugReport.captcha = captchaResult.value;
    }

    const [_, submitTask] = await Promise.all([
      timeout(getConfig().isProd() ? 0 : 2000), // min 2 sec delay in dev. There is no delay in prod
      getFormBugApiService().submitBugReport(bugReport),
    ]);

    if (submitTask.isSuccess === false) {
      notificationFunctions.showError();
      setNetworkState(NetworkState.Success);
      return;
    }

    notificationFunctions.showSuccess();
    setNetworkState(NetworkState.Success);
  };

  const clearForm = () => {
    setForceValidationMessages(false);
    setItemBeingEdited((prev) => getDtoWithDefaultValues(prev, props.formDtoMeta));
  };

  const renderGridCell = (item: IPropertyToFormMapping<T>, children: JSXElement) => {
    return (
      <FormFieldGridCell
        colSpan={item.gridItemColumnSize}
        rowSpan={item.gridItemRowSize ?? GridItemSize.xsmol}
      >
        {children}
      </FormFieldGridCell>
    );
  };

  return (
    <>
      <PageHeader text={props.title} />

      <Show when={formIsDisabled}>
        <FormNotReadyAlert />
      </Show>

      <Card class={classNames('form', { 'alert-visible': formIsDisabled })}>
        <DebugNode name="FormBuilder" />
        <FormFieldGrid>
          <For each={Object.keys(props.mappings)}>
            {(itemPropName) => {
              const item: IPropertyToFormMapping<T> = (
                props.mappings as ObjectWithPropsOfValue<IPropertyToFormMapping<T>>
              )[itemPropName];
              const Component = item.component;

              const dtoMeta: FormDtoMetaDetails<string> = (
                props.formDtoMeta as ObjectWithPropsOfValue<FormDtoMetaDetails<string>>
              )?.[itemPropName];
              if (dtoMeta == null) {
                getLog().e(`Item mapping '${itemPropName}'' does not exist on '${props.id}'`);
                return null;
              }

              return renderGridCell(
                item,
                <Component
                  {...getExtraProps(item, itemBeingEdited())}
                  id={`${props.id}-${itemPropName}`}
                  label={dtoMeta.label}
                  value={(itemBeingEdited() as unknown as ObjectWithPropsOfValue<T>)[itemPropName]}
                  helpText={dtoMeta.helpText}
                  placeholder={item.placeholder}
                  validation={dtoMeta.validator}
                  showValidationMessages={forceValidationMessages()}
                  onChange={(newValue: string) => updateProperty(itemPropName, newValue)}
                />,
              );
            }}
          </For>
        </FormFieldGrid>
        <Show when={networkState() === NetworkState.Error}>
          <HStack mt="1em" spacing="$4" justifyContent="center">
            <Tag colorScheme="danger">Something went wrong when submitting your data</Tag>
          </HStack>
        </Show>
        <HStack mt="1em" spacing="$4" justifyContent="center">
          <div ref={(el) => (captchaRef = el)} class="h-captcha"></div>
          <Button
            class="no-focus"
            variant="solid"
            loading={networkState() === NetworkState.Loading}
            onClick={submitForm}
          >
            Submit
          </Button>
          <Button class="no-focus" variant="outline" colorScheme="warning" onClick={clearForm}>
            Clear
          </Button>
          <Show when={!getConfig().isProd()}>
            <Button
              class="no-focus"
              variant="outline"
              colorScheme="danger"
              onClick={() => {
                getLog().i(`${props.segment} form - details so far`, itemBeingEdited());
              }}
            >
              Log object to console
            </Button>
          </Show>
        </HStack>
      </Card>
      <BugReportFAB submitBugReport={submitBugReport} />
    </>
  );
};
