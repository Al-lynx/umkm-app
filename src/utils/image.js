export const PRODUCT_PLACEHOLDER =
  "https://placehold.co/600x600/1B2122/F97316?text=Product";

export function getProductImage(
  image
) {
  if (
    !image ||
    image.trim() === ""
  ) {
    return PRODUCT_PLACEHOLDER;
  }

  return image;
}