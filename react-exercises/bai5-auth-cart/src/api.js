export const API_URL = "https://dummyjson.com";

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );

export const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || `Lỗi ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
};
