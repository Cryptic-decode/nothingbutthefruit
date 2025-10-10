import Link from 'next/link';
import YouTubeEmbed from '../components/YouTubeEmbed';

// This would eventually come from a CMS or database
const episodes = [
  {
    id: 1,
    title: "Episode 1: Foundation of Faith",
    description: "Starting strong with the basics of biblical faith and building on solid ground.",
    videoId: "your-video-id-1",
    date: "2024-01-15",
    scripture: "Matthew 7:24-27"
  },
  {
    id: 2,
    title: "Episode 2: Walking in the Spirit",
    description: "Understanding what it means to be led by the Holy Spirit in your daily walk.",
    videoId: "your-video-id-2",
    date: "2024-01-22",
    scripture: "Galatians 5:16-26"
  },
  {
    id: 3,
    title: "Episode 3: The Power of Prayer",
    description: "Unlocking the transformative power of prayer and intimate communion with God.",
    videoId: "your-video-id-3",
    date: "2024-01-29",
    scripture: "James 5:16"
  },
  // Add more episodes as they're released
];

export default function Episodes() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 opacity-10 rounded-xl transform rotate-45 blur-lg"></div>
          
          {/* Content library pattern - vertical stripes like book spines/episode list */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="library-episodes" x="0" y="0" width="80" height="200" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="12" height="200" fill="#F59E0B" opacity="0.3"/>
                <rect x="20" y="0" width="8" height="200" fill="#A855F7" opacity="0.2"/>
                <rect x="35" y="0" width="15" height="200" fill="#EC4899" opacity="0.25"/>
                <rect x="55" y="0" width="10" height="200" fill="#F59E0B" opacity="0.2"/>
                <rect x="70" y="0" width="6" height="200" fill="#ffffff" opacity="0.15"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#library-episodes)"/>
          </svg>

          {/* Floating play icons - representing episodes */}
          <div className="absolute top-32 right-1/4 opacity-20">
            <svg className="w-16 h-16 text-brand-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/3 opacity-15">
            <svg className="w-12 h-12 text-pink-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '1.5s'}}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              All{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-lg">
                Episodes
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9">
              Watch every episode and grow deeper in your understanding of God's Word
            </p>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {episodes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Episodes Coming Soon!</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're preparing powerful biblical teachings for you. Subscribe to be notified when we launch.
              </p>
              <Link
                href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Subscribe on YouTube
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.map((episode) => (
                <div 
                  key={episode.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
                >
                  {/* Video Embed */}
                  <div className="relative">
                    <YouTubeEmbed 
                      videoId={episode.videoId}
                      title={episode.title}
                    />
                  </div>

                  {/* Episode Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-brand-gold text-brand-black font-bold px-3 py-1 rounded-full text-xs">
                        Episode {episode.id}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(episode.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {episode.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {episode.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="text-gray-700 font-semibold text-sm">
                        {episode.scripture}
                      </span>
                    </div>

                    <Link
                      href={`https://youtube.com/watch?v=${episode.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-brand-black hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                    >
                      Watch on YouTube
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Never Miss an Episode
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Subscribe to our YouTube channel and get notified when new teachings drop
          </p>
          <div className="mt-10">
            <Link
              href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
