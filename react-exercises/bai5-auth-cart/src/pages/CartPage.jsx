import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../api.js";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, total, change, remove, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    clear();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section className="py-16 text-center">
        <p className="mb-4 text-xl font-semibold text-green-600">
          Đặt hàng thành công!
        </p>
        <Link to="/" className="text-violet-600 hover:underline">
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-16 text-center">
        <p className="mb-4 text-slate-500">Giỏ hàng đang trống</p>
        <Link to="/" className="text-violet-600 hover:underline">
          Xem sản phẩm
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Giỏ hàng</h1>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-16 w-16 rounded bg-slate-100 object-contain"
            />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-slate-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => change(item.id, -1)}
                className="px-3 py-1 hover:bg-slate-100"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => change(item.id, 1)}
                className="px-3 py-1 hover:bg-slate-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => remove(item.id)}
              className="text-red-500 hover:underline"
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <p className="text-lg">
          Tổng cộng:{" "}
          <span className="font-bold text-violet-600">{formatPrice(total)}</span>
        </p>
        <button
          onClick={handleCheckout}
          className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700"
        >
          Thanh toán
        </button>
      </div>
    </section>
  );
}
