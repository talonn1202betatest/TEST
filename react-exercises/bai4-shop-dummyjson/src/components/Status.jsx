export function Loading() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">
      {message}
    </p>
  );
}
