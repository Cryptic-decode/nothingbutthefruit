import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="text-9xl font-bold text-brand-gold opacity-30 select-none">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-4">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          The page you are looking for does not exist or has been moved. If you
          believe this is an error, please contact us.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-semibold py-3 px-8 rounded-full transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
