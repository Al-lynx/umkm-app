import { Package } from "lucide-react";

export default function EmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        py-16

        flex
        flex-col
        items-center
        justify-center

        text-center
      "
    >
      <div
        className="
          w-20
          h-20

          rounded-full

          bg-[#1B2122]

          flex
          items-center
          justify-center

          mb-5
        "
      >
        <Package
          size={34}
          className="text-slate-500"
        />
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p
        className="
          text-slate-500
          mt-2
          max-w-xs
        "
      >
        {description}
      </p>
    </div>
  );
}