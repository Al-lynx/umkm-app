import { useEffect, useState } from "react";
import * as storageService from "../services/storageService";


export default function usePOSStore() {
  const [products, setProducts] = useState(storageService.getProducts());
  const [cart, setCart] = useState(storageService.getCart());
  const [transactions, setTransactions] = useState(storageService.getTransactions());

  useEffect(() => {
    storageService.saveProducts(products);
  }, [products]);

  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  useEffect(() => {
    storageService.saveTransactions(transactions);
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