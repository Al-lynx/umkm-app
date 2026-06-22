import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/layout/TopBar";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import { getProducts, saveProducts } from "../../services/storageService";

import { getProductImage } from "../../utils/image";

export default function ProductListPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => getProducts());
  const [search, setSearch] = useState("");

  // FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE PRODUCT
  const handleDelete = (id) => {
    const confirmDelete = confirm("Hapus produk ini?");
    if (!confirmDelete) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    saveProducts(updatedProducts);
    setProducts(updatedProducts);
  };

  // TOTAL STOCK
  const totalStock = products.reduce(
    (acc, item) => acc + item.stock,
    0
  );

  return (
    <>
      <TopBar
        title="Produk"
        subtitle={`${products.length} produk`}
      />

      <div className="p-4 pb-32 space-y-5">

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-4">
            <p className="text-slate-400 text-sm">
              Total Produk
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {products.length}
            </h3>
          </div>

          <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-4">
            <p className="text-slate-400 text-sm">
              Total Stok
            </p>

            <h3 className="text-2xl font-bold text-orange-400 mt-2">
              {totalStock}
            </h3>
          </div>

        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#1B2122] border border-white/10"
          />
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#1B2122] border border-white/10 rounded-3xl overflow-hidden"
            >
              <img
                src={getProductImage(product.image)}
                alt={product.name}
                loading="lazy"
                className="w-full h-44 object-cover"
              />

              <div className="p-4">

                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-lg font-bold">
                      {product.name}
                    </h3>

                    <p className="text-orange-400 font-bold mt-2">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        product.status === "aman"
                          ? "bg-green-500/20 text-green-400"
                          : product.status === "menipis"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {product.status}
                  </span>

                </div>

                <div className="flex justify-between items-center mt-4">

                  <div>
                    <p className="text-slate-400 text-sm">Stok</p>
                    <p className="font-semibold">{product.stock}</p>
                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        navigate(`/products/edit/${product.id}`)
                      }
                      className="w-10 h-10 rounded-xl bg-orange-500 text-black flex items-center justify-center"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-10 text-center">
              <Package size={42} className="mx-auto text-slate-600" />

              <h3 className="mt-4 font-semibold">
                Produk tidak ditemukan
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Tambahkan produk baru
              </p>
            </div>
          )}

        </div>

      </div>

      {/* FAB */}
      <button
        onClick={() => navigate("/products/new")}
        className="fixed bottom-24 right-5 w-16 h-16 rounded-full bg-orange-500 text-black shadow-lg flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </>
  );
}