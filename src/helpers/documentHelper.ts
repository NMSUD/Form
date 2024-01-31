import { getLog } from '@services/internal/logService';

export interface IAddScriptToHead {
  id: string;
  url: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

export const addScriptToHead = (props: IAddScriptToHead) => {
  const existingScript = document.getElementById(props.id);
  if (existingScript != null) {
    existingScript.remove();
  }

  try {
    const scriptNode = document.createElement('script');
    scriptNode.id = props.id;
    scriptNode.type = 'text/javascript';
    scriptNode.async = props.async ?? false;
    scriptNode.defer = props.defer ?? false;
    if (props.onLoad != null) {
      scriptNode.onload = props.onLoad;
    }

    scriptNode.src = props.url;
    document.head?.appendChild?.(scriptNode);
  } catch (err) {
    getLog().e(err);
  }
};
