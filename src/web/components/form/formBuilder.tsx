// prettier-ignore
import { Alert, AlertDescription, AlertIcon, Button, Center, HStack, Tag, Text, notificationService } from '@hope-ui/solid';
import classNames from 'classnames';
import { For, JSXElement, Show, createSignal } from 'solid-js';

import { IApiSegment } from '@constants/api';
import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { routes } from '@constants/route';
import { IDropdownOption } from '@contracts/dropdownOption';
import { IFormDtoMeta, IFormDtoMetaDetails } from '@contracts/dto/forms/baseFormDto';
import { makeArrayOrDefault } from '@helpers/arrayHelper';
import { capitalizeFirstLetter } from '@helpers/stringHelper';
import { ObjectWithPropsOfValue, anyObject } from '@helpers/typescriptHacks';
import { getFormApiService } from '@services/api/formApiService';
import { getCaptchaService } from '@services/external/captchaService';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { getStateService } from '@services/internal/stateService';
import { validateObj } from '@validation/baseValidation';
import { BasicLink } from '@web/components/core/link';
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from '@web/components/form/grid';
import { StatusNotificationTile } from '@web/components/form/statusNotificationTile';
import {
  ComponentMapping,
  IPropertyToFormMapping,
  PropertyOverrides,
} from '@web/contracts/formTypes';
import { Card } from '../common/card';
import { PageHeader } from '../common/pageHeader';
import { DebugNode } from '../core/debugNode';
import { timeout } from '@helpers/asyncHelper';

interface IProps<T> {
  id: string;
  title: string;
  segment: keyof IApiSegment;
  mappings: ComponentMapping<T>;
  formDtoMeta: IFormDtoMeta<T>;
  propertyOverrides?: Array<PropertyOverrides<T>>;
  getName: (item: T) => string;
}

