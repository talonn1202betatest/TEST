import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductFormPage from "./pages/ProductFormPage.jsx";

const STORAGE_KEY = "products";

const seedProducts = [
  {
    id: 1,
    name: "iPhone 15",
    price: 22990000,
    quantity: 12,
    category: "Điện thoại",
    description: "Màn hình 6.1 inch, chip A16 Bionic.",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: 28990000,
    quantity: 5,
    category: "Laptop",
    description: "Mỏng nhẹ, pin 18 giờ.",
  },
  {
    id: 3,
    name: "Tai nghe Bluetooth",
    price: 890000,
    quantity: 40,
    category: "Phụ kiện",
    description: "Chống ồn chủ động, pin 30 giờ.",
  },
];

const loadProducts = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedProducts;
  } catch {
    return seedProducts;
  }
};

export default function App() {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (data) => {
    setProducts((prev) => [{ ...data, id: Date.now() }, ...prev]);
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-sky-600">
          Quản lý sản phẩm
        </Link>
        <Link
          to="/products/new"
          className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
        >
          + Thêm sản phẩm
        </Link>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ProductListPage products={products} onRemove={removeProduct} />
          }
        />
        <Route
          path="/products/new"
          element={<ProductFormPage onSave={addProduct} />}
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProductFormPage products={products} onSave={updateProduct} />
          }
        />
        <Route
          path="*"
          element={<p className="py-12 text-center text-slate-400">404</p>}
        />
      </Routes>
    </div>
  );
}
