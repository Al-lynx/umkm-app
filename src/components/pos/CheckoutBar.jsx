import {
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

export default function CheckoutBar({
  totalItems,
  totalPrice,
  onCheckout,
}) {
  if (totalItems === 0) return null;

  return (
    <div
      className="
        fixed
        bottom-20
        left-4
        right-4
        z-40
      "
    >
      <button
        onClick={onCheckout}
        className="
          w-full

          bg-orange-500

          text-black

          rounded-3xl

          px-5
          py-4

          flex
          items-center
          justify-between

          shadow-xl
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-black/10

              flex
              items-center
              justify-center
            "
          >
            <ShoppingBag size={22} />
          </div>

          <div className="text-left">
            <p className="font-bold">
              {totalItems} Item
            </p>

            <p className="text-sm opacity-80">
              Rp{" "}
              {totalPrice.toLocaleString(
                "id-ID"
              )}
            </p>
          </div>
        </div>

        <ChevronRight size={24} />
      </button>
    </div>
  );
}