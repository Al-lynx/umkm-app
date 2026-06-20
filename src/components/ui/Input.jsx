export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full

        bg-[#252C2F]

        border
        border-white/10

        rounded-xl

        px-4
        py-3

        outline-none

        focus:border-orange-500
      "
    />
  );
}