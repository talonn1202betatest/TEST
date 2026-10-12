import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? "/";

  const [form, setForm] = useState({ username: "emilys", password: "emilyspass" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await login(form.username.trim(), form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto mt-10 max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold">Đăng nhập</h1>

        {location.state?.from && (
          <p className="rounded bg-amber-50 p-2 text-sm text-amber-700">
            Bạn cần đăng nhập để truy cập trang này
          </p>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Tên đăng nhập</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-violet-600 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-center text-xs text-slate-400">
          Tài khoản thử: emilys / emilyspass
        </p>
      </form>
    </section>
  );
}
