export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="h-4 w-24 rounded bg-stone-200" />
      <div className="mt-5 h-12 w-full max-w-md rounded bg-stone-200" />
      <div className="mt-4 h-6 w-full max-w-2xl rounded bg-stone-200" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-2xl border border-stone-200 bg-white" />
        ))}
      </div>
      <div className="mt-8 h-64 rounded-3xl border border-stone-200 bg-white" />
    </div>
  );
}
