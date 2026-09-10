// TODO: Come up with a better name
export const createFilters = (options) =>
  Object.fromEntries(
    Object.values(options).map((value) => [value, false])
  );

export const createCheckboxes = (options) =>
  Object.values(options).map((value) => ({
    id: value,
    label_name: formatIdToName(value),
  }));

// TODO: Come up with a better name
function formatIdToName(id) {
  return (
    id.trim()
    .replaceAll("-", " ")
    .replace(/\b\w/g, char => char.toUpperCase())
  );
}