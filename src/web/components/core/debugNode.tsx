import { getDocumentServ } from '@services/internal/documentService';
import { Component } from 'solid-js';

interface IProps {
  name: string;
}

export const DebugNode: Component<IProps> = (props: IProps) => {
  if (getDocumentServ().isDebugEnabled() != true) {
    return;
  }

  return <debug>{props.name}</debug>;
};
