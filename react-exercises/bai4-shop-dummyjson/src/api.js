export const BASE_URL = "https://dummyjson.com/products";
export const PAGE_SIZE = 12;

export const buildListUrl = ({ q, category, page }) => {
  const skip = (page - 1) * PAGE_SIZE;
  const paging = `limit=${PAGE_SIZE}&skip=${skip}`;

  if (q) return `${BASE_URL}/search?q=${encodeURIComponent(q)}&${paging}`;
  if (category) return `${BASE_URL}/category/${category}?${paging}`;
  return `${BASE_URL}?${paging}`;
};

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );
