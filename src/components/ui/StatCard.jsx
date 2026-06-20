export default function StatCard({
  title,
  value,
  color = "orange",
}) {
  const colorMap = {
    orange: "text-orange-400",
    green: "text-green-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  };

  return (
    <div
      className="
        bg-[#1B2122]
        border border-white/10

        rounded-3xl
        p-5
      "
    >
      <p className="text-slate-500">
        {title}
      </p>

      <h3
        className={`
          text-2xl
          font-bold
          mt-2
          ${colorMap[color]}
        `}
      >
        {value}
      </h3>
    </div>
  );
}