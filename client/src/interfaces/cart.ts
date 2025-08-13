import {Product} from '@/types/redux';

export interface CartItemDetailProps {
  product: Product;
  handleRemove: (data: any) => void;
}

export interface CheckoutProps {
  subtotal: number;
}
