export const getProducts = () => {
  return (
    JSON.parse(
      localStorage.getItem("products")
    ) || []
  );
};

export const saveProducts = (
  products
) => {
  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );
};

export const getCart = () => {
  return (
    JSON.parse(
      localStorage.getItem("cart")
    ) || []
  );
};

export const saveCart = (
  cart
) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const getTransactions =
  () => {
    return (
      JSON.parse(
        localStorage.getItem(
          "transactions"
        )
      ) || []
    );
  };

export const saveTransactions =
  (transactions) => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  };

export const updateProductStock = (
  soldItems
) => {
  const products =
    getProducts();

  const updatedProducts =
    products.map((product) => {
      const sold =
        soldItems.find(
          (item) =>
            item.id === product.id
        );

      if (!sold)
        return product;

      const newStock =
        product.stock - sold.qty;

      return {
        ...product,
        stock:
          newStock < 0
            ? 0
            : newStock,
        status:
          newStock <= 0
            ? "habis"
            : newStock <= 10
            ? "menipis"
            : "aman",
      };
    });

  saveProducts(
    updatedProducts
  );

  return updatedProducts;
};

export const getTotalRevenue =
  (transactions) => {
    return transactions.reduce(
      (acc, trx) =>
        acc + trx.total,
      0
    );
  };

export const getTodayRevenue =
  (transactions) => {
    const today =
      new Date().toLocaleDateString(
        "id-ID"
      );

    return transactions
      .filter((trx) =>
        trx.date.includes(today)
      )
      .reduce(
        (acc, trx) =>
          acc + trx.total,
        0
      );
  };

export const getBestSellingProducts =
  (transactions) => {
    const sales = {};

    transactions.forEach(
      (trx) => {
        trx.items.forEach(
          (item) => {
            sales[item.name] =
              (sales[item.name] ||
                0) + item.qty;
          }
        );
      }
    );

    return Object.entries(
      sales
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);
  };

export const exportBackup =
  () => {
    const data = {
      products:
        getProducts(),
      transactions:
        getTransactions(),
    };

    const blob =
      new Blob(
        [
          JSON.stringify(
            data,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;
    a.download =
      "backup-umkm.json";
    a.click();

    URL.revokeObjectURL(
      url
    );
  };