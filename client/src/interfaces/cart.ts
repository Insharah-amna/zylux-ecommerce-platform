import {Product} from '@/types/redux';

export interface CartItemDetailProps {
  product: Product;
  handleRemove: (data: any) => void;
}

export interface AddressProps {
  setAddress: (data: string) => void;
  setCity: (data: string) => void;
  setCountry: (data: string) => void;
}
