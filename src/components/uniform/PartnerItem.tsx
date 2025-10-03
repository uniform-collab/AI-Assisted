import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, LinkParamValue, flattenValues } from "@uniformdev/canvas";
import Link from 'next/link';
import Image from 'next/image';

type PartnerItemProps = ComponentProps<{
  partnerName?: string;
  partnerLogo?: AssetParamValue;
  partnerUrl?: LinkParamValue;
  partnerDescription?: string;
  destinationText?: string;
}>;

const PartnerItem: React.FC<PartnerItemProps> = ({ partnerLogo, partnerUrl }) => {
  const logo = flattenValues(partnerLogo, { toSingle: true });
  const url = partnerUrl;

  const partnerContent = (
    <div className="partner-item bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Logo Section */}
      <div className="flex items-center justify-center p-6 bg-gray-50 border-b">
        {logo ? (
          <Image 
            src={logo.url} 
            alt={logo.title || "Partner logo"} 
            width={150}
            height={75}
            className="max-h-16 w-auto object-contain"
          />
        ) : (
          <div className="text-center text-gray-400">
            <UniformText 
              parameterId="partnerName"
              as="div" 
              className="text-lg font-medium text-gray-700"
              placeholder="Partner Name"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Partner Name as Header */}
        <UniformText 
          parameterId="partnerName"
          as="h3" 
          className="text-xl font-bold text-gray-900 mb-2"
          placeholder="PARTNER.Name"
        />

        {/* Destination Text */}
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <UniformText 
            parameterId="destinationText"
            as="span" 
            className="text-sm font-medium text-gray-600 uppercase tracking-wide"
            placeholder="DESTINATION"
          />
        </div>

        {/* Description */}
        <UniformText 
          parameterId="partnerDescription"
          as="p" 
          className="text-gray-600 text-sm leading-relaxed mb-4"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lorem in erat ultricies laoreet"
        />


      </div>
    </div>
  );

  // If there's a URL, wrap in a link
  if (url?.path) {
    return (
      <Link 
        href={url.path}
        target={url.type === 'url' ? '_blank' : '_self'}
        rel={url.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {partnerContent}
      </Link>
    );
  }

  return partnerContent;
};

registerUniformComponent({
  type: "partnerItem",
  component: PartnerItem,
});

export default PartnerItem;
