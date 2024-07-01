export const changeMoneyFormat = (money: string): string => {
  let value = Number(money.replace(/[^0-9]/g, ''));
  const formatMoney = value.toLocaleString();
  return formatMoney;
};
