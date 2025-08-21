import {ReactNode, SetStateAction} from 'react';
import {ButtonProps} from './buttons';
import {Product} from '@/types/redux';
import {PreviewImage} from './products';

export interface GeneralModalProps {
  title?: string;
  content: ReactNode[];
  isModalOpen: boolean;
  setIsModalOpen: (data: any) => void;
  width?: string;
  height?: string;
  buttons?: ButtonProps[];
  buttonsAlignment?: string;
  titleAlignment?: string;
}

export interface FormModalProps {
  title: string;
  content: ReactNode[];
  isFormOpen: boolean;
  setIsFormOpen: (data: any) => void;
}

export interface InfoModalProps {
  title?: string;
  content: ReactNode[];
  isInfoOpen: boolean;
  setIsInfoOpen: () => void;
}

export interface ConfirmationModalProps {
  content: ReactNode[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;

  width?: string;
  height?: string;

  onCancel: () => void;
  onDelete: (data: any) => void;
  isDeleteLoading: boolean;
}

export interface AddFormProps {
  product: Product | null;
  resetSelectedProduct: (data: any) => void;

  setIsFormOpen: (data: any) => void;
  isUpdateFormOpen?: boolean;
  setIsUpdateFormOpen?: (data: any) => void;

  colorVariants?: string[];
  setColorVariants?: (data: any) => void;

  images?: PreviewImage[];
  setImages?: React.Dispatch<SetStateAction<PreviewImage[]>>;
}
