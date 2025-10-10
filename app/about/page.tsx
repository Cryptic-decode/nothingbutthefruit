import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 lg:py-32">
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
                      src="/PastorDee.jpg"
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
                  Pastor Demetria Bass is the <span className="font-semibold text-purple-700">Executive Pastor at Bass Global Ministries</span> and host of <span className="font-semibold text-brand-black bg-brand-gold px-2 py-1 rounded">Nothing But The Fruit</span>, a gospel podcast dedicated to deep biblical teaching and spiritual growth.
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