export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-5">
      <h1
        className="
          text-3xl
          font-bold
          text-orange-400
        "
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}