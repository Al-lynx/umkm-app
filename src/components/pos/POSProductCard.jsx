import {
  ShoppingCart,
} from "lucide-react";

import {
  getProductImage,
} from "../../utils/image";

export default function POSProductCard({
  product,
  qty,
  onAdd,
}) {
  return (
    <button
      disabled={
        product.stock <= 0
      }
      onClick={() =>
        onAdd(product)
      }
      className="
        relative

        overflow-hidden

        rounded-3xl

        border
        border-white/10

        bg-[#1B2122]

        hover:border-orange-500/30

        transition-all

        disabled:opacity-50
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative

          h-44

          overflow-hidden
        "
      >
        <img
          src={getProductImage(
            product.image
          )}
          alt={product.name}
          loading="lazy"
          className="
            w-full
            h-44

            object-cover
          "
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x600/1B2122/F97316?text=Product";
          }}
        />

        {/* STOCK */}

        <div
          className="
            absolute
            top-3
            right-3

            bg-black/60

            backdrop-blur-xl

            px-3
            py-1

            rounded-full

            text-xs

            border
            border-orange-500/20

            text-orange-400
          "
        >
          Stok{" "}
          {
            product.stock
          }
        </div>

        {/* QTY */}

        {qty > 0 && (
          <div
            className="
              absolute
              top-3
              left-3

              w-10
              h-10

              rounded-full

              bg-orange-500

              text-black
              font-bold

              flex
              items-center
              justify-center
            "
          >
            {qty}
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-4">

        <h3
          className="
            font-bold
            text-lg

            text-left

            line-clamp-1
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-orange-400

            text-xl
            font-bold

            mt-3

            text-left
          "
        >
          Rp{" "}
          {product.price.toLocaleString(
            "id-ID"
          )}
        </p>

        <div
          className="
            mt-4

            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {
              product.category
            }
          </span>

          <div
            className="
              w-9
              h-9

              rounded-full

              bg-orange-500

              flex
              items-center
              justify-center
            "
          >
            <ShoppingCart
              size={18}
              className="
                text-black
              "
            />
          </div>
        </div>

      </div>

      {/* OUT OF STOCK */}

      {product.stock <= 0 && (
        <div
          className="
            absolute
            inset-0

            bg-black/70

            flex
            items-center
            justify-center

            text-red-400
            font-bold
            text-lg
          "
        >
          STOK HABIS
        </div>
      )}
    </button>
  );
}