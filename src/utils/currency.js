export const formatRupiah = (
  value
) => {
  return (
    "Rp " +
    value.toLocaleString(
      "id-ID"
    )
  );
};