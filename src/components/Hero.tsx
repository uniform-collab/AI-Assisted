import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="EcoQuest Adventure"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-white text-responsive-xl font-bold mb-6 leading-tight">
          Title (e.g. engaging claim for EcoQuest)
        </h1>
        
        <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Here is the EcoQuest mission story
        </p>

        {/* Search/Action Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 border border-neutral/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-500"
              />
            </div>
            <button className="btn-primary w-full sm:w-auto px-8 py-3 font-semibold">
              Explore Tours
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
