import BottomNav from "./BottomNav";

export default function AppShell({ children }) {
  return (
    <div
      className="
        min-h-screen
        bg-(--bg-primary)
        text-(--text-primary)
      "
    >
      <main className="pb-20">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}