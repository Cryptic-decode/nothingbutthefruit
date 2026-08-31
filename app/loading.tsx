import LoadingBlock from './components/ui/LoadingBlock';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading page">
      <span className="sr-only">Loading page…</span>
      <section className="bg-purple-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <LoadingBlock className="mx-auto h-5 w-44 bg-purple-800" />
          <LoadingBlock className="mx-auto h-16 w-full max-w-2xl bg-purple-800" />
          <LoadingBlock className="mx-auto h-7 w-full max-w-xl bg-purple-900" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="space-y-4 rounded-2xl border border-stone-200 p-6">
            <LoadingBlock className="h-48 w-full" />
            <LoadingBlock className="h-7 w-3/4" />
            <LoadingBlock className="h-4 w-full" />
            <LoadingBlock className="h-4 w-5/6" />
          </div>
        ))}
      </section>
    </div>
  );
}
