import { Plus } from "lucide-react";

export default function FloatingActionButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-20
        right-4

        w-14
        h-14

        rounded-full

        bg-orange-500
        hover:bg-orange-600

        flex
        items-center
        justify-center

        shadow-lg

        transition
      "
    >
      <Plus size={24} />
    </button>
  );
}