export default function TopProductCard({
  product,
  sold,
}) {
  return (
    <div
      className="
        flex
        justify-between
        items-center

        bg-[#1B2122]
        border border-white/10

        rounded-2xl

        p-4
      "
    >
      <div>
        <h3 className="font-medium">
          {product}
        </h3>

        <p
          className="
            text-slate-500
            text-sm
          "
        >
          Produk Terlaris
        </p>
      </div>

      <span
        className="
          text-orange-400
          font-bold
        "
      >
        {sold}
      </span>
    </div>
  );
}