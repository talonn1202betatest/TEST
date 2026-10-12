import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-6xl font-bold text-slate-300">404</h1>
      <p className="mb-6 mt-3 text-slate-500">Không tìm thấy trang bạn cần</p>
      <Link
        to="/"
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
