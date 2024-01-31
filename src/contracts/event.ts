export interface HtmlElementEvent<T> {
  target: {
    value: T;
  };
}
export interface HtmlKeyEvent {
  keyCode: number;
}

export interface HtmlFilesEvent {
  target: {
    files: FileList | null;
  };
}

export interface HtmlImageReadEvent {
  target: FileReader | null;
}

export interface ClickEvent {
  preventDefault: () => void;
}
