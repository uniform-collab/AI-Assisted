import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, LinkParamValue, flattenValues } from "@uniformdev/canvas";
import Link from 'next/link';
import Image from 'next/image';

type DestinationItemProps = ComponentProps<{
  destinationName?: string;
  destinationImage?: AssetParamValue;
  description?: string;
  country?: string;
  destinationUrl?: LinkParamValue;
}>;

const DestinationItem: React.FC<DestinationItemProps> = ({ 
  destinationImage, 
  destinationUrl 
}) => {
  const image = flattenValues(destinationImage, { toSingle: true });
  const link = destinationUrl;

  // Extract focal point data from Uniform asset
  const getFocalPointStyle = (asset: { focalPoint?: { x: number; y: number } }) => {
    if (!asset?.focalPoint) return { objectFit: 'cover' as const };
    
    const { x, y } = asset.focalPoint;
    return {
      objectFit: 'cover' as const,
      objectPosition: `${x * 100}% ${y * 100}%`
    };
  };

  const defaultImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  const cardContent = (
    <div className="relative group cursor-pointer h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image?.url || defaultImage}
          alt={image?.title || "Destination"}
          fill
          style={image?.url ? getFocalPointStyle(image) : { objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        {/* Title */}
        <div className="mb-4">
          <UniformText 
            parameterId="destinationName"
            as="h3" 
            className="text-3xl font-bold mb-2 leading-tight"
            placeholder="Title (e.g. DESTINATION.Name)"
          />
          
          {/* Meta Info */}
          <div className="flex items-center text-white/90 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <UniformText 
              parameterId="country"
              as="span" 
              className="text-sm font-medium"
              placeholder="Meta 1"
            />
          </div>
          
          {/* Description */}
          <UniformText 
            parameterId="description"
            as="p" 
            className="text-white/90 text-base leading-relaxed mb-6 line-clamp-3"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!"
          />
        </div>
        
        {/* Call to Action Slot */}
        <div className="flex">
          <UniformSlot name="cta" />
        </div>
      </div>
    </div>
  );

  // If there's a URL, wrap in a link
  if (link?.path) {
    return (
      <Link 
        href={link.path}
        target={link.type === 'url' ? '_blank' : '_self'}
        rel={link.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

registerUniformComponent({
  type: "destinationItem",
  component: DestinationItem,
});

export default DestinationItem;
