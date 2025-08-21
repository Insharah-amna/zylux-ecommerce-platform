import {CartItem, Currency, Order} from '@/types/redux';

export interface OrderDataProps {
  cartItems: CartItem[];
  currency: Currency;
}

export interface OrderTableProps {
  setSelectedOrder: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  isUserOrders: boolean;
}

export interface OrderRowProps {
  order: Order;
  setSelectedOrder: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  isUserOrders: boolean;
}

export interface OrderInfoModalProps {
  selectedOrder: Order;
  onCancel: () => void;
}
