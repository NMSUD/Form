import { ClickEvent, HtmlElementEvent, HtmlFilesEvent } from '@contracts/event';

export const onTargetValue =
  <T>(funcOnEvent: (result: T) => void) =>
  (event: HtmlElementEvent<T>) => {
    const value = event.target?.value;
    if (value == null) return;

    funcOnEvent(value);
  };

export const onTargetFiles = (funcOnEvent: (file: FileList) => void) => (event: HtmlFilesEvent) => {
  const fileList = event.target.files;
  if (fileList == null || fileList.length < 1) return;

  funcOnEvent(fileList);
};

export const preventDefault = (event: ClickEvent): ClickEvent => {
  event?.preventDefault?.();
  return event;
};
