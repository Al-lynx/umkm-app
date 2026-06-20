export default function SectionTitle({
  title,
  action,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <h2
        className="
          text-lg
          font-semibold
        "
      >
        {title}
      </h2>

      {action}
    </div>
  );
}