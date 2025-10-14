import Image from 'next/image';
import StayConnected from '../components/StayConnected';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Pastor Demetria Bass | Nothing But The Fruit',
  description: 'Meet Pastor Demetria Bass, founder of Nothing But The Fruit. From the battlefield to the pulpit, discover her journey of faith and commitment to spreading pure gospel truth.',
  keywords: [
    'Pastor Demetria Bass',
    'Bass Global Ministries',
    'christian pastor',
    'gospel ministry',
    'biblical teaching',
    'spiritual leader',
    'faith journey',
    'christian testimony'
  ],
  openGraph: {
    title: 'About Pastor Demetria Bass | Nothing But The Fruit',
    description: 'Meet Pastor Demetria Bass, founder of Nothing But The Fruit. From the battlefield to the pulpit, discover her journey of faith and commitment to spreading pure gospel truth.',
    images: ['/PastorDeeNew.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)',
        backgroundImage: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)',
        WebkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box'
      }}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-brand-gold opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full blur-lg"></div>
          
          {/* Topographical pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="topographic-about" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,25 50,50 T100,50" stroke="#FFE500" strokeWidth="1" fill="none"/>
                <path d="M0,60 Q25,35 50,60 T100,60" stroke="#FFE500" strokeWidth="0.8" fill="none"/>
                <path d="M0,40 Q25,15 50,40 T100,40" stroke="#FFE500" strokeWidth="0.6" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topographic-about)"/>
          </svg>

          {/* Floating open book icons */}
          <div className="absolute top-32 right-1/4 opacity-20">
            <svg className="w-16 h-16 text-brand-gold animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <div className="absolute bottom-32 left-1/3 opacity-15">
            <svg className="w-12 h-12 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20" style={{animationDelay: '1s'}}>
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              About{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-lg">
                Nothing But The Fruit
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-3xl mx-auto sm:text-2xl sm:leading-9">
              From the battlefield to the pulpit, bringing you pure gospel truth
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-brand-gold opacity-5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-purple-300 opacity-5 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-pink-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl text-center mb-12 animate-on-scroll animate-slideInUp">
              Meet Pastor Demetria Bass
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pastor Dee's Image */}
              <div className="animate-on-scroll animate-slideInLeft">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold to-purple-600 rounded-2xl transform rotate-3"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/PastorDeeNew.png"
                      alt="Pastor Demetria Bass"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Bio Text */}
              <div className="prose prose-lg animate-on-scroll animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <p className="text-xl leading-relaxed text-gray-600 sm:text-2xl">
                  Pastor Demetria Bass is the <span className="font-semibold text-purple-700">Executive Pastor at Bass Global Ministries</span> and host of <span className="font-semibold text-brand-black bg-brand-gold px-2 py-1 rounded">Nothing But The Fruit</span>, a gospel podcast dedicated to deep biblical teaching and christian growth.
                </p>
                <p className="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
                  With a unique journey from the <span className="font-semibold text-purple-700">U.S. military to ministry</span>, Pastor Demetria brings discipline, dedication, and a warrior's heart to the work of God's Kingdom. Her passion is helping believers move from "milk to meat", deepening their understanding of Scripture and equipping them to bear lasting fruit in every season of life.
              </p>
              <p className="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
                  Through <span className="font-semibold text-purple-700">Nothing But The Fruit</span>, Pastor Demetria unpacks biblical truth with clarity and conviction, drawing from years of ministry experience, spiritual warfare, and intimate relationship with God. Whether you're a new believer or a seasoned saint, this podcast will challenge you to grow deeper in your faith and walk in the fullness of God's Word.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-1/4 w-32 h-32 bg-indigo-200 opacity-10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-200 opacity-15 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Who Should Listen
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              This podcast is for everyone hungry for deeper biblical truth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll animate-slideInUp">
            {/* New Believers */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">New Believers</h3>
              <p className="text-gray-600">Just starting your faith journey and wanting solid biblical foundation</p>
            </div>

            {/* Seasoned Saints */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">Seasoned Saints</h3>
              <p className="text-gray-600">Ready to move from milk to meat and dive deeper into Scripture</p>
            </div>

            {/* Spiritual Seekers */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">Spiritual Seekers</h3>
              <p className="text-gray-600">Curious about Christianity and searching for truth and purpose</p>
            </div>

            {/* Ministry Leaders */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">Ministry Leaders</h3>
              <p className="text-gray-600">Serving God's people and hungry for fresh insight and encouragement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-28 h-28 bg-brand-gold opacity-5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 bg-purple-200 opacity-5 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              What We Stand For
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              The four pillars that shape every episode
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Clarity */}
            <div className="group text-center md:text-left animate-on-scroll animate-slideInLeft">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float">
                  <span className="text-2xl font-bold text-brand-black">C</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4 group-hover:text-purple-700 transition-colors duration-300">Clarity</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Clear biblical truth, no fluff. We break down Scripture so you can understand and apply God's Word to your everyday life.
              </p>
            </div>

            {/* Consistency */}
            <div className="group text-center md:text-left animate-on-scroll animate-slideInRight">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float" style={{animationDelay: '0.5s'}}>
                  <span className="text-2xl font-bold text-brand-black">C</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4 group-hover:text-purple-700 transition-colors duration-300">Consistency</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Faithful to Scripture, every single episode. We stay rooted in God's unchanging Word, giving you a reliable foundation you can trust.
              </p>
            </div>

            {/* Conviction */}
            <div className="group text-center md:text-left animate-on-scroll animate-slideInLeft" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float" style={{animationDelay: '1s'}}>
                  <span className="text-2xl font-bold text-brand-black">C</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4 group-hover:text-purple-700 transition-colors duration-300">Conviction</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Boldness in speaking biblical truth. We don't water down the gospel, we deliver it with courage, love, and unwavering faith.
              </p>
            </div>

            {/* Community */}
            <div className="group text-center md:text-left animate-on-scroll animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float" style={{animationDelay: '1.5s'}}>
                  <span className="text-2xl font-bold text-brand-black">C</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4 group-hover:text-purple-700 transition-colors duration-300">Community</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Growing together in Christ. We're building a family of believers who support, encourage, and sharpen one another in the faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <StayConnected />
    </div>
  );
} 