import {
  formatRupiah,
} from "../../utils/currency";

export default function RecentTransactionCard({
  transaction,
}) {
  return (
    <div
      className="
        bg-[#1B2122]
        border border-white/10

        rounded-2xl
        p-4
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h3 className="font-medium">
            #{transaction.id}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {transaction.date}
          </p>
        </div>

        <span
          className="
            text-orange-400
            font-bold
          "
        >
          {formatRupiah(
            transaction.total
          )}
        </span>
      </div>
    </div>
  );
}