import {CartItem, Currency} from '@/types/redux';

export interface OrderDataProps {
  cartItems: CartItem[];
  currency: Currency;
}
