import LoadingBlock from '../../components/ui/LoadingBlock';
import Container from '../../components/ui/Container';

export default function BookDetailLoading() {
  return (
    <div className="min-h-screen bg-[#faf7f2]" role="status" aria-label="Loading book details">
      <span className="sr-only">Loading book details…</span>
      <div className="border-b border-stone-200 py-6">
        <Container>
          <LoadingBlock className="h-5 w-52" />
        </Container>
      </div>
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <LoadingBlock className="aspect-[3/4] w-full lg:col-span-4" />
            <div className="space-y-5 lg:col-span-4 lg:pt-4">
              <LoadingBlock className="h-4 w-36" />
              <LoadingBlock className="h-20 w-full" />
              <LoadingBlock className="h-5 w-48" />
              <LoadingBlock className="h-10 w-28" />
              <LoadingBlock className="h-28 w-full" />
            </div>
            <div className="space-y-5 rounded-3xl border border-stone-200 bg-white p-7 lg:col-span-4">
              <LoadingBlock className="h-4 w-28" />
              <LoadingBlock className="h-10 w-3/4" />
              <LoadingBlock className="h-12 w-full" />
              <LoadingBlock className="h-12 w-full" />
              <LoadingBlock className="h-12 w-full" />
              <LoadingBlock className="h-12 w-full rounded-full bg-amber-200" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
