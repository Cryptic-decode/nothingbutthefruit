import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Don't render if only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav 
      className="flex items-center justify-center gap-2 mt-12" 
      aria-label="Episode pagination"
    >
      {/* Previous Button */}
      {prevPage ? (
        <Link
          href={getPageUrl(prevPage)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200 font-semibold"
          aria-label={`Go to page ${prevPage}`}
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <span 
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span 
                key={`ellipsis-${index}`}
                className="px-2 text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={getPageUrl(pageNum)}
              className={`flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-brand-gold text-brand-black shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-brand-gold'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {nextPage ? (
        <Link
          href={getPageUrl(nextPage)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-200 font-semibold"
          aria-label={`Go to page ${nextPage}`}
        >
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <span 
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
