export default function Modal({
  open,
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0

        bg-black/70
        backdrop-blur-sm

        flex
        items-center
        justify-center

        z-50
      "
    >
      {children}
    </div>
  );
}