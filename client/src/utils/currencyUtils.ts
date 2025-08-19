import {CURRENCIES} from '@/constants/home';

export const getCurrencyConversion = ({price, currency}: any) => {
  if (currency === CURRENCIES.eu.label) {
    return price / CURRENCIES.eu.currency;
  } else if (currency === CURRENCIES.us.label) {
    return price / CURRENCIES.us.currency;
  } else return price;
};
