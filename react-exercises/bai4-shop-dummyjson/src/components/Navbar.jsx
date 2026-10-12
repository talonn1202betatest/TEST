import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `font-medium transition hover:text-orange-600 ${
    isActive ? "text-orange-600" : "text-slate-600"
  }`;

export default function Navbar({ cartCount }) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/shop" className="text-xl font-bold text-orange-600">
          MiniShop
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/shop" className={linkClass}>
            Cửa hàng
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Giỏ hàng
            {cartCount > 0 && (
              <span className="ml-1.5 rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
