import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  showSuccess,
  showWarning,
} from "../../utils/toast";

export default function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  editProduct,
}) {
  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [category, setCategory] =
    useState("Kopi");

  const [image, setImage] =
    useState("");

  useEffect(() => {
    if (editProduct) {
      setName(
        editProduct.name
      );

      setPrice(
        editProduct.price
      );

      setStock(
        editProduct.stock
      );

      setCategory(
        editProduct.category
      );

      setImage(
        editProduct.image ||
          ""
      );
    } else {
      resetForm();
    }
  }, [editProduct]);

  const resetForm =
    () => {
      setName("");
      setPrice("");
      setStock("");
      setCategory("Kopi");
      setImage("");
    };

  const handleSubmit =
    () => {
      if (
        !name.trim() ||
        !price ||
        !stock
      ) {
        showWarning(
          "Lengkapi semua data produk"
        );

        return;
      }

      const stockValue =
        Number(stock);

      const productData = {
        id: editProduct
          ? editProduct.id
          : Date.now(),

        name,

        image,

        category,

        price:
          Number(price),

        stock:
          stockValue,

        status:
          stockValue <= 0
            ? "habis"
            : stockValue <=
              10
            ? "menipis"
            : "aman",
      };

      onSave(productData);

      showSuccess(
        editProduct
          ? "Produk berhasil diperbarui"
          : "Produk berhasil ditambahkan"
      );

      resetForm();

      onClose();
    };

  if (!isOpen)
    return null;

  return (
    <div
      className="
        fixed
        inset-0

        bg-black/70
        backdrop-blur-sm

        flex
        items-center
        justify-center

        z-999
      "
    >
      <div
        className="
          w-full
          max-w-lg

          mx-4

          bg-[#1B2122]

          border
          border-white/10

          rounded-3xl

          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            p-5

            border-b
            border-white/10
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
              "
            >
              {editProduct
                ? "Edit Produk"
                : "Tambah Produk"}
            </h2>

            <p
              className="
                text-sm
                text-slate-400
              "
            >
              Kelola data produk
            </p>
          </div>

          <button
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}

        <div
          className="
            p-5
            space-y-4

            max-h-[70vh]
            overflow-y-auto
          "
        >
          {/* PREVIEW */}

          <div
            className="
              h-52

              rounded-2xl

              overflow-hidden

              border
              border-white/10
            "
          >
            <img
              src={
                image ||
                "https://placehold.co/800x500/1B2122/F97316?text=Preview"
              }
              alt="Preview"
              className="
                w-full
                h-full

                object-cover
              "
            />
          </div>

          {/* IMAGE */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                text-slate-400
              "
            >
              URL Gambar
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }
              placeholder="/products/arabica.jpg"
              className="
                w-full

                px-4
                py-3

                rounded-xl

                bg-[#252C2F]

                border
                border-white/10
              "
            />
          </div>

          {/* NAME */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                text-slate-400
              "
            >
              Nama Produk
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Kopi Arabica"
              className="
                w-full

                px-4
                py-3

                rounded-xl

                bg-[#252C2F]

                border
                border-white/10
              "
            />
          </div>

          {/* PRICE */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                text-slate-400
              "
            >
              Harga
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              placeholder="25000"
              className="
                w-full

                px-4
                py-3

                rounded-xl

                bg-[#252C2F]

                border
                border-white/10
              "
            />
          </div>

          {/* STOCK */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                text-slate-400
              "
            >
              Stok
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              placeholder="100"
              className="
                w-full

                px-4
                py-3

                rounded-xl

                bg-[#252C2F]

                border
                border-white/10
              "
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                text-slate-400
              "
            >
              Kategori
            </label>

            <div className="flex gap-2">
              {[
                "Kopi",
                "Non-Kopi",
                "Makanan",
              ].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory(
                        item
                      )
                    }
                    className={`
                      px-4
                      py-2

                      rounded-xl

                      transition

                      ${
                        category ===
                        item
                          ? "bg-orange-500 text-black font-semibold"
                          : "bg-[#252C2F]"
                      }
                    `}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            p-5

            border-t
            border-white/10

            flex
            gap-3
          "
        >
          <button
            onClick={onClose}
            className="
              flex-1

              py-3

              rounded-xl

              bg-[#252C2F]
            "
          >
            Batal
          </button>

          <button
            onClick={
              handleSubmit
            }
            className="
              flex-1

              py-3

              rounded-xl

              bg-orange-500

              text-black
              font-semibold
            "
          >
            {editProduct
              ? "Update"
              : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}