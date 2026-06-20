import {
  getProductImage,
} from "../../utils/image";

export default function OrderItem({
  item,
}) {
  return (
    <div
      className="
        flex
        justify-between

        py-4

        border-b
        border-white/5
      "
    >
      <div className="flex gap-3">

        <div
          className="
            w-16
            h-16

            rounded-xl

            overflow-hidden

            bg-[#252C2F]
          "
        >
          {item.image ? (
            <img
              src={getProductImage(
                item.image
              )}
              alt={item.name}
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

                flex
                items-center
                justify-center

                text-2xl
              "
            >
              ☕
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium">
            {item.name}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {item.qty}
            {" x "}
            Rp{" "}
            {item.price.toLocaleString(
              "id-ID"
            )}
          </p>
        </div>

      </div>

      <div
        className="
          text-orange-400
          font-semibold
        "
      >
        Rp{" "}
        {(
          item.qty *
          item.price
        ).toLocaleString("id-ID")}
      </div>
    </div>
  );
}