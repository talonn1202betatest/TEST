import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const linkClass = ({ isActive }) =>
  `font-medium transition hover:text-violet-600 ${
    isActive ? "text-violet-600" : "text-slate-600"
  }`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-violet-600">
          AuthShop
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>
            Sản phẩm
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Giỏ hàng
            {count > 0 && (
              <span className="ml-1.5 rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">
                {count}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={linkClass}>
                {user.firstName}
              </NavLink>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg bg-violet-600 px-3 py-1 text-sm font-medium text-white hover:bg-violet-700"
            >
              Đăng nhập
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
