import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-eq-tomato text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Go back home
          </Link>
          
          <div>
            <Link 
              href="/tours"
              className="text-eq-tomato hover:underline"
            >
              Browse our tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