export const FormBuilder = <T,>(props: IProps<T>) => {
  let captchaRef: HTMLDivElement;

  const dataFromState: { [x: string]: unknown } = getStateService().getForm(props.segment);
  for (const propOverrides of makeArrayOrDefault(props.propertyOverrides)) {
    for (const property of Object.keys(propOverrides)) {
      const propKey = property as keyof T;
      const currVal = dataFromState[property];
      const propOverrideFunc = propOverrides[propKey];
      if (propOverrideFunc == null) continue;

      const newValue = propOverrideFunc(currVal);
      dataFromState[property] = newValue;
    }
  }

  const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(dataFromState as T);
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
    const dtoMeta: IFormDtoMetaDetails<string> = (
      props.formDtoMeta as ObjectWithPropsOfValue<IFormDtoMetaDetails<string>>
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

  const getExtraProps = (localItem: IPropertyToFormMapping<T>, localItemBeingEdited: T) => {
    let extraProps = anyObject;
    if (localItem.additional == null) return extraProps;

    for (const additionalProp in localItem.additional) {
      if (Object.prototype.hasOwnProperty.call(localItem.additional, additionalProp) == false)
        continue;

      const propFunc: (item: T) => unknown = localItem.additional[additionalProp];
      extraProps = {
        ...extraProps,
        [additionalProp]: propFunc(localItemBeingEdited),
      };
    }

    return extraProps;
  };

  const submitForm = async () => {
    getLog().i('submitForm');
    const failedValidationMsgs = validateObj({
      data: itemBeingEdited(),
      validationObj: props.formDtoMeta,
      includeLabelInErrMsgs: true,
    }).filter((v) => v.isValid === false);

    if (failedValidationMsgs.length > 0) {
      notificationService.show({
        status: 'danger',
        title: 'Validation errors',
        description: 'There are some problems that need fixing!',
      });
      failedValidationMsgs
        .filter((m) => m.errorMessage != null)
        .map((m) => getLog().e(m.errorMessage!));
      setForceValidationMessages(true);
      return;
    }

    const loadingNotificationId = 'loading-notification-id';
    notificationService.show({
      id: loadingNotificationId,
      title: `Submitting ${capitalizeFirstLetter(props.segment)}`,
      description: 'Uploading details and verifying the data',
      persistent: true,
      closable: false,
      loading: true,
    });
    setNetworkState(NetworkState.Loading);

    let captchaResp = 'test1000080001test';
    if (getConfig().getCaptchaEnabled() == true) {
      const captchaResult = await getCaptchaService().promptUser();
      if (captchaResult.isSuccess == false) {
        notificationService.show({
          status: 'danger',
          title: 'Captcha failed!',
          description: 'The captcha was cancelled or failed to load, please try again.',
        });
        setNetworkState(NetworkState.Success);
        return;
      }
      captchaResp = captchaResult.value;
    }

    const [_, submitTask] = await Promise.all([
      timeout(getConfig().isProd() ? 0 : 2000), // min 2 sec delay in dev. There is no delay in prod
      getFormApiService().submit(props.segment, itemBeingEdited(), captchaResp),
    ]);

    if (submitTask.isSuccess === false) {
      notificationService.update({
        id: loadingNotificationId,
        status: 'danger',
        title: 'Something went wrong!',
        description: `Unable to confirm that your data was submitted correctly. Please either try submitting again or reach out to one of the NMSUD organisers`,
        closable: true,
        duration: 10_000,
      });
      setNetworkState(NetworkState.Success);
      return;
    }

    const name = submitTask.value.name;
    const dropDownOpt: IDropdownOption = {
      title: name,
      value: submitTask.value.id,
      image: submitTask.value.iconUrl,
    };
    getStateService().addSubmission(props.segment, dropDownOpt);

    notificationService.update({
      id: loadingNotificationId,
      status: 'success',
      title: 'Form submitted successfully',
      description: `Thank you for your submission! We will verify your submission as soon as possible`,
      duration: 10_000,
    });

    const urlSegments = [getConfig().getNmsUdFormWebUrl(), '/#', routes.status.path];
    notificationService.show({
      render: (notificationProps) => (
        <StatusNotificationTile
          {...notificationProps}
          href={urlSegments.join('')}
          imgUrl={submitTask.value.iconUrl ?? AppImage.sidebarLogo}
          title="View the status of your submission here:"
          descrip={
            <Text>
              {capitalizeFirstLetter(props.segment)}: '{name}'
            </Text>
          }
        />
      ),
      persistent: true,
    });

    clearForm();
    setNetworkState(NetworkState.Success);
  };

  const clearForm = () => {
    setForceValidationMessages(false);
    setItemBeingEdited((prev) => {
      const result: T = { ...prev };

      for (const formMetaKey in props.formDtoMeta) {
        if (Object.prototype.hasOwnProperty.call(props.formDtoMeta, formMetaKey)) {
          const formMeta = props.formDtoMeta[formMetaKey];
          if (formMeta.defaultValue !== undefined) {
            result[formMetaKey] = formMeta.defaultValue;
          } else {
            (result[formMetaKey] as unknown) = undefined;
          }
        }
      }
      getStateService().setForm(props.segment, result);
      return result;
    });
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
      <PageHeader text={props.title}></PageHeader>

      <Show when={formIsDisabled}>
        <Alert
          mt="2em"
          status="warning"
          variant="subtle"
          borderBottomRadius="0"
          justifyContent="center"
          class="card-alert"
        >
          <AlertIcon mr="$2_5" />
          <AlertDescription>
            <Text>
              This form is under construction. Submissions made before the page has been made
              available are likely to be deleted.
            </Text>
          </AlertDescription>
        </Alert>
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

              const dtoMeta: IFormDtoMetaDetails<string> = (
                props.formDtoMeta as ObjectWithPropsOfValue<IFormDtoMetaDetails<string>>
              )?.[itemPropName];
              if (dtoMeta == null)
                return renderGridCell(
                  item,
                  <Center border="1px solid red" borderRadius="1em" height="100%">
                    <Text color="red" textAlign="center" p="2em">
                      Item mapping '{itemPropName}'' does not exist on '{props.id}'
                    </Text>
                  </Center>,
                );

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
      {/* TODO add BugReportFAB when ready */}
      {/* <BugReportFAB /> */}
    </>
  );
};
