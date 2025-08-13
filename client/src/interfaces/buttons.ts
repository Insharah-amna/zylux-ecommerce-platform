import {MouseEventHandler, ReactNode} from 'react';
import {VariantProps} from 'class-variance-authority';
import {buttonVariants} from '@/components/ui/button';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export interface SubmitButtonProps {
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
  handleSubmit?: () => void;
  className?: string;
  variant?: ButtonVariant;
}

export interface PrimaryButtonProps {
  buttonText: string | ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
}

export interface ButtonProps {
  title: string;
  styles?: string;
  variant?: ButtonVariant;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  loaderColor?: string;
}
