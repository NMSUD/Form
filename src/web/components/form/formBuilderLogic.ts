import { notificationService } from '@hope-ui/solid';

import { FormDtoMeta } from '@contracts/dto/forms/baseFormDto';
import { anyObject } from '@helpers/typescriptHacks';
import { IPropertyToFormMapping, PropertyOverrides } from '@web/contracts/formTypes';
import { makeArrayOrDefault } from '@helpers/arrayHelper';

export const getExtraProps = <T>(localItem: IPropertyToFormMapping<T>, localItemBeingEdited: T) => {
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

export const getDtoWithOverrides = <T>(
  dataFromState: { [x: string]: unknown },
  propertyOverrides?: Array<PropertyOverrides<T>>,
): T => {
  const result = { ...dataFromState };
  for (const propOverrides of makeArrayOrDefault(propertyOverrides)) {
    for (const property of Object.keys(propOverrides)) {
      const propKey = property as keyof T;
      const currVal = dataFromState[property];
      const propOverrideFunc = propOverrides[propKey];
      if (propOverrideFunc == null) continue;

      const newValue = propOverrideFunc(currVal);
      result[property] = newValue;
    }
  }

  return result as T;
};

export const getDtoWithDefaultValues = <T>(prev: T, formDtoMeta: FormDtoMeta<T>) => {
  const result: T = { ...prev };

  for (const formMetaKey in formDtoMeta) {
    if (Object.prototype.hasOwnProperty.call(formDtoMeta, formMetaKey)) {
      const formMeta = formDtoMeta[formMetaKey];
      if (formMeta.defaultValue !== undefined) {
        result[formMetaKey] = formMeta.defaultValue;
      } else {
        (result[formMetaKey] as unknown) = undefined;
      }
    }
  }

  return result;
};

interface INotificationSettingsTitles {
  title: string;
  description: string;
}
interface INotificationSettings {
  id: string;
  loading: INotificationSettingsTitles;
  failure: INotificationSettingsTitles;
  success: INotificationSettingsTitles;
}

interface INotificationFunctions {
  showLoading: () => void;
  showError: (override?: INotificationSettingsTitles) => void;
  showSuccess: () => void;
}

export const getNotificationFunctions = (
  settings: INotificationSettings,
): INotificationFunctions => {
  return {
    showLoading: () => {
      notificationService.show({
        id: settings.id,
        ...settings.loading,
        persistent: true,
        closable: false,
        loading: true,
      });
    },
    showError: (override?: INotificationSettingsTitles) => {
      notificationService.update({
        id: settings.id,
        status: 'danger',
        ...(override ?? settings.failure),
        closable: true,
        duration: 10_000,
      });
    },
    showSuccess: () => {
      notificationService.update({
        id: settings.id,
        status: 'success',
        ...settings.success,
        duration: 10_000,
      });
    },
  };
};
