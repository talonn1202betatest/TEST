import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../components/ProductForm.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductListPage({ products, onRemove }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword.trim().toLowerCase()) &&
      (!category || p.category === category)
  );

  const totalValue = filtered.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleRemove = (product) => {
    if (window.confirm(`Xoá "${product.name}"?`)) {
      onRemove(product.id);
    }
  };

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-sky-500"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3 text-right">Giá</th>
              <th className="px-4 py-3 text-right">SL</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Chưa có sản phẩm nào
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.description}</p>
                </td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-right">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-right">{p.quantity}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/products/${p.id}/edit`}
                    className="mr-3 text-sky-600 hover:underline"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleRemove(p)}
                    className="text-red-500 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-right text-sm text-slate-500">
        {filtered.length} sản phẩm · Tổng giá trị kho: {formatPrice(totalValue)}
      </p>
    </section>
  );
}
