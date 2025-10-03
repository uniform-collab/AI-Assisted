import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DestinationShowcase: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Mountain landscape"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Forest adventure"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Ocean view"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Wildlife"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Destination
              </span>
              <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
                Patagonia
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Here is the introduction that Patagonia is a super interesting place where passengers go to see amazing places and do adventures in various forms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Let our experts show you around and experience spectacular landscapes, authentic cultures, and life-changing adventures in some forms.
              </p>
            </div>

            <Link href="/destinations/patagonia">
              <button className="btn-primary px-8 py-3">
                See Tours
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
