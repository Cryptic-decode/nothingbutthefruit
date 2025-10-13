import Link from 'next/link';
import EpisodeCard from '../components/EpisodeCard';
import { fetchChannelVideos } from '../lib/youtubeService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Episodes | Nothing But The Fruit Gospel Podcast',
  description: 'Watch all episodes of Nothing But The Fruit with Pastor Demetria Bass. Powerful biblical teachings, spiritual growth, and gospel truth that transforms lives.',
  keywords: [
    'gospel podcast episodes',
    'biblical teaching videos',
    'Pastor Demetria Bass episodes',
    'christian podcast series',
    'spiritual growth videos',
    'gospel truth teachings',
    'biblical wisdom',
    'faith building content'
  ],
  openGraph: {
    title: 'Episodes | Nothing But The Fruit Gospel Podcast',
    description: 'Watch all episodes of Nothing But The Fruit with Pastor Demetria Bass. Powerful biblical teachings, spiritual growth, and gospel truth that transforms lives.',
    images: ['/og-episodes.jpg'],
  },
  alternates: {
    canonical: '/episodes',
  },
};

export default async function Episodes() {
  // Fetch videos from YouTube channel
  const videos = await fetchChannelVideos();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Dynamic wave pattern - similar to home page */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="waves-episodes" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q50,0 100,50 T200,50" stroke="#F59E0B" strokeWidth="2" fill="none" className="animate-pulse"/>
                <path d="M0,70 Q50,20 100,70 T200,70" stroke="#A855F7" strokeWidth="1.5" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
                <path d="M0,30 Q50,-20 100,30 T200,30" stroke="#EC4899" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}}/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-episodes)"/>
          </svg>

          {/* Enhanced geometric shapes with better positioning */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 opacity-10 rounded-xl transform rotate-45 blur-lg animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-brand-gold opacity-15 rounded-full blur-md animate-float" style={{animationDelay: '1.5s'}}></div>
          
          {/* Floating play icons with enhanced animations */}
          <div className="absolute top-32 right-1/4 opacity-20 animate-float">
            <svg className="w-16 h-16 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/3 opacity-15 animate-float" style={{animationDelay: '1.5s'}}>
            <svg className="w-12 h-12 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/5 opacity-10 animate-float" style={{animationDelay: '3s'}}>
            <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

          {/* Enhanced gradient overlay for better depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Enhanced main headline with better typography */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              All{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
                Episodes
              </span>
            </h1>
            
            {/* Enhanced subheadline */}
            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9 animate-fade-in" style={{animationDelay: '0.3s'}}>
              Watch every episode and grow deeper in your understanding of God's Word. Each teaching is designed to transform your spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {videos.length === 0 ? (
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
              {videos.map((video, index) => (
                <EpisodeCard 
                  key={video.id}
                  episode={video}
                  episodeNumber={index + 1}
                />
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
