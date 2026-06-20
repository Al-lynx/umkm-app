export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        py-3
        px-5

        rounded-xl

        bg-orange-500
        hover:bg-orange-600

        text-black
        font-semibold

        transition

        ${className}
      `}
    >
      {children}
    </button>
  );
}