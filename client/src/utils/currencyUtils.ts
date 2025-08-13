export const getCurrencyConversion = ({price, currency}: any) => {
  if (currency === 'EU') {
    return price / 332;
  } else if (currency === 'USD') {
    return price / 274;
  } else return price;
};
