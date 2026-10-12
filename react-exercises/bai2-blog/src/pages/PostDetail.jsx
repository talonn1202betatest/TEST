import { Link, useNavigate, useParams } from "react-router-dom";
import { posts } from "../data/posts.js";
import NotFound from "./NotFound.jsx";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <NotFound />;

  const related = posts.filter(
    (p) => p.category === post.category && p.id !== post.id
  );

  return (
    <article>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-slate-500 hover:text-emerald-600"
      >
        ← Quay lại
      </button>

      <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-700">
        {post.category}
      </span>
      <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
      <p className="mb-6 mt-2 text-sm text-slate-400">
        {post.author} · {new Date(post.date).toLocaleDateString("vi-VN")}
      </p>

      <div className="space-y-4 leading-relaxed text-slate-700">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <aside className="mt-10 border-t pt-6">
          <h2 className="mb-3 font-semibold">Bài viết liên quan</h2>
          <ul className="space-y-2">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/posts/${p.id}`}
                  className="text-emerald-600 hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
