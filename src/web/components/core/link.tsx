import { Component, JSX } from 'solid-js';
import { preventDefault } from '@helpers/eventHelper';
import { site } from '@constants/site';

interface IProps {
  id?: string;
  href: string;
  title?: string;
  disableRef?: boolean;
  onClick?: () => void;
  additionalClassNames?: string;
  children?: JSX.Element;
}

export const BasicLink: Component<IProps> = (props: IProps) => {
  const appendRef = (baseUrl: string) => {
    if (props.disableRef == true) return baseUrl;
    if (baseUrl.includes('@')) return baseUrl;
    if (baseUrl.includes('?')) {
      return baseUrl + `&ref=${site.ref}`;
    }
    return baseUrl + `?ref=${site.ref}`;
  };

  const localClick = (e: MouseEvent) => {
    if (props.onClick == null) return;

    preventDefault(e);
    props.onClick();
  };

  return (
    <a
      id={props.id}
      title={props.title}
      href={appendRef(props.href)}
      target="_blank"
      rel="noopener noreferrer"
      class={props.additionalClassNames ?? ''}
      onClick={localClick}
      draggable={false}
    >
      {props.children}
    </a>
  );
};

export const NMSUDHomeLink = (props: any) => (
  <BasicLink href={site.nmsud.website} title="NMSUD website">
    {props.children ?? 'NMSUD'}
  </BasicLink>
);
export const NMSUDDiscordLink = (props: any) => (
  <BasicLink href={site.nmsud.discord} title="NMSUD discord">
    {props.children ?? 'NMSUD Discord'}
  </BasicLink>
);
export const NMSUDRepoLink = () => (
  <BasicLink href={site.nmsud.formRepo} title="Github Repo">
    Github Repo
  </BasicLink>
);

export const AssistantNmsHomeLink = () => (
  <BasicLink href={site.assistantNMS.website} title="AssistantNMS">
    AssistantNMS
  </BasicLink>
);
export const AssistantAppsDiscordLink = (props: any) => (
  <BasicLink href={site.assistantApps.discord} title="AssistantApps">
    {props.children ?? 'AssistantApps Discord'}
  </BasicLink>
);
export const NMSCDLink = () => (
  <BasicLink href={site.nmscd.website} title="NMSCD">
    NMSCD
  </BasicLink>
);
