export const formatDate = (
  value
) => {
  return new Date(
    value
  ).toLocaleString(
    "id-ID"
  );
};