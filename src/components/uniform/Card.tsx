import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText, UniformRichText } from "@uniformdev/canvas-react";
import { AssetParamValue, LinkParamValue, flattenValues } from "@uniformdev/canvas";

type CardProps = ComponentProps<{
  eyebrow?: string;
  headline?: string;
  description?: string;
  backgroundImage?: AssetParamValue;
  backgroundColor?: string;
  layout?: string;
  padding?: string;
  margin?: string;
  textAlignment?: string;
  borderRadius?: string;
  shadow?: string;
  headlineTag?: string;
  cardUrl?: LinkParamValue;
}>;

const Card: React.FC<CardProps> = ({ 
  backgroundImage,
  backgroundColor = "offWhite",
  layout = "vertical",
  padding = "medium",
  margin = "medium",
  textAlignment = "left",
  borderRadius = "medium",
  shadow = "medium",
  headlineTag = "h3",
  cardUrl
}) => {
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

  // Map background colors to custom brand colors (matching Hero component)
  const getBackgroundClasses = (bgColor: string) => {
    switch (bgColor) {
      case "moss": return { bg: "", customBg: "#C0DAC5", text: "text-gray-800" };
      case "lightGray": return { bg: "", customBg: "#E4DAD4", text: "text-gray-800" };
      case "terracotta": return { bg: "", customBg: "#FAC09E", text: "text-gray-800" };
      case "offWhite": return { bg: "bg-gray-50", text: "text-gray-800" };
      case "pine": return { bg: "", customBg: "#00413A", text: "text-white" };
      case "warmGray": return { bg: "", customBg: "#78716C", text: "text-white" };
      default: return { bg: "bg-white", text: "text-gray-800" };
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



  // Map text alignment
  const getTextAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case "left": return "text-left";
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  // Map border radius
  const getBorderRadiusClasses = (radius: string) => {
    switch (radius) {
      case "none": return "rounded-none";
      case "small": return "rounded";
      case "medium": return "rounded-lg";
      case "large": return "rounded-xl";
      case "full": return "rounded-2xl";
      default: return "rounded-lg";
    }
  };

  // Map shadow
  const getShadowClasses = (shadowSize: string) => {
    switch (shadowSize) {
      case "none": return "";
      case "small": return "shadow-sm";
      case "medium": return "shadow-md";
      case "large": return "shadow-lg";
      case "xlarge": return "shadow-xl";
      default: return "shadow-md";
    }
  };

  const colorClasses = getBackgroundClasses(backgroundColor);
  const marginValue = getMarginValue(margin);
  const paddingValues = getPaddingValue(padding);

  const textAlignClasses = getTextAlignmentClasses(textAlignment);
  const borderRadiusClasses = getBorderRadiusClasses(borderRadius);
  const shadowClasses = getShadowClasses(shadow);



  // Render content section
  const renderContent = () => {
    const textColor = layout === "overlay" ? "text-white" : colorClasses.text;
    const textColorWithOpacity = layout === "overlay" ? "text-white/90" : colorClasses.text + "/80";
    const eyebrowColor = layout === "overlay" ? "text-eq-tomato" : "text-eq-tomato";
    const textAlignClass = getTextAlignmentClasses(textAlignment);

    // Create content styles with horizontal padding only (vertical spacing handled by layout)
    let contentStyles: React.CSSProperties = {
      paddingLeft: paddingValues.horizontal,
      paddingRight: paddingValues.horizontal,
      paddingTop: '1.5rem', // Fixed vertical padding
      paddingBottom: '1.5rem', // Fixed vertical padding
      textAlign: textAlignment as React.CSSProperties['textAlign']
    };
    
    if (layout === "overlay") {
      contentStyles = {
        position: 'absolute',
        inset: 0,
        paddingLeft: paddingValues.horizontal,
        paddingRight: paddingValues.horizontal,
        paddingTop: '1.5rem', // Fixed vertical padding for overlay
        paddingBottom: '1.5rem', // Fixed vertical padding for overlay
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 20,
        textAlign: textAlignment as React.CSSProperties['textAlign']
      };
    } else if (layout === "horizontal" || layout === "horizontalRight") {
      contentStyles = {
        ...contentStyles,
        width: '50%', // Match the image width for proper 50/50 split
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '50%'
        // Remove individual flex properties - let parent container handle centering
        // Horizontal padding already applied from base contentStyles
      };
    }

    return (
      <div style={contentStyles}>
        {/* Eyebrow Text */}
          <UniformText 
            parameterId="eyebrow"
            as="p" 
            className={`text-sm font-medium mb-2 ${eyebrowColor}`}
            style={{ textAlign: textAlignment as React.CSSProperties['textAlign'] }}
            placeholder="Enter eyebrow text"
          />
          
          {/* Headline */}
          <div className="headline-container mb-3" style={{ containerType: 'inline-size', textAlign: textAlignment as React.CSSProperties['textAlign'] }}>
            <UniformText 
              parameterId="headline"
              as={(headlineTag === "h1" || headlineTag === "h2" || headlineTag === "h3" || headlineTag === "h4" || headlineTag === "h5" || headlineTag === "h6") ? headlineTag : "h3"}
              className={`${textColor} font-bold responsive-headline`}
              style={{ textAlign: textAlignment as React.CSSProperties['textAlign'] }}
              placeholder="Enter card headline"
            />
          </div>
          
          {/* Description */}
          <UniformRichText 
            parameterId="description"
            className={`${textColorWithOpacity} text-base mb-4 leading-relaxed`}
            style={{ textAlign: textAlignment as React.CSSProperties['textAlign'] }}
            placeholder="Enter card description"
          />

          {/* Content Slot */}
          <div className="mb-4" style={{ textAlign: textAlignment as React.CSSProperties['textAlign'] }}>
            <UniformSlot name="content" />
          </div>

          {/* CTA Slot */}
          <div className={layout === "overlay" ? "" : "mt-auto"} style={{ textAlign: textAlignment as React.CSSProperties['textAlign'] }}>
            <UniformSlot name="cta" />
          </div>
      </div>
    );
  };

  // Build card classes - Responsive within parent container
  const cardClasses = `
    ${borderRadiusClasses} 
    ${shadowClasses} 
    ${colorClasses.bg} 
    overflow-hidden 
    transition-all 
    duration-300 
    hover:shadow-lg 
    relative
    ${cardUrl ? 'cursor-pointer hover:transform hover:-translate-y-1' : ''}
    ${(layout === "horizontal" || layout === "horizontalRight") ? "flex flex-col md:flex-row md:items-center md:h-auto" : ""}
    ${layout === "overlay" ? "min-h-[300px]" : ""}
    ${(layout === "horizontal" || layout === "horizontalRight") ? "min-h-[280px]" : ""}
  `.trim().replace(/\s+/g, ' ');

  // Render image section (without pills)
  const renderImage = () => {
    if (!image?.url) {
      return null;
    }
    
    if (layout === "overlay") {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image.url}
            alt={image.title || "Card image"}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: image.focalPoint ? `${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%` : 'center center',
              filter: 'brightness(0.5)'
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      );
    }
    
    // Dynamic image sizing based on card size and layout
    let imageStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '192px', // Default h-48
      overflow: 'hidden',
      zIndex: 1
      // No margin on image container - it should fill its allocated space completely
    };
    
    if (layout === "horizontal" || layout === "horizontalRight") {
      // For horizontal layouts, make it fill 100% of the parent container
      imageStyles = {
        ...imageStyles,
        height: '100%', // Fill 100% of parent height
        width: '100%', // Fill 100% of parent width
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: '50%', // Still maintain 50/50 split in flex layout
        display: 'flex' // Make it a flex container to control image sizing
      };
    } else {
      // Vertical and overlay layouts - responsive height
      imageStyles.height = '240px'; // Default responsive height
    }
    
    return (
      <div style={imageStyles}>
        <img
          src={image.url}
          alt={image.title || "Card image"}
          style={{
            width: '100%',
            height: '100%',
            objectFit: (layout === "horizontal" || layout === "horizontalRight") ? 'fill' : 'cover',
            objectPosition: (layout === "horizontal" || layout === "horizontalRight") ? undefined : (image.focalPoint ? `${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%` : 'center center'),
            display: 'block', // Ensure no inline spacing issues
            flex: '1 1 auto' // Make the image fill the flex container completely
          }}
        />
      </div>
    );
  };

  // Build card content with standard structure
  const cardContent = (
    <div className="container mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`${cardClasses} relative`}
            style={{
              margin: marginValue,
              ...(colorClasses.customBg ? { backgroundColor: colorClasses.customBg } : {})
            }}
          >
            {/* Pills - Positioned relative to card container */}
            <UniformSlot name="pills" />
      {/* For overlay layout */}
      {layout === "overlay" && (
        <>
          {renderImage()}
          {renderContent()}
        </>
      )}
      
      {/* For horizontal layouts */}
      {(layout === "horizontal" || layout === "horizontalRight") && (
        <>
          {layout === "horizontal" ? (
            <>
              {renderImage()}
              {renderContent()}
            </>
          ) : (
            <>
              {renderContent()}
              {renderImage()}
            </>
          )}
        </>
      )}
      
      {/* For vertical layout */}
      {(layout === "vertical" || (!layout)) && (
        <>
          {renderImage()}
          {renderContent()}
        </>
      )}
          </div>
        </div>
      </div>
    </div>
  );

  // If there's a URL, wrap in a link
  if (cardUrl?.path) {
    return (
      <Link 
        href={cardUrl.path}
        target={cardUrl.type === 'url' ? '_blank' : '_self'}
        rel={cardUrl.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

registerUniformComponent({
  type: "card",
  component: Card,
});

export default Card;
