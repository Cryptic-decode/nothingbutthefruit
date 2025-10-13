export default function StayConnected() {
  return (
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
  );
}
