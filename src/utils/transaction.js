export const generateTransaction =
  ({
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
  }) => {
    return {
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
  };