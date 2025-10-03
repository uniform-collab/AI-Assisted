import React from 'react';
import TourCard from './TourCard';

const PopularTours: React.FC = () => {
  // Sample tour data - in a real app, this would come from an API
  const tours = [
    {
      id: '1',
      title: 'Patagonia Adventure Trek',
      price: 'from $999',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'EXPERIENCE',
      rating: 5,
      duration: '7 days',
      location: 'Patagonia',
      description: 'An awesome place where lots of passengers go to have fun with environmental elements.',
    },
    {
      id: '2',
      title: 'Costa Rica Wildlife Expedition',
      price: 'from $1,299',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'EXPERIENCE',
      rating: 5,
      duration: '10 days',
      location: 'Costa Rica',
      description: 'An awesome place where lots of passengers go to have fun with environmental elements.',
    },
    {
      id: '3',
      title: 'Iceland Northern Lights',
      price: 'from $799',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'EXPERIENCE',
      rating: 4,
      duration: '5 days',
      location: 'Iceland',
      description: 'An awesome place where lots of passengers go to have fun with environmental elements.',
    },
    {
      id: '4',
      title: 'New Zealand Fjord Explorer',
      price: 'from $1,599',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'EXPERIENCE',
      rating: 5,
      duration: '14 days',
      location: 'New Zealand',
      description: 'An awesome place where lots of passengers go to have fun with environmental elements.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Explore our most popular tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
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

export default PopularTours;
