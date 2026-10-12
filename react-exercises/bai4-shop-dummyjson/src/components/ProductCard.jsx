import { Link } from "react-router-dom";
import { formatPrice } from "../api.js";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/shop/${product.id}`} className="bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-48 w-full object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {product.category}
        </p>
        <h2 className="mb-1 line-clamp-2 font-semibold">
          <Link to={`/shop/${product.id}`} className="hover:text-orange-600">
            {product.title}
          </Link>
        </h2>
        <p className="mb-3 text-sm text-slate-500">★ {product.rating}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </article>
  );
}
