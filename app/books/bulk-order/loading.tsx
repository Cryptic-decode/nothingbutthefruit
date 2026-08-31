import LoadingBlock from '../../components/ui/LoadingBlock';
import Container from '../../components/ui/Container';

export default function BulkOrderLoading() {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading bulk order form">
      <span className="sr-only">Loading bulk order form…</span>
      <section className="border-b border-stone-200 bg-[#f7f0e5] py-14 lg:py-20">
        <Container className="space-y-5">
          <LoadingBlock className="h-5 w-44 bg-stone-300" />
          <LoadingBlock className="h-20 w-full max-w-2xl bg-stone-300" />
          <LoadingBlock className="h-6 w-full max-w-xl bg-stone-300" />
        </Container>
      </section>
      <section className="py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <LoadingBlock key={index} className="h-44 w-full" />
            ))}
          </div>
          <div className="space-y-5 rounded-3xl border border-stone-200 p-7">
            <LoadingBlock className="h-4 w-32" />
            <LoadingBlock className="h-10 w-4/5" />
            <LoadingBlock className="h-24 w-full" />
            <LoadingBlock className="h-12 w-full rounded-full bg-amber-200" />
          </div>
        </Container>
      </section>
    </div>
  );
}
