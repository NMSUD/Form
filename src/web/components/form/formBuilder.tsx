import { Button, Center, HStack, Tag, Text, notificationService } from '@hope-ui/solid';
import { Component, For, JSXElement, Show, createSignal } from 'solid-js';

import { IApiSegment } from '@constants/api';
import { NetworkState } from '@constants/enum/networkState';
import { AppImage } from '@constants/image';
import { routes } from '@constants/route';
import { IDropdownOption } from '@contracts/dropdownOption';
import { IFormDtoMeta, IFormDtoMetaDetails } from '@contracts/dto/forms/baseFormDto';
import { ValidationResult } from '@contracts/validationResult';
import { ObjectWithPropsOfValue, anyObject } from '@helpers/typescriptHacks';
import { getFormApiService } from '@services/api/formApiService';
import { getCaptchaService } from '@services/external/captchaService';
import { getConfig } from '@services/internal/configService';
import { getStateService } from '@services/internal/stateService';
import { validateObj } from '@validation/baseValidation';
import { BasicLink } from '@web/components/core/link';
import { FormFieldGrid, FormFieldGridCell, GridItemSize } from '@web/components/form/grid';
import { StatusNotificationTile } from '@web/components/form/statusNotificationTile';

interface IPropertyToFormMappingExtraProp<T> {
  [prop: string]: (item: T) => unknown;
}

export type IComponentMapping<T> = {
  [prop in keyof T]?: IPropertyToFormMapping<T>;
};

export type IFormInputProps<T> = {
  id: string;
  label: string;
  helpText?: string;
  value: T;
  placeholder: string;
  showValidationMessages: boolean;
  validation: (val: T) => ValidationResult;
  onChange: (newValue: T) => void;
};

export interface IPropertyToFormMapping<T> {
  component: Component<IFormInputProps<any>>;
  gridItemColumnSize: GridItemSize;
  gridItemRowSize?: GridItemSize;
  placeholder?: string;
  additional?: IPropertyToFormMappingExtraProp<T>;
}

interface IProps<T> {
  item: T;
  id: string;
  segment: keyof IApiSegment;
  mappings: IComponentMapping<T>;
  formDtoMeta: IFormDtoMeta<T>;
  getName: (item: T) => string;
}

export const FormBuilder = <T,>(props: IProps<T>) => {
  let captchaRef: HTMLDivElement;
  const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(props.item);
  const [forceValidationMessages, setForceValidationMessages] = createSignal<boolean>(false);
  const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

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
    const saveToLocalStorage = dtoMeta?.dontSaveToLocalStorage !== true;

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
    const failedValidationMsgs = validateObj({
      data: itemBeingEdited(),
      validationObj: props.formDtoMeta,
      inludeLabelInErrMsgs: true,
    }).filter((v) => v.isValid === false);

    if (failedValidationMsgs.length > 0) {
      for (const failedValidationMsg of failedValidationMsgs) {
        notificationService.show({
          status: 'danger',
          title: 'There are some problems that need fixing!',
          description: `${failedValidationMsg.errorMessage}`,
        });
      }
      setForceValidationMessages(true);
      return;
    }

    setNetworkState(NetworkState.Loading);

    let captchaResp = 'test1000080001tset';
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

    const submitTask = await getFormApiService().submit(
      props.segment,
      itemBeingEdited(),
      captchaResp,
    );
    if (submitTask.isSuccess === false) {
      notificationService.show({
        status: 'danger',
        title: 'Something went wrong!',
        description: `Unable to confirm that your data was submitted correctly. Please either try submitting again or reach out to one of the NMSUD organisers`,
      });
      setNetworkState(NetworkState.Success);
      return;
    }

    const dropDownOpt: IDropdownOption = {
      title: props.getName(itemBeingEdited()),
      value: submitTask.value.id,
      image: submitTask.value.iconUrl,
    };
    getStateService().addSubmission(props.segment, dropDownOpt);

    notificationService.show({
      status: 'success',
      title: 'Form submitted successfully',
      description: `Thank you for your submission! We will verify your submission as soon as possible`,
    });

    const urlSegments = [getConfig().getNmsUdFormWebUrl(), '/#', routes.status.path];
    notificationService.show({
      render: (notificationProps) => (
        <StatusNotificationTile
          {...notificationProps}
          imgUrl={submitTask.value.iconUrl ?? AppImage.sidebarLogo}
          title="View the status of your submission here:"
          descrip={
            <BasicLink
              href={urlSegments.join('')}
              title="View status"
              disableRef={true}
              additionalClassNames="noselect"
            >
              View Status of {props.segment} '{props.getName(itemBeingEdited())}'
            </BasicLink>
          }
        />
      ),
      persistent: true,
    });

    clearForm();
    setNetworkState(NetworkState.Success);
  };

  const clearForm = () => {
    setItemBeingEdited((prev) => {
      const result: T = { ...prev };

      for (const formMetaKey in props.formDtoMeta) {
        if (Object.prototype.hasOwnProperty.call(props.formDtoMeta, formMetaKey)) {
          const formMeta = props.formDtoMeta[formMetaKey];
          if (formMeta.defaultValue !== undefined) {
            result[formMetaKey] = formMeta.defaultValue;
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
          variant="solid"
          loading={networkState() === NetworkState.Loading}
          onClick={submitForm}
        >
          Submit
        </Button>
        <Button variant="outline" colorScheme="warning" onClick={clearForm}>
          Clear
        </Button>
      </HStack>
    </>
  );
};
