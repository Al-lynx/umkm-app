import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import ProductImagePicker from "../../components/products/ProductImagePicker";

import {
  getProducts,
  saveProducts,
} from "../../services/storageService";

import {
  showSuccess,
  showWarning,
} from "../../utils/toast";

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const product = isEdit
    ? getProducts().find((item) => String(item.id) === id)
    : null;

  const [name, setName] = useState(() => (product ? product.name : ""));
  const [price, setPrice] = useState(() => (product ? product.price : ""));
  const [stock, setStock] = useState(() => (product ? product.stock : ""));
  const [category, setCategory] = useState(() => (product ? product.category : "Kopi"));
  const [image, setImage] = useState(() => (product ? (product.image || "") : ""));

  useEffect(() => {
    if (isEdit && !product) {
      navigate("/products");
    }
  }, [isEdit, product, navigate]);

  const handleSave = () => {
    if (!name.trim() || !price || !stock) {
      showWarning("Lengkapi semua data");
      return;
    }

    const stockValue = Number(stock);

    const productData = {
      id: isEdit ? Number(id) : Date.now(),
      name,
      image,
      category,
      price: Number(price),
      stock: stockValue,
      status:
        stockValue <= 0
          ? "habis"
          : stockValue <= 10
          ? "menipis"
          : "aman",
    };

    const products = getProducts();

    const updated = isEdit
      ? products.map((item) =>
          item.id === productData.id ? productData : item
        )
      : [productData, ...products];

    saveProducts(updated);

    showSuccess(
      isEdit ? "Produk diperbarui" : "Produk ditambahkan"
    );

    navigate("/products");
  };

  return (
    <div className="min-h-screen pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#0F1113]/95 backdrop-blur-xl border-b border-white/10 p-4 flex items-center gap-4">

        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <div>
          <h1 className="font-bold text-xl">
            {isEdit ? "Edit Produk" : "Tambah Produk"}
          </h1>
          <p className="text-sm text-slate-400">
            Kelola data produk
          </p>
        </div>

      </div>

      <div className="p-5 space-y-5">

        <ProductImagePicker image={image} setImage={setImage} />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Produk"
          className="w-full p-4 rounded-2xl bg-[#1B2122] border border-white/10"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Harga"
          className="w-full p-4 rounded-2xl bg-[#1B2122] border border-white/10"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stok"
          className="w-full p-4 rounded-2xl bg-[#1B2122] border border-white/10"
        />

        <div className="flex gap-2">
          {["Kopi", "Non-Kopi", "Makanan"].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-3 rounded-xl ${
                category === item
                  ? "bg-orange-500 text-black"
                  : "bg-[#1B2122]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0F1113]/95 backdrop-blur-xl border-t border-white/10 p-4">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-orange-500 text-black font-bold"
        >
          {isEdit ? "Update Produk" : "Simpan Produk"}
        </button>
      </div>

    </div>
  );
}