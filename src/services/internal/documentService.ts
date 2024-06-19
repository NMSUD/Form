import { Container, Service } from 'typedi';

import { AppImage } from '@constants/image';
import { site } from '@constants/site';
import { getLog } from '@services/internal/logService';
import { getConfig } from './configService';

interface IAddScriptToHead {
  id: string;
  url: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

@Service()
export class DocumentService {
  initDebug = () => {
    (window as unknown as { debug: boolean }).debug = !getConfig().isProd();
  };

  setDocumentTitle = (pageTitle: string) => {
    document.title = `${site.title} - ${pageTitle}`;
  };

  //   getWindowProperty = (property: string) =>
  //     (window as unknown as { [prop: string]: unknown })[property];

  addScriptToHead = (props: IAddScriptToHead) => {
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
      getLog().e('addScriptToHead ex', err);
    }
  };

  addVideoBackground = () => {
    const videoBgId = 'bg-vid';

    if (document.body.clientWidth < 700) {
      getLog().i('screen too small form video bg');
      return;
    }

    const existingScript = document.getElementById(videoBgId);
    if (existingScript != null) {
      existingScript.remove();
    }

    try {
      const videoElem = document.createElement('video');
      videoElem.id = videoBgId;
      videoElem.playsInline = true;
      videoElem.autoplay = true;
      videoElem.muted = true;
      videoElem.loop = true;

      const vidUrlTypes = ['webm', 'mp4'];

      for (const vidUrlType of vidUrlTypes) {
        const videoSourceElem = document.createElement('source');
        videoSourceElem.src = `${AppImage.backgroundVideo}.${vidUrlType}`;
        videoSourceElem.type = `video/${vidUrlType}`;
        videoElem.appendChild(videoSourceElem);
      }

      document.body.prepend(videoElem);
    } catch (err) {
      getLog().e('addVideoBackground ex', err);
    }
  };
}

export const getDocumentServ = () => Container.get(DocumentService);
