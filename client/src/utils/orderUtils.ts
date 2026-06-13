import {OrderDataProps} from '@/interfaces/order';
import {OrderProduct} from '@/types/redux';
import {getDiscountedPrice} from './discountedPrice';

export const prepareOrderData = ({cartItems, currency}: OrderDataProps) => {
  const products: OrderProduct[] = cartItems.map((product) => ({
    productId: product._id,
    name: product.name,
    unitPrice: getDiscountedPrice({
      unitPrice: product.price,
      discount: product.discount,
      currency: currency.label,
    }),
    quantity: product.quantity,
    discount: product.discount,
    images: product.imageUrls,
  }));
  return products;
};
