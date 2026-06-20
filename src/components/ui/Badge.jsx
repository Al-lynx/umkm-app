export default function Badge({
  children,
}) {
  return (
    <span
      className="
        px-3
        py-1

        rounded-full

        bg-orange-500/10
        text-orange-400

        text-xs
      "
    >
      {children}
    </span>
  );
}