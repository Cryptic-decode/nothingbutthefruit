
import Link from 'next/link';
import YouTubeEmbed from './components/YouTubeEmbed';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-pink-400 opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-purple-400 opacity-10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Floating shapes */}
          <div className="absolute top-32 right-1/4 w-8 h-8 bg-brand-gold opacity-30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-60 left-1/4 w-6 h-6 bg-pink-300 opacity-40 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-10 h-10 bg-purple-300 opacity-30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>

          {/* Dynamic wave pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="waves-home" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q50,0 100,50 T200,50" stroke="#F59E0B" strokeWidth="2" fill="none" className="animate-pulse"/>
                <path d="M0,70 Q50,20 100,70 T200,70" stroke="#A855F7" strokeWidth="1.5" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
                <path d="M0,30 Q50,-20 100,30 T200,30" stroke="#EC4899" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}}/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-home)"/>
          </svg>

          {/* Open Book icons with gentle float */}
          <div className="absolute top-24 right-1/3 opacity-20 animate-float">
            <svg className="w-20 h-20 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <div className="absolute bottom-32 left-1/4 opacity-15 animate-float" style={{animationDelay: '2s'}}>
            <svg className="w-16 h-16 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headlines */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              Pure Gospel.{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
                Real Growth.
              </span>
            </h1>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in" style={{animationDelay: '0.3s'}}>
              Nothing But{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
                The Fruit
              </span>
            </h2>

            {/* Subheadline */}
            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-4xl mx-auto sm:text-2xl sm:leading-9 animate-fade-in" style={{animationDelay: '0.6s'}}>
              Join Pastor Demetria Bass for powerful biblical teaching that transforms lives. From the battlefield to the pulpit, experience the pure Word of God.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.9s'}}>
              <a 
                href="https://youtube.com/@nothingbutthefruit"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-brand-black bg-brand-gold hover:bg-amber-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-3xl"
              >
                ▶️ Watch Latest Episode
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-brand-gold text-lg font-semibold rounded-full text-white hover:bg-brand-gold hover:text-brand-black transition-all duration-300 transform hover:scale-105"
              >
                Subscribe on YouTube
              </a>
            </div>

            {/* Supporting visual elements */}
            <div className="mt-16 flex justify-center items-center space-x-8 flex-wrap gap-4 animate-fade-in" style={{animationDelay: '1.2s'}}>
              <div className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-300">Biblical Teaching</span>
              </div>
              
              <div className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-300">Spiritual Growth</span>
              </div>
              
              <div className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-300">Kingdom Living</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Latest Episode Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 opacity-5 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl animate-on-scroll animate-slideInUp">
              Latest Episode
            </h2>
            <p className="mt-4 text-xl text-gray-300 animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
              Watch our newest teaching and be transformed by God's Word
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-on-scroll animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <YouTubeEmbed 
              videoId="your-latest-video-id"
              title="Latest Episode - Nothing But The Fruit"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Subscribe for New Episodes
              <svg className="inline-block ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300 opacity-5 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl animate-on-scroll animate-slideInUp">
              Our Mission
            </h2>
            <div className="mt-8 max-w-4xl mx-auto animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
              <p className="text-xl leading-relaxed text-gray-600 sm:text-2xl">
                At <span className="font-semibold text-brand-black bg-brand-gold px-2 py-1 rounded">Nothing But The Fruit</span>, we equip believers to grow from milk to meat, deepening their understanding of God's Word and empowering them to bear lasting fruit in every season of life.
              </p>
            </div>

            {/* Mission highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll animate-slideInUp">
              <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mx-auto w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Deepen Understanding</h3>
                <p className="mt-2 text-gray-600">Dive deeper into Scripture with clear, practical teaching</p>
              </div>

              <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mx-auto w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Build Faith</h3>
                <p className="mt-2 text-gray-600">Strengthen your relationship with God through His Word</p>
              </div>

              <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mx-auto w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Bear Fruit</h3>
                <p className="mt-2 text-gray-600">Apply biblical truth to produce lasting spiritual fruit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              What We Cover
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Deep biblical teaching on topics that matter for your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Biblical Teaching */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 animate-on-scroll animate-slideInLeft">
              <div className="flex items-center justify-center w-16 h-16 bg-brand-gold rounded-full mb-6">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📖 Biblical Teaching</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Deep verse-by-verse studies
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Practical application of Scripture
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Understanding biblical context
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Moving from milk to meat
                </li>
              </ul>
            </div>

            {/* Faith & Resilience */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 animate-on-scroll animate-slideInUp" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center justify-center w-16 h-16 bg-brand-gold rounded-full mb-6">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💪 Faith & Resilience</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Overcoming life's challenges
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Building unshakeable faith
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Military &amp; ministry wisdom
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Standing firm in trials
                </li>
              </ul>
            </div>

            {/* Spiritual Growth */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 animate-on-scroll animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center w-16 h-16 bg-brand-gold rounded-full mb-6">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌱 Spiritual Growth</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Fruit of the Spirit development
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Discipleship &amp; spiritual parenting
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Prayer &amp; intimate relationship with God
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Kingdom living in daily life
                </li>
              </ul>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16 animate-on-scroll animate-slideInUp">
            <p className="text-lg text-gray-600 mb-8">
              Ready to grow deeper in your walk with God?
            </p>
            <a 
              href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Subscribe & Never Miss an Episode
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section - COMMENTED OUT until we have real listener reviews */}
      {/* 
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              What Listeners Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Lives transformed by the power of God's Word
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 animate-on-scroll animate-slideInLeft">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-brand-black font-bold text-lg">B</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Brother Michael</h4>
                  <p className="text-gray-600">Faithful Listener</p>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 leading-relaxed">
                &ldquo;Pastor Demetria's teaching has helped me move from just reading the Bible to truly understanding and living it. My faith has never been stronger.&rdquo;
              </blockquote>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 animate-on-scroll animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-brand-black font-bold text-lg">D</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sister Joy</h4>
                  <p className="text-gray-600">New Believer</p>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 leading-relaxed">
                &ldquo;As a new Christian, this podcast breaks down Scripture in a way I can understand and apply. Pastor Demetria makes the Word come alive!&rdquo;
              </blockquote>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Stay Connected Section */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl animate-on-scroll animate-slideInUp">
            Stay Connected
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Join our growing community of believers and never miss a teaching. Subscribe today and grow deeper in your walk with God.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <a 
              href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Subscribe on YouTube
            </a>
            <a 
              href="/contact"
              className="inline-block border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
            >
              Send a Prayer Request
            </a>
          </div>
          
          {/* Social Media */}
          <div className="mt-16 pt-8 border-t border-gray-700 animate-on-scroll animate-slideInUp" style={{animationDelay: '0.6s'}}>
            <p className="text-gray-400 mb-6">Follow us for daily encouragement and episode updates</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://youtube.com/@nothingbutthefruit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/nothingbutthefruit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072C3.58 0 2.385 1.196 2.31 2.473.252 3.753.24 4.161.24 7.421c0 3.26.012 3.668.07 4.948.149 3.259 1.691 4.771 4.919 4.919 1.266.058 1.644.07 4.85.07 3.259 0 3.668-.014 4.948-.072 3.259-.149 4.771-1.691 4.919-4.919.058-1.265.07-1.644.07-4.849 0-3.26-.012-3.668-.07-4.948-.149-3.259-1.691-4.771-4.919-4.919-1.265-.058-1.644-.07-4.849-.07zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/nothingbutthefruit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.271 0-4.192 1.543-4.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
