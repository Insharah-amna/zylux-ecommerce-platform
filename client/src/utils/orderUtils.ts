import {OrderDataProps} from '@/interfaces/order';
import {OrderProduct} from '@/types/redux';
import {getCurrencyConversion} from './currencyUtils';

export const prepareOrderData = ({cartItems, currency}: OrderDataProps) => {
  const products: OrderProduct[] = cartItems.map((product) => ({
    productId: product._id,
    name: product.name,
    unitPrice: Number(
      getCurrencyConversion({
        price: product.price,
        currency: currency.label,
      })
    ),
    quantity: product.quantity,
    discount: product.discount,
    images: product.imageUrls,
  }));
  return products;
};
