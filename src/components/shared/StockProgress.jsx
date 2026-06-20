export default function StockProgress({
  stock,
  maxStock = 50,
}) {
  const percentage = Math.min(
    (stock / maxStock) * 100,
    100
  );

  const getColor = () => {
    if (stock <= 0)
      return "bg-red-500";

    if (stock <= 10)
      return "bg-yellow-500";

    return "bg-green-500";
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>Stok</span>
        <span>
          {stock}/{maxStock}
        </span>
      </div>

      <div
        className="
          h-2
          bg-[#252C2F]
          rounded-full
          overflow-hidden
        "
      >
        <div
          className={`
            h-full
            ${getColor()}
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}