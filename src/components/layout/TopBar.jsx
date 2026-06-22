import NotificationBell from "./NotificationBell";

export default function TopBar({
  title,
  subtitle,
}) {
  return (
    <header
      className="
        sticky
        top-0

        z-40

        bg-[#0F1113]/95
        backdrop-blur-xl

        border-b
        border-white/10
      "
    >
      <div
        className="
          px-4
          py-4

          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-bold
              text-white
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

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}