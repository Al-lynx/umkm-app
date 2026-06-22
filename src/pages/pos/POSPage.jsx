import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import TopBar from "../../components/layout/TopBar";

import SearchBar from "../../components/shared/SearchBar";

import EmptyState from "../../components/shared/EmptyState";

import POSProductCard from "../../components/pos/POSProductCard";

import CheckoutBar from "../../components/pos/CheckoutBar";

import {
  getProducts,
} from "../../services/productService";

import {
  getCart,
  saveCart,
  addToCart,
  getCartSummary,
} from "../../services/cartService";

export default function POSPage() {
  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

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
    products.filter(
      (product) => {
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
      }
    );

  const handleAddToCart = (
    product
  ) => {
    setCart(
      addToCart(
        cart,
        product
      )
    );
  };

  const {
    totalItems,
    totalPrice,
  } = getCartSummary(cart);

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
                  onAdd={
                    handleAddToCart
                  }
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