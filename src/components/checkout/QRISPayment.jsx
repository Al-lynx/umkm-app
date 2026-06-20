import { QrCode } from "lucide-react";

export default function QRISPayment() {
  return (
    <div
      className="
        bg-[#1B2122]
        border border-white/10
        rounded-3xl
        p-6
        text-center
      "
    >
      <div
        className="
          w-52
          h-52
          mx-auto

          rounded-3xl

          bg-[#252C2F]

          flex
          items-center
          justify-center
        "
      >
        <QrCode
          size={120}
          className="text-orange-400"
        />
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-semibold
        "
      >
        Scan QRIS
      </h3>

      <p
        className="
          text-sm
          text-slate-500
          mt-2
        "
      >
        Placeholder QRIS
      </p>
    </div>
  );
}