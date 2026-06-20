export default function CategoryChip({
  label,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4
        py-2

        rounded-full

        transition

        ${
          active
            ? "bg-(--brand-primary) text-white"
            : "bg-(--bg-card) text-slate-300"
        }
      `}
    >
      {label}
    </button>
  );
}