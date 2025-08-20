import {CURRENCIES} from '@/constants/home';

export const getCurrencyConversion = ({price, currency}: any) => {
  if (currency === CURRENCIES.eu.label) {
    return Number(price / CURRENCIES.eu.currency).toFixed(2);
  } else if (currency === CURRENCIES.us.label) {
    return Number(price / CURRENCIES.us.currency).toFixed(2);
  } else return Number(price).toFixed(2);
};

export const getCurrencySymbol = ({value}: {value: string}) => {
  if (value === CURRENCIES.us.value) return CURRENCIES.us.symbol;
  else if (value === CURRENCIES.eu.value) return CURRENCIES.eu.symbol;
  else return CURRENCIES.pk.symbol;
};
