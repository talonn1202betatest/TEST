import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice, request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();
  const { add } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const path = query
      ? `/products/search?q=${encodeURIComponent(query)}&limit=20`
      : "/products?limit=20";

    setLoading(true);
    setError("");
    request(path, { signal: controller.signal })
      .then((data) => setProducts(data.products))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(keyword.trim());
  };

  const handleAdd = (product) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    add(product);
  };

  return (
    <section>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700"
        >
          Tìm
        </button>
      </form>

      {loading && <p className="py-12 text-center text-slate-400">Đang tải...</p>}
      {error && <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="py-12 text-center text-slate-400">Không có sản phẩm</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="h-44 w-full bg-slate-100 object-contain"
            />
            <div className="flex flex-1 flex-col p-4">
              <h2 className="mb-1 line-clamp-2 font-semibold">{product.title}</h2>
              <p className="mb-3 text-sm text-slate-500">★ {product.rating}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-violet-600">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => handleAdd(product)}
                  className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm text-white hover:bg-violet-700"
                >
                  Thêm
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
