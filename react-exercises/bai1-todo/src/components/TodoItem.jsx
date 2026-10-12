export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 accent-indigo-600"
      />
      <span
        className={`flex-1 break-words ${
          todo.done ? "text-slate-400 line-through" : ""
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onRemove(todo.id)}
        className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
      >
        Xoá
      </button>
    </li>
  );
}
