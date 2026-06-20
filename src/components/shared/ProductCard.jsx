import { useState } from "react";

import {
  getProductImage,
} from "../../utils/image";

import {
  MoreVertical,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

const statusStyle = {
  aman:
    "bg-green-500/15 text-green-400 border border-green-500/20",

  menipis:
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

  habis:
    "bg-red-500/15 text-red-400 border border-red-500/20",
};

const statusLabel = {
  aman: "Stok Aman",
  menipis: "Menipis",
  habis: "Habis",
};

export default function ProductCard({
  name,
  image,
  price,
  stock,
  status,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <div
      className="
        relative

        bg-[#1B2122]

        border
        border-white/10

        rounded-3xl

        overflow-hidden

        hover:border-orange-500/30

        transition-all
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative

          h-48

          overflow-hidden
        "
      >
        {image ? (
          <img
            src={getProductImage(
              image
            )}
            alt={name}
            loading="lazy"
            className="
              w-16
              h-16

              rounded-xl
              object-cover
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full

              bg-[#252C2F]

              flex
              items-center
              justify-center
            "
          >
            <Package
              size={50}
              className="
                text-slate-600
              "
            />
          </div>
        )}

        <div
          className="
            absolute
            top-3
            left-3
          "
        >
          <span
            className={`
              px-3
              py-1

              rounded-full

              text-xs
              font-medium

              backdrop-blur-xl

              ${statusStyle[status]}
            `}
          >
            {
              statusLabel[
                status
              ]
            }
          </span>
        </div>

        <div
          className="
            absolute
            top-3
            right-3
          "
        >
          <button
            onClick={() =>
              setShowMenu(
                !showMenu
              )
            }
            className="
              w-10
              h-10

              rounded-full

              bg-black/50

              backdrop-blur-xl

              flex
              items-center
              justify-center
            "
          >
            <MoreVertical
              size={18}
            />
          </button>

          {showMenu && (
            <div
              className="
                absolute
                top-12
                right-0

                w-36

                bg-[#252C2F]

                border
                border-white/10

                rounded-2xl

                overflow-hidden

                z-30
              "
            >
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(
                    false
                  );
                }}
                className="
                  w-full

                  flex
                  items-center
                  gap-2

                  px-4
                  py-3

                  hover:bg-white/5
                "
              >
                <Pencil
                  size={16}
                />
                Edit
              </button>

              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(
                    false
                  );
                }}
                className="
                  w-full

                  flex
                  items-center
                  gap-2

                  px-4
                  py-3

                  text-red-400

                  hover:bg-white/5
                "
              >
                <Trash2
                  size={16}
                />
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-4">

        <h3
          className="
            text-lg
            font-bold
          "
        >
          {name}
        </h3>

        <div
          className="
            flex
            justify-between
            items-end

            mt-4
          "
        >
          <div>
            <p
              className="
                text-slate-500
                text-sm
              "
            >
              Stok
            </p>

            <p
              className="
                font-semibold
              "
            >
              {stock}
            </p>
          </div>

          <h3
            className="
              text-orange-400

              text-xl
              font-bold
            "
          >
            Rp{" "}
            {price.toLocaleString(
              "id-ID"
            )}
          </h3>
        </div>

      </div>
    </div>
  );
}