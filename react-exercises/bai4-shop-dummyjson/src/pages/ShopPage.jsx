import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL, PAGE_SIZE, buildListUrl } from "../api.js";
import useFetch from "../hooks/useFetch.js";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { ErrorMessage, Loading } from "../components/Status.jsx";

export default function ShopPage({ onAdd }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [keyword, setKeyword] = useState(q);

  const { data, loading, error } = useFetch(buildListUrl({ q, category, page }));
  const { data: categories } = useFetch(`${BASE_URL}/category-list`);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = keyword.trim();
    setSearchParams(value ? { q: value } : {});
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setKeyword("");
    setSearchParams(value ? { category: value } : {});
  };

  const handlePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", nextPage);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
          >
            Tìm
          </button>
        </form>
        <select
          value={category}
          onChange={handleCategory}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-orange-500"
        >
          <option value="">Tất cả danh mục</option>
          {categories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {data && data.products.length === 0 && (
        <p className="py-12 text-center text-slate-400">
          Không có sản phẩm phù hợp
        </p>
      )}

      {data && data.products.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">{data.total} sản phẩm</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={handlePage} />
        </>
      )}
    </section>
  );
}
