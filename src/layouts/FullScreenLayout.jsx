import { Outlet } from "react-router-dom";

export default function FullScreenLayout() {
  return (
    <div
      className="
        min-h-screen

        bg-[#0F1113]
        text-white
      "
    >
      <Outlet />
    </div>
  );
}