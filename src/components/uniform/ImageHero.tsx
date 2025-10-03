import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { LinkParamValue, AssetParamValue, flattenValues } from "@uniformdev/canvas";

type ImageHeroProps = ComponentProps<{
  title?: string;
  link?: LinkParamValue;
  backgroundImage?: AssetParamValue;
  padding?: string;
  margin?: string;
}>;

const ImageHero: React.FC<ImageHeroProps> = ({ 
  title,
  link,
  backgroundImage,
  padding = "none",
  margin = "medium"
}) => {
  const linkData = link;
  const image = flattenValues(backgroundImage, { toSingle: true });
  
  // Extract focal point data from Uniform asset
  const getFocalPointStyle = (asset: { focalPoint?: { x: number; y: number } }) => {
    if (!asset?.focalPoint) return { objectFit: 'cover' as const };
    
    const { x, y } = asset.focalPoint;
    return {
      objectFit: 'cover' as const,
      objectPosition: `${x * 100}% ${y * 100}%`
    };
  };

  // Map padding to Tailwind CSS classes for content spacing
  const getPaddingClasses = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return "";
      case "small": return "p-2";
      case "medium": return "p-4";
      case "large": return "p-6";
      case "xlarge": return "p-8";
      default: return "";
    }
  };

  // Map margin to pixel values for inline styles
  const getMarginValue = (marginSize: string) => {
    switch (marginSize) {
      case "none": return '0px';
      case "small": return '8px';
      case "medium": return '16px';
      case "large": return '24px';
      case "xlarge": return '32px';
      default: return '16px';
    }
  };

  const paddingClasses = getPaddingClasses(padding);
  const marginValue = getMarginValue(margin);

  // Common styles for the image hero container - horizontal 373x92 ratio (much flatter)
  const containerClasses = `
    relative w-full h-12 sm:h-14 md:h-16 lg:h-18
    rounded-lg overflow-hidden
    transition-all duration-300 ease-in-out
    hover:transform hover:scale-[1.02] hover:shadow-2xl
    focus:outline-none focus:ring-4 focus:ring-eq-tomato/30
    cursor-pointer group
    bg-gray-200
    ${paddingClasses}
  `.trim();

  // Title overlay styles
  const titleOverlayClasses = `
    absolute inset-0 z-10 flex items-center justify-center
    bg-black/40 group-hover:bg-black/50 transition-colors duration-300
  `.trim();

  const titleTextClasses = `
    text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg
    text-center px-3 drop-shadow-lg
    group-hover:scale-105 transition-transform duration-300
  `.trim();

  // Content component with margin wrapper
  const content = (
    <div 
      className={containerClasses}
      style={{
        marginTop: marginValue,
        marginBottom: marginValue,
        aspectRatio: '373/92' // Maintain 373x92 ratio
      }}
    >
      {/* Background Image */}
      {image?.url && (
        <Image
          src={image.url}
          alt={image.title || title || "Image Hero"}
          fill
          style={getFocalPointStyle(image)}
          className="brightness-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      
      {/* Title Overlay */}
      <div className={titleOverlayClasses}>
        <UniformText 
          parameterId="title"
          as="h3"
          className={titleTextClasses}
          placeholder="Title (e.g. DESTINATION.Name)"
        />
      </div>
    </div>
  );

  // If there's a link, render as Link component
  if (linkData?.path) {
    return (
      <Link 
        href={linkData.path}
        target={linkData.type === 'url' ? '_blank' : '_self'}
        rel={linkData.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {content}
      </Link>
    );
  }

  // Default (no link) - still clickable for editing in Uniform
  return content;
};

registerUniformComponent({
  type: "imageHero",
  component: ImageHero,
});

export default ImageHero;
