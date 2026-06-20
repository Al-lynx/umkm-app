import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Wallet,
  QrCode,
  Landmark,
  CreditCard,
} from "lucide-react";

import OrderItem from "../../components/checkout/OrderItem";
import PaymentMethodCard from "../../components/checkout/PaymentMethodCard";
import QRISPayment from "../../components/checkout/QRISPayment";

import ReceiptModal from "../../components/receipt/ReceiptModal";

import {
  getCart,
  clearCart,
  getTransactions,
  saveTransactions,
  updateProductStock,
} from "../../utils/storage";

import {
  showSuccess,
} from "../../utils/toast";

export default function CheckoutPage() {
  const navigate =
    useNavigate();

  const cart = getCart();

  const [paymentMethod, setPaymentMethod] =
    useState("Tunai");

  const [showReceipt, setShowReceipt] =
    useState(false);

  const [lastTransaction, setLastTransaction] =
    useState(null);

  const subtotal =
    cart.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  const tax =
    Math.round(
      subtotal * 0.11
    );

  const total =
    subtotal + tax;

  const handlePayment =
    () => {
      if (
        cart.length === 0
      ) {
        return;
      }

      const transactions =
        getTransactions();

      const transaction = {
        id: Date.now(),

        createdAt:
          new Date().toISOString(),

        date:
          new Date().toLocaleString(
            "id-ID"
          ),

        paymentMethod,

        subtotal,

        tax,

        total,

        items: cart,
      };

      saveTransactions([
        transaction,
        ...transactions,
      ]);

      updateProductStock(
        cart
      );

      clearCart();

      setLastTransaction(
        transaction
      );

      setShowReceipt(true);

      showSuccess(
        "Pembayaran berhasil"
      );
    };

  return (
    <>
      <div className="min-h-screen pb-32">

        {/* HEADER */}

        <div
          className="
            sticky
            top-0

            bg-[#0F1113]

            border-b
            border-white/10

            p-4

            flex
            items-center
            gap-4

            z-10
          "
        >
          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowLeft />
          </button>

          <h1
            className="
              text-xl
              font-bold
              text-orange-400
            "
          >
            Checkout
          </h1>
        </div>

        {/* CONTENT */}

        <div className="p-4 space-y-5">

          <div
            className="
              bg-[#1B2122]

              border
              border-white/10

              rounded-3xl

              p-4
            "
          >
            {cart.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
              />
            ))}

            <div className="mt-5 space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Subtotal
                </span>

                <span>
                  Rp{" "}
                  {subtotal.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Pajak (11%)
                </span>

                <span>
                  Rp{" "}
                  {tax.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

              <div
                className="
                  pt-3

                  border-t
                  border-white/10

                  flex
                  justify-between

                  text-xl
                  font-bold
                "
              >
                <span>Total</span>

                <span className="text-orange-400">
                  Rp{" "}
                  {total.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

            </div>
          </div>

          {/* PAYMENT */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            <PaymentMethodCard
              title="Tunai"
              icon={<Wallet />}
              active={
                paymentMethod ===
                "Tunai"
              }
              onClick={() =>
                setPaymentMethod(
                  "Tunai"
                )
              }
            />

            <PaymentMethodCard
              title="QRIS"
              icon={<QrCode />}
              active={
                paymentMethod ===
                "QRIS"
              }
              onClick={() =>
                setPaymentMethod(
                  "QRIS"
                )
              }
            />

            <PaymentMethodCard
              title="Transfer"
              icon={<Landmark />}
              active={
                paymentMethod ===
                "Transfer"
              }
              onClick={() =>
                setPaymentMethod(
                  "Transfer"
                )
              }
            />

            <PaymentMethodCard
              title="E-Wallet"
              icon={<CreditCard />}
              active={
                paymentMethod ===
                "E-Wallet"
              }
              onClick={() =>
                setPaymentMethod(
                  "E-Wallet"
                )
              }
            />
          </div>

          {paymentMethod ===
            "QRIS" && (
            <QRISPayment />
          )}

        </div>

        {/* FOOTER */}

        <div
          className="
            fixed
            bottom-0
            left-0
            right-0

            p-4

            bg-[#0F1113]

            border-t
            border-white/10
          "
        >
          <button
            onClick={
              handlePayment
            }
            disabled={
              cart.length === 0
            }
            className="
              w-full

              py-4

              rounded-2xl

              bg-orange-500

              text-black
              font-bold

              disabled:opacity-50
            "
          >
            Konfirmasi Pembayaran
          </button>
        </div>

      </div>

      <ReceiptModal
        isOpen={
          showReceipt
        }
        transaction={
          lastTransaction
        }
        onClose={() => {
          setShowReceipt(
            false
          );

          navigate(
            "/reports"
          );
        }}
      />
    </>
  );
}