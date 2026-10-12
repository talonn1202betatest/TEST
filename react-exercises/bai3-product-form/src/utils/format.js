const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const formatPrice = (value) => currency.format(value);
