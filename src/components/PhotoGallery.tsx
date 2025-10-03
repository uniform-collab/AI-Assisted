import React from 'react';
import Image from 'next/image';

const PhotoGallery: React.FC = () => {
  const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 6' },
    { id: 7, src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 7' },
    { id: 8, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 8' },
    { id: 9, src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 9' },
    { id: 10, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 10' },
    { id: 11, src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 11' },
    { id: 12, src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', alt: 'Traveller photo 12' },
  ];

  return (
    <section className="section-padding bg-neutral/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Traveller photos from recent tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here are some stunning photos shared by our passengers of beautiful and amazing places captured.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary px-8 py-3">
            Explore Latest
          </button>
          <button className="btn-outline px-8 py-3">
            Browse Latest
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
