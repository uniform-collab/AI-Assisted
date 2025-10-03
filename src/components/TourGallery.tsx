import React from 'react';
import Image from 'next/image';

const TourGallery: React.FC = () => {
  const tours = [
    {
      id: 1,
      title: 'Title (e.g. DESTINATION Band)',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Alaska Wilderness Experience',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Amazon Rainforest Journey',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'African Safari Adventure',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Himalayan Trekking',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'Arctic Expedition',
      category: 'EXPERIENCE',
      image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="section-padding bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-responsive-lg font-bold text-white mb-4">
            Available Tours
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose from our carefully curated selection of eco-friendly adventures
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour) => (
            <div key={tour.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
              <div className="relative h-64">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block bg-success text-white px-2 py-1 rounded-full text-xs font-medium mb-2 w-fit">
                    {tour.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {tour.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            View all Destinations
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-200">
            Browse Latest
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourGallery;
