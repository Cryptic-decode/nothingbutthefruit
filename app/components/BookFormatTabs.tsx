import Link from 'next/link';

interface BookFormatTabsProps {
  activeFormat: 'physical' | 'ebooks';
}

const formats = [
  { id: 'physical', label: 'Physical Books', href: '/books' },
  { id: 'ebooks', label: 'eBooks', href: '/books?format=ebooks' },
] as const;

export default function BookFormatTabs({ activeFormat }: BookFormatTabsProps) {
  return (
    <nav aria-label="Book format" className="mb-10 border-b border-stone-200">
      <div className="flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {formats.map((format) => {
          const isActive = format.id === activeFormat;

          return (
            <Link
              key={format.id}
              href={format.href}
              scroll={false}
              aria-current={isActive ? 'page' : undefined}
              className={`relative min-h-12 shrink-0 px-1 pb-4 text-sm font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-transform focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-4 ${
                isActive
                  ? 'text-purple-800 after:scale-x-100 after:bg-purple-800'
                  : 'text-gray-500 after:scale-x-0 after:bg-purple-800 hover:text-purple-800 hover:after:scale-x-100'
              }`}
            >
              {format.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
