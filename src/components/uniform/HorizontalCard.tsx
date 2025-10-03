import React from 'react';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, LinkParamValue, flattenValues } from "@uniformdev/canvas";

type HorizontalCardProps = ComponentProps<{
  title?: string;
  backgroundImage?: AssetParamValue;
  cardLink?: LinkParamValue;
  margin?: string;
  padding?: string;
  contentAlignment?: string;
}>;

const HorizontalCard: React.FC<HorizontalCardProps> = ({ 
  backgroundImage,
  cardLink,
  margin = "medium",
  padding = "medium",
  contentAlignment = "left"
}) => {
  const image = flattenValues(backgroundImage, { toSingle: true });

  // Map margin to pixel values for inline styles
  const getMarginValue = (marginSize: string) => {
    switch (marginSize) {
      case "none": return '0px';
      case "small": return '16px';
      case "medium": return '24px';
      case "large": return '32px';
      case "xlarge": return '48px';
      default: return '24px';
    }
  };

  // Map padding to pixel values for inline styles
  const getPaddingValue = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return { vertical: '0px', horizontal: '0px' };
      case "small": return { vertical: '16px', horizontal: '16px' };
      case "medium": return { vertical: '24px', horizontal: '24px' };
      case "large": return { vertical: '32px', horizontal: '32px' };
      case "xlarge": return { vertical: '48px', horizontal: '48px' };
      default: return { vertical: '24px', horizontal: '24px' };
    }
  };

  // Map content alignment to flexbox properties
  const getAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case "left": return { justify: "justify-start", text: "text-left" };
      case "center": return { justify: "justify-center", text: "text-center" };
      case "right": return { justify: "justify-end", text: "text-right" };
      default: return { justify: "justify-start", text: "text-left" };
    }
  };

  const marginValue = getMarginValue(margin);
  const paddingValues = getPaddingValue(padding);
  const alignmentClasses = getAlignmentClasses(contentAlignment);

  const cardContent = (
    <div className="container mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="relative h-24 w-full overflow-hidden rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{
              margin: marginValue
            }}
          >
      {/* Background Image */}
      {image?.url && (
        <div className="absolute inset-0">
          <img
            src={image.url}
            alt={image.title || "Card background"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{
              objectPosition: image.focalPoint ? 
                `${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%` : 
                'center center'
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
        </div>
      )}
      
      {/* Title Content */}
      <div 
        className={`relative z-10 h-full flex items-center ${alignmentClasses.justify}`}
        style={{
          paddingLeft: paddingValues.horizontal,
          paddingRight: paddingValues.horizontal,
          paddingTop: paddingValues.vertical,
          paddingBottom: paddingValues.vertical
        }}
      >
        <UniformText 
          parameterId="title"
          as="h3"
          className={`text-white font-bold text-lg leading-tight ${alignmentClasses.text}`}
          placeholder="Enter card title"
        />
      </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If there's a link, wrap in Link component
  if (cardLink?.path) {
    return (
      <Link 
        href={cardLink.path}
        target={cardLink.type === 'url' ? '_blank' : '_self'}
        rel={cardLink.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

registerUniformComponent({
  type: "horizontalCard",
  component: HorizontalCard,
});

export default HorizontalCard;
