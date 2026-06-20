export default function TopBar({
  title,
  subtitle,
  action,
}) {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        backdrop-blur-xl

        bg-[#0F1113]/90

        border-b
        border-white/5
      "
    >
      <div
        className="
          px-5
          py-4

          flex
          justify-between
          items-center
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-orange-400
            "
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="
                text-sm
                text-slate-400
                mt-1
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {action}
      </div>
    </header>
  );
}