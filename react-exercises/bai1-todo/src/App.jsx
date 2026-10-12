import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage.jsx";

const STORAGE_KEY = "todos";

const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const tabs = [
  { to: "/all", label: "Tất cả" },
  { to: "/active", label: "Đang làm" },
  { to: "/done", label: "Hoàn thành" },
];

export default function App() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prev) => [{ id: Date.now(), text, done: false }, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearDone = () => {
    setTodos((prev) => prev.filter((t) => !t.done));
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-indigo-600">Todo App</h1>

      <nav className="mb-4 flex gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-indigo-100"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route
          path="/:filter"
          element={
            <TodoPage
              todos={todos}
              onAdd={addTodo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
              onClearDone={clearDone}
            />
          }
        />
      </Routes>
    </div>
  );
}
