export const generateInvoiceNumber =
  () => {
    const now = new Date();

    const y =
      now.getFullYear();

    const m = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const d = String(
      now.getDate()
    ).padStart(2, "0");

    const random = Math.floor(
      100 + Math.random() * 900
    );

    return `INV-${y}${m}${d}-${random}`;
  };