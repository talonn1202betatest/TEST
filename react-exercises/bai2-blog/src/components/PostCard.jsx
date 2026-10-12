import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="flex flex-col rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <span className="mb-2 w-fit rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-700">
        {post.category}
      </span>
      <h2 className="mb-2 text-lg font-semibold">
        <Link to={`/posts/${post.id}`} className="hover:text-emerald-600">
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 flex-1 text-sm text-slate-600">{post.excerpt}</p>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{post.author}</span>
        <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
      </div>
    </article>
  );
}
