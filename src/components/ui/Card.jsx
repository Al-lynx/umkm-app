export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-[#1B2122]
        border border-white/10

        rounded-3xl
        p-4

        ${className}
      `}
    >
      {children}
    </div>
  );
}