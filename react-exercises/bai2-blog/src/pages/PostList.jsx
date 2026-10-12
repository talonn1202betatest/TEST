import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { categories, posts } from "../data/posts.js";

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const filtered = posts.filter((post) => {
    const matchKeyword = post.title
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
    const matchCategory = !category || post.category === category;
    return matchKeyword && matchCategory;
  });

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={keyword}
          onChange={(e) => updateParam("q", e.target.value)}
          placeholder="Tìm theo tiêu đề..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-emerald-500"
        />
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-emerald-500"
        >
          <option value="">Tất cả chuyên mục</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-slate-400">
          Không tìm thấy bài viết phù hợp
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
