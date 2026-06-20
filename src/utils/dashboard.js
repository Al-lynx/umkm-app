export const calculateOmzet = (
  transactions
) => {
  return transactions.reduce(
    (acc, trx) =>
      acc + trx.total,
    0
  );
};

export const calculateTodayRevenue =
  (transactions) => {
    const today =
      new Date().toDateString();

    return transactions
      .filter(
        (trx) =>
          new Date(
            trx.createdAt
          ).toDateString() ===
          today
      )
      .reduce(
        (acc, trx) =>
          acc + trx.total,
        0
      );
  };