export default function PaymentMethodCard({
  title,
  icon,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-5

        rounded-3xl

        border

        transition-all

        flex
        flex-col
        items-center
        justify-center

        gap-3

        ${
          active
            ? `
              bg-orange-500/10
              border-orange-500
              text-orange-400
            `
            : `
              bg-[#1B2122]
              border-white/10
              text-slate-300
            `
        }
      `}
    >
      <div className="text-xl">
        {icon}
      </div>

      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}