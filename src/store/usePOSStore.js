import { useEffect, useState } from "react";

import {
  getProducts,
  saveProducts,

  getCart,
  saveCart,

  getTransactions,
  saveTransactions,
} from "../utils/storage";

export default function usePOSStore() {
  const [products, setProducts] =
    useState(getProducts());

  const [cart, setCart] =
    useState(getCart());

  const [transactions, setTransactions] =
    useState(getTransactions());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    saveTransactions(
      transactions
    );
  }, [transactions]);

  return {
    products,
    setProducts,

    cart,
    setCart,

    transactions,
    setTransactions,
  };
}