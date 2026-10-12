export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const buttonClass =
    "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        className={buttonClass}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← Trước
      </button>
      <span className="text-sm text-slate-600">
        Trang {page} / {totalPages}
      </span>
      <button
        className={buttonClass}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Sau →
      </button>
    </div>
  );
}
