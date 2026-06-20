import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full

          bg-[#1B2122]

          border
          border-white/10

          rounded-2xl

          pl-11
          pr-4
          py-3.5

          outline-none

          focus:border-orange-500/50
        "
      />
    </div>
  );
}