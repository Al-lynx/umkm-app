import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
      setName("");
      setPrice("");
      setStock("");
      setCategory("Kopi");
      setImage("");
    }
  }, [editProduct]);

  if (!isOpen) return null;

  const handleSubmit =
    () => {
      if (
        !name ||
        !price ||
        !stock
      ) {
        alert(
          "Lengkapi semua data"
        );

        return;
      }

      const stockNumber =
        Number(stock);

      const productData = {
        id: editProduct
          ? editProduct.id
          : Date.now(),

        name,

        price:
          Number(price),

        stock:
          stockNumber,

        category,

        image,

        status:
          stockNumber <= 0
            ? "habis"
            : stockNumber <=
              10
            ? "menipis"
            : "aman",
      };

      onSave(productData);

      onClose();
    };

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

        z-50
      "
    >
      <div
        className="
          bg-[#1B2122]

          border
          border-white/10

          rounded-3xl

          w-full
          max-w-md

          mx-4

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
                mt-1
              "
            >
              Kelola data produk
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              text-slate-400
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}

        <div
          className="
            p-5
            space-y-4

            max-h-[75vh]
            overflow-y-auto
          "
        >
          {/* PREVIEW IMAGE */}

          <div
            className="
              w-full
              h-48

              rounded-2xl

              overflow-hidden

              border
              border-white/10
            "
          >
            <img
              src={
                image ||
                "https://placehold.co/600x400/1B2122/F97316?text=Preview"
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

                outline-none

                focus:border-orange-500
              "
            />
          </div>

          {/* NAMA */}

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

                outline-none

                focus:border-orange-500
              "
            />
          </div>

          {/* HARGA */}

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

                outline-none

                focus:border-orange-500
              "
            />
          </div>

          {/* STOK */}

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
              placeholder="50"
              className="
                w-full

                px-4
                py-3

                rounded-xl

                bg-[#252C2F]

                border
                border-white/10

                outline-none

                focus:border-orange-500
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
              hover:bg-orange-600

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