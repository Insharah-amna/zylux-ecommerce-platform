import {Dispatch, ReactNode, SetStateAction} from 'react';
import {UseFormSetValue} from 'react-hook-form';
import {Product} from '@/types/redux';
import {CategoryId} from './dashboard';

export interface ProductsPayload {
  _id?: string;
  name: string;
  price: number;
  description: string;
  categoryId: CategoryId;
  colorVariants: string[];
  isOutOfStock: boolean;
  discount: number;
  imageUrls?: Array<string>;
  files?: File[];
}

// This is only used for Yup validation
export type ProductsFormValues = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  categoryId: {
    value: string;
    label: string;
  };
  colorVariants: string[];
  isOutOfStock: boolean;
  discount: number;
  imageUrls?: string[];
  files?: File[];
};

export interface PreviewImage {
  id: string | number;
  objectUrl: string;
  file?: File;
}

export interface SetImageProps {
  images: PreviewImage[];
  setImages: Dispatch<SetStateAction<PreviewImage[]>>;
  setValue: UseFormSetValue<ProductsFormValues>;
  product?: Product | null;
}

export interface MultiColorPickerProps {
  name: string;
  selectedColors: string[];
  setValue: any;
}

export interface ProductInfoModalProps {
  label: string;
  product: Product | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

export interface ProductTableProps {
  setSelectedProduct: (data: any) => void;
  setIsFormOpen: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  setIsConfirmationOpen: (data: any) => void;
}

export interface ProductTableRowProps {
  product: Product | null;
  setSelectedProduct: (data: any) => void;
  setIsFormOpen: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  setIsConfirmationOpen: (data: any) => void;
}

export interface ProductInfoProps {
  selectedProduct: Product | null;
  onCancel: () => void;
}

export interface LabelValueRowProps {
  label: string;
  value: ReactNode | string | number | null | undefined;
}

export type ProductProps = {
  product: Product;
};
