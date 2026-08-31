import LoadingBlock from '../components/ui/LoadingBlock';

export default function BooksLoading() {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading books">
      <span className="sr-only">Loading books…</span>
      <section className="bg-[#f7f0e5] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <LoadingBlock className="h-4 w-52 bg-stone-300" />
            <LoadingBlock className="h-24 w-full max-w-xl bg-stone-300" />
            <LoadingBlock className="h-6 w-full max-w-lg bg-stone-300" />
          </div>
          <LoadingBlock className="mx-auto aspect-[4/3] w-full max-w-xl bg-stone-300" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <LoadingBlock className="mb-10 h-12 w-full max-w-xl" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-4">
              <LoadingBlock className="aspect-[3/4] w-full" />
              <LoadingBlock className="h-6 w-5/6" />
              <LoadingBlock className="h-5 w-24" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
