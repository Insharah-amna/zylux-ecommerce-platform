export const getCurrencyConversion = ({price, currency}: any) => {
  if (currency === 'EUR') {
    return price / 332;
  } else if (currency === 'USD') {
    return price / 274;
  } else return price;
};
