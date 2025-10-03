import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TourCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  duration: string;
  location: string;
  description: string;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  rating,
  duration,
  location,
  description,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-secondary' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="card group cursor-pointer h-full">
      <Link href={`/tours/${id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white text-primary px-2 py-1 rounded-full text-sm font-semibold shadow-md">
              {price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Meta Information */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {renderStars(rating)}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
              </div>
              <span className="text-secondary font-semibold">{price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TourCard;
