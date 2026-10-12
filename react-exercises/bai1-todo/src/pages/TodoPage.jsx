import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TodoItem from "../components/TodoItem.jsx";

const filters = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

export default function TodoPage({
  todos,
  onAdd,
  onToggle,
  onRemove,
  onClearDone,
}) {
  const { filter } = useParams();
  const [text, setText] = useState("");

  if (!Object.hasOwn(filters, filter)) {
    return <Navigate to="/all" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  const visibleTodos = todos.filter(filters[filter]);
  const remaining = todos.filter(filters.active).length;
  const doneCount = todos.length - remaining;

  return (
    <section>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bạn cần làm gì?"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Thêm
        </button>
      </form>

      {visibleTodos.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-400">
          Không có công việc nào
        </p>
      ) : (
        <ul className="space-y-2">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Còn {remaining} việc chưa xong</span>
        {doneCount > 0 && (
          <button
            onClick={onClearDone}
            className="text-red-500 hover:underline"
          >
            Xoá {doneCount} việc đã xong
          </button>
        )}
      </div>
    </section>
  );
}
