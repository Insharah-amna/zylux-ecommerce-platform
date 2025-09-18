import {Product} from '@/types/redux';
import {UseFormHandleSubmit} from 'react-hook-form';

export interface CartItemDetailProps {
  product: Product;
  handleRemove: (data: any) => void;
}

export interface AddressPayload {
  address: string;
  city: string;
  country: string;
}

export interface AddressProps {
  control: any;
  handleSubmit: UseFormHandleSubmit<AddressPayload>;
  onSubmit: (data: any) => void;
}
