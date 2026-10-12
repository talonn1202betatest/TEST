import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    request("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(setProfile)
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err.status === 401 || err.status === 403) {
          logout();
          navigate("/login", { replace: true, state: { from: "/profile" } });
          return;
        }
        setError(err.message);
      });

    return () => controller.abort();
  }, [token, logout, navigate]);

  if (error) {
    return <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>;
  }

  if (!profile) {
    return <p className="py-12 text-center text-slate-400">Đang tải...</p>;
  }

  const rows = [
    ["Họ tên", `${profile.firstName} ${profile.lastName}`],
    ["Tên đăng nhập", profile.username],
    ["Email", profile.email],
    ["Điện thoại", profile.phone],
    ["Giới tính", profile.gender],
    ["Thành phố", profile.address?.city],
  ];

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <img
          src={profile.image}
          alt={profile.username}
          className="h-20 w-20 rounded-full bg-violet-100"
        />
        <div>
          <h1 className="text-xl font-bold">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-slate-500">@{profile.username}</p>
        </div>
      </div>

      <dl className="divide-y text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between py-2">
            <dt className="text-slate-500">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
