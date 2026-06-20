export default function SettingCard({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
        bg-[#1B2122]
        border border-white/10

        rounded-3xl

        p-5
      "
    >
      <h3 className="font-semibold">
        {title}
      </h3>

      <p
        className="
          text-slate-500
          text-sm
          mt-2
        "
      >
        {description}
      </p>

      <div className="mt-4">
        {action}
      </div>
    </div>
  );
}