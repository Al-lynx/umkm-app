export const getTopProducts = (
  transactions
) => {
  const map = {};

  transactions.forEach(
    (trx) => {
      trx.items.forEach(
        (item) => {
          map[item.name] =
            (map[item.name] || 0) +
            item.qty;
        }
      );
    }
  );

  return Object.entries(map)
    .sort(
      (a, b) => b[1] - a[1]
    )
    .slice(0, 5);
};