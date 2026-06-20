import {
  Package,
} from "lucide-react";

export default function EmptyState({
  title,
  subtitle,
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center

        py-16
      "
    >
      <div
        className="
          w-20
          h-20

          rounded-full

          bg-[#252C2F]

          flex
          items-center
          justify-center
        "
      >
        <Package
          size={36}
          className="text-slate-500"
        />
      </div>

      <h3
        className="
          mt-4
          text-lg
          font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
          text-slate-500
          text-sm
          mt-1
        "
      >
        {subtitle}
      </p>
    </div>
  );
}