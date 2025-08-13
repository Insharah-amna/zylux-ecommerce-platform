import {ReactNode} from 'react';

export interface AuthFormContainerProps {
  children: ReactNode;
  heading: string;
  handleSubmit?: () => void;
}

export interface ContainerProps {
  children: ReactNode;
}
