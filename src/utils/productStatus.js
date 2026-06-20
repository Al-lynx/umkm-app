export const getStockStatus = (
  stock
) => {
  if (stock <= 0)
    return "habis";

  if (stock <= 10)
    return "menipis";

  return "aman";
};