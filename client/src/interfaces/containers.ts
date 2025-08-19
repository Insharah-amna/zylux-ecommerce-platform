import {ReactNode} from 'react';

export interface AuthFormContainerProps {
  children: ReactNode;
  heading: string;
  handleSubmit?: () => void;
  className?: string;
}

export interface ContainerProps {
  children: ReactNode;
}
