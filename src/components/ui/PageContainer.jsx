export default function PageContainer({
  children,
}) {
  return (
    <div
      className="
        p-4
        pb-32
        space-y-5
      "
    >
      {children}
    </div>
  );
}