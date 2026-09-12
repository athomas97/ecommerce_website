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

export function calculateCartQuantity(cart) {
  return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}
