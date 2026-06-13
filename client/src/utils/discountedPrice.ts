import {getCurrencyConversion} from './currencyUtils';

export const getDiscountedPrice = ({
  unitPrice,
  discount,
  currency,
}: {
  unitPrice: number;
  discount: number;
  currency: string;
}) => {
  const discountedPrice = unitPrice - (unitPrice * discount) / 100;
  return Number(
    getCurrencyConversion({
      price: discountedPrice,
      currency: currency,
    })
  );
};
