export const todp = (amount: any, dp: number) => {
  return Number(amount).toFixed(dp);
};



export const convertToDollar = (token: any, value: any) => {
  return parseFloat(value) * token.oneTokenToDollar;
};

export const inCurrencyFormat = (value: number) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  return dollarUSLocale.format(value);
};

export const replacer = (key: any, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}