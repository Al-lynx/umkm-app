import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/layout/TopBar";
import SearchBar from "../../components/shared/SearchBar";
import POSProductCard from "../../components/pos/POSProductCard";
import CheckoutBar from "../../components/pos/CheckoutBar";
import EmptyState from "../../components/shared/EmptyState";

import { useState } from "react";

import {
  getProducts,
  getCart,
  saveCart,
} from "../../utils/storage";

export default function POSPage() {
  const [products, setProducts] =
    useState([]);

  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Semua");

  const [cart, setCart] =
    useState(getCart());

  useEffect(() => {
    setProducts(
      getProducts()
    );
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const categories = [
    "Semua",
    "Kopi",
    "Non-Kopi",
    "Makanan",
  ];

  const filteredProducts =
    products.filter((product) => {
      const matchSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =
        category === "Semua" ||
        product.category ===
          category;

      return (
        matchSearch &&
        matchCategory
      );
    });

  const addToCart = (
    product
  ) => {
    const existing =
      cart.find(
        (item) =>
          item.id ===
          product.id
      );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id ===
          product.id
            ? {
                ...item,
                qty:
                  item.qty + 1,
              }
            : item
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        qty: 1,
      },
    ]);
  };

  const totalItems =
    cart.reduce(
      (acc, item) =>
        acc + item.qty,
      0
    );

  const totalPrice =
    cart.reduce(
      (acc, item) =>
        acc +
        item.qty *
          item.price,
      0
    );

  const handleCheckout =
    () => {
      navigate(
        "/checkout"
      );
    };

  return (
    <>
      <TopBar
        title="Kasir"
        subtitle={`${totalItems} item`}
      />

      <div
        className="
          p-4
          pb-40
          space-y-5
        "
      >
        <SearchBar
          placeholder="Cari produk..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <div
          className="
            flex
            gap-3
            overflow-x-auto
          "
        >
          {categories.map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(
                    item
                  )
                }
                className={`
                  px-5
                  py-3

                  rounded-full

                  whitespace-nowrap

                  transition

                  ${
                    category ===
                    item
                      ? "bg-orange-500 text-black font-semibold"
                      : "bg-[#1B2122] border border-white/10"
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >
          {filteredProducts.length >
          0 ? (
            filteredProducts.map(
              (product) => (
                <POSProductCard
                  key={product.id}
                  product={product}
                  qty={
                    cart.find(
                      (item) =>
                        item.id ===
                        product.id
                    )?.qty || 0
                  }
                  onAdd={addToCart}
                />
              )
            )
          ) : (
            <div className="col-span-2">
              <EmptyState
                title="Produk tidak ditemukan"
                subtitle="Coba kata kunci lain"
              />
            </div>
          )}
        </div>
      </div>

      <CheckoutBar
        totalItems={
          totalItems
        }
        totalPrice={
          totalPrice
        }
        onCheckout={
          handleCheckout
        }
      />
    </>
  );
}