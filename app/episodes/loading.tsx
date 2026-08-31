import LoadingBlock from '../components/ui/LoadingBlock';

export default function EpisodesLoading() {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading episodes">
      <span className="sr-only">Loading episodes…</span>
      <section className="bg-purple-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <LoadingBlock className="mx-auto h-16 w-full max-w-md bg-purple-800" />
          <LoadingBlock className="mx-auto h-7 w-full max-w-2xl bg-purple-900" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <LoadingBlock className="mx-auto mb-9 h-5 w-44" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-4">
              <LoadingBlock className="aspect-video w-full" />
              <LoadingBlock className="h-6 w-5/6" />
              <LoadingBlock className="h-4 w-2/5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
