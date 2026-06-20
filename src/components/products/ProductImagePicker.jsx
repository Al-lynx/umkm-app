import { Image } from "lucide-react";

export default function ProductImagePicker({
  image,
  setImage,
}) {
  return (
    <div>
      <p
        className="
          text-sm
          text-slate-400
          mb-2
        "
      >
        Gambar Produk
      </p>

      <div
        className="
          h-40
          rounded-2xl

          bg-[#252C2F]

          flex
          items-center
          justify-center

          overflow-hidden
        "
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : (
          <Image
            size={40}
            className="text-slate-500"
          />
        )}
      </div>

      <input
        type="text"
        value={image}
        onChange={(e) =>
          setImage(
            e.target.value
          )
        }
        placeholder="URL gambar"
        className="
          mt-3
          w-full

          bg-[#252C2F]

          rounded-xl

          px-4
          py-3
        "
      />
    </div>
  );
}