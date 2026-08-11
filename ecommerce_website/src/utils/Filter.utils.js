export function filter(filters, products) {
  const activeCategories = Object.entries(filters.category || {})
    .filter(([, value]) => value)
    .map(([category]) => category);

  const activeAvailability = Object.entries(filters.availability || {})
    .filter(([, value]) => value)
    .map(([availabilityKey]) => availabilityKey);

  const parseBound = (v) => {
    if (v === '' || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const minPrice = parseBound(filters.price?.min);
  const maxPrice = parseBound(filters.price?.max);

  const categoryFiltered = activeCategories.length > 0
    ? products.filter((entry) => activeCategories.includes(entry.category))
    : products;

  const productsSet = categoryFiltered.flatMap((entry) => entry.products ?? []);

  const normalizeAvailability = (text) =>
    String(text || '').toLowerCase().replace(/\s+/g, '-');

  return productsSet.filter((product) => {
    if (activeAvailability.length > 0) {
      const productKey = normalizeAvailability(product.availability);
      if (!activeAvailability.includes(productKey)) return false;
    }

    const price = Number(product.cost);
    if (!Number.isFinite(price)) return false;

    if (minPrice !== null && price < minPrice) return false;
    if (maxPrice !== null && price > maxPrice) return false;

    return true;
  });
}