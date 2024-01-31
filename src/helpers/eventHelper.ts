import { ClickEvent, HtmlElementEvent, HtmlFilesEvent } from '@contracts/event';

export const onTargetValue =
  <T>(funcOnEvent: (result: T) => void) =>
  (event: HtmlElementEvent<T>) => {
    const value = event.target?.value;
    if (value == null) return;

    funcOnEvent(value);
  };

export const onTargetFile = (funcOnEvent: (file: File) => void) => (event: HtmlFilesEvent) => {
  const fileList = event.target.files;
  if (fileList == null || fileList.length < 1) return;

  funcOnEvent(fileList[0]);
};

export const preventDefault = (event: ClickEvent): ClickEvent => {
  event?.preventDefault?.();
  return event;
};
