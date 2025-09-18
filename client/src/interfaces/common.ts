import {ReactNode} from 'react';

export interface NodeChildrenProps {
  children: ReactNode;
}

export interface PageParamProps {
  params: Promise<{id: string}>;
}
