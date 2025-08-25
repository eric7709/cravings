export const formatPrice = (price: number | undefined): string => {
  if (price == undefined) return "";
  const num = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₦${num}`;
};