import { Link } from "react-router-dom";
import { formatPrice } from "../api.js";

export default function CartPage({ cart, onChangeQuantity, onRemove, onClear }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="py-16 text-center">
        <p className="mb-4 text-slate-500">Giỏ hàng đang trống</p>
        <Link
          to="/shop"
          className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Giỏ hàng</h1>

      <ul className="space-y-3">
        {cart.map((item) => (
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
              <Link
                to={`/shop/${item.id}`}
                className="font-medium hover:text-orange-600"
              >
                {item.title}
              </Link>
              <p className="text-sm text-slate-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => onChangeQuantity(item.id, -1)}
                className="px-3 py-1 hover:bg-slate-100"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => onChangeQuantity(item.id, 1)}
                className="px-3 py-1 hover:bg-slate-100"
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold">
              {formatPrice(item.price * item.quantity)}
            </p>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:underline"
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <button onClick={onClear} className="text-sm text-red-500 hover:underline">
          Xoá toàn bộ giỏ hàng
        </button>
        <p className="text-lg">
          Tổng cộng:{" "}
          <span className="font-bold text-orange-600">{formatPrice(total)}</span>
        </p>
      </div>
    </section>
  );
}
