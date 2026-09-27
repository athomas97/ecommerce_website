export const createFilters = (options) =>
  Object.fromEntries(
    Object.values(options).map((value) => [value, false])
  );

export const createCheckboxes = (options) =>
  Object.values(options).map((value) => ({
    id: value,
    label_name: formatIdToName(value),
  }));

export function formatIdToName(id) {
  return (
    id.trim()
    .replaceAll("-", " ")
    .replace(/\b\w/g, char => char.toUpperCase())
  );
}

export function formatNameToId(name) {
  return (
    name.trim()
    .replaceAll(" ", "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/\b\w/g, char => char.toLowerCase())
  );
}

export function calculateCartQuantity(cart) {
  return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}

export function calculatePercentLeftForFreeShipping(
  amnt_to_qualify_free_shipping,
  subtotal
) {
  return Math.min(
    100,
    (subtotal / amnt_to_qualify_free_shipping) * 100
  );
}
