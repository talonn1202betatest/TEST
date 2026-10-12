import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `font-medium transition hover:text-emerald-600 ${
    isActive ? "text-emerald-600" : "text-slate-600"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-bold text-emerald-600">
            DevBlog
          </NavLink>
          <nav className="flex gap-6">
            <NavLink to="/" end className={linkClass}>
              Bài viết
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              Giới thiệu
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-sm text-slate-400">
        DevBlog - Bài tập React Router
      </footer>
    </div>
  );
}
