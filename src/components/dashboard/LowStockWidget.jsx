import {
  AlertTriangle,
} from "lucide-react";

export default function LowStockWidget({
  products,
}) {
  const lowStock =
    products.filter(
      (product) =>
        product.stock <= 10
    );

  if (
    lowStock.length === 0
  ) {
    return (
      <div
        className="
          bg-[#1B2122]
          border border-white/10

          rounded-3xl

          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          Stok Produk
        </h3>

        <div
          className="
            text-center
            py-6

            text-green-400
          "
        >
          Semua stok aman
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        bg-[#1B2122]
        border border-orange-500/20

        rounded-3xl

        p-5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2

          mb-4
        "
      >
        <AlertTriangle
          size={18}
          className="
            text-orange-400
          "
        />

        <h3
          className="
            font-bold
          "
        >
          Perlu Restock
        </h3>
      </div>

      <div className="space-y-3">
        {lowStock.map(
          (product) => (
            <div
              key={
                product.id
              }
              className="
                bg-[#252C2F]

                rounded-2xl

                p-3

                flex
                justify-between
              "
            >
              <span>
                {
                  product.name
                }
              </span>

              <span
                className="
                  text-orange-400
                  font-bold
                "
              >
                {
                  product.stock
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}