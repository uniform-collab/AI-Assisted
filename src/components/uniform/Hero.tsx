import React from 'react';
import Image from 'next/image';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";

type HeroProps = ComponentProps<{
  eyebrow?: string;
  headline?: string;
  description?: string;
  backgroundImage?: AssetParamValue;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  layout?: string;
  headlineTag?: string;
  contentAlignment?: string;
}>;

const Hero: React.FC<HeroProps> = ({ 
  eyebrow,
  headline,
  description,
  backgroundImage,
  padding = "none",
  margin = "medium",
  backgroundColor = "image",
  layout = "fullBackground",
  headlineTag = "h1",
  contentAlignment = "left"
}) => {
  const image = flattenValues(backgroundImage, { toSingle: true });
  
  // Get content container alignment class
  const getContentAlignment = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "items-start text-left";
      case "center":
        return "items-center text-center";
      case "right":
        return "items-end text-right";
      default:
        return "items-start text-left";
    }
  };
  
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
      case "none": return { top: "", bottom: "", horizontal: "" };
      case "small": return { top: "pt-8", bottom: "pb-8", horizontal: "px-8" };
      case "medium": return { top: "pt-12", bottom: "pb-12", horizontal: "px-12" };
      case "large": return { top: "pt-16", bottom: "pb-16", horizontal: "px-16" };
      case "xlarge": return { top: "pt-24", bottom: "pb-24", horizontal: "px-24" };
      default: return { top: "", bottom: "", horizontal: "" };
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

  // Map background colors to custom brand colors
  const getBackgroundClasses = (bgColor: string) => {
    switch (bgColor) {
      case "moss": return { bg: "", customBg: "#C0DAC5", text: "text-gray-800" };
      case "lightGray": return { bg: "", customBg: "#E4DAD4", text: "text-gray-800" };
      case "terracotta": return { bg: "", customBg: "#FAC09E", text: "text-gray-800" };
      case "offWhite": return { bg: "bg-gray-50", text: "text-gray-800" };
      case "pine": return { bg: "", customBg: "#00413A", text: "text-white" };
      case "warmGray": return { bg: "", customBg: "#78716C", text: "text-white" };
      default: return null; // Use background image
    }
  };

  const paddingClasses = getPaddingClasses(padding);
  const marginValue = getMarginValue(margin);
  const colorClasses = getBackgroundClasses(backgroundColor);

  // Render content section
  const renderContent = () => {
    // For split layouts (imageLeft/imageRight), use black text unless a background color is set
    const isFullBackground = layout === "fullBackground" || (!layout && !image?.url);
    const textColor = isFullBackground 
      ? (colorClasses ? colorClasses.text : 'text-white')
      : (colorClasses ? colorClasses.text : 'text-black');
    const textColorWithOpacity = isFullBackground
      ? (colorClasses ? colorClasses.text + '/90' : 'text-white/90')
      : (colorClasses ? colorClasses.text + '/90' : 'text-black/90');

    return (
      <div className={`flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ${getContentAlignment(contentAlignment)}`}>
        {/* Top Padding Spacer */}
        <div className={paddingClasses.top}></div>
        
        {/* Pills Slot */}
        <div className="mb-4 pills-slot">
          <UniformSlot name="pills" />
        </div>
        
        {/* Eyebrow Text */}
        {eyebrow && eyebrow.trim() && (
          <UniformText 
            parameterId="eyebrow"
            as="p" 
            className="text-sm lg:text-base font-medium mb-2 leading-tight text-eq-tomato"
            placeholder="Enter eyebrow text"
          />
        )}
        
        <div className="headline-container mb-6" style={isFullBackground ? { containerType: 'inline-size' } : undefined}>
          <UniformText 
            parameterId="headline"
            as={(headlineTag === "h1" || headlineTag === "h2" || headlineTag === "h3" || headlineTag === "h4" || headlineTag === "h5" || headlineTag === "h6") ? headlineTag : "h1"}
            className={`${textColor} font-bold ${isFullBackground ? 'responsive-headline text-4xl lg:text-5xl' : 'whitespace-normal break-words text-3xl sm:text-4xl lg:text-5xl'}`}
            placeholder="Enter engaging headline for EcoQuest"
          />
        </div>
        
        <UniformText 
          parameterId="description"
          as="p" 
          className={`${textColorWithOpacity} text-base sm:text-lg lg:text-xl mb-8 leading-relaxed`}
          placeholder="Enter EcoQuest mission story"
        />

        {/* CTA Slot */}
        <div className="mb-8">
          <UniformSlot name="cta" />
        </div>
        
        {/* Bottom Padding Spacer */}
        <div className={paddingClasses.bottom}></div>
      </div>
    );
  };

  // Render image section
  const renderImage = () => (
    image?.url && (
      <div className="flex-1 relative min-h-[400px]">
        <Image
          src={image.url}
          alt={image.title || "Hero background"}
          fill
          style={getFocalPointStyle(image)}
          className="brightness-90 object-cover"
          priority
        />
      </div>
    )
  );

  // Full background layout (original)
  if (layout === "fullBackground" || (!layout && !image?.url)) {
    return (
      <section 
        className={`hero hero--fullbackground relative h-[50vh] min-h-[400px] flex items-center justify-center ${colorClasses?.bg || ''}`}
        style={{
          ...(colorClasses?.customBg ? { backgroundColor: colorClasses.customBg } : {}),
          marginTop: marginValue,
          marginBottom: marginValue
        }}
      >
        {/* Background Image - Only show if no background color is selected AND image is provided */}
        {!colorClasses && image?.url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={image.url}
              alt={image.title || "Hero background"}
              fill
              style={getFocalPointStyle(image)}
              className="brightness-75"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}

        {/* Content */}
        <div className={`relative z-10 flex flex-col ${getContentAlignment(contentAlignment)}`}>
          <div className="container mx-auto">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Top Padding Spacer */}
                <div className={paddingClasses.top}></div>
                
                {/* Pills Slot */}
                <div className="mb-4 pills-slot">
                  <UniformSlot name="pills" />
                </div>
                
                {/* Eyebrow Text */}
                {eyebrow && eyebrow.trim() && (
                  <UniformText 
                    parameterId="eyebrow"
                    as="p" 
                    className="text-sm lg:text-base font-medium mb-2 leading-tight text-eq-tomato"
                    placeholder="Enter eyebrow text"
                  />
                )}
                
                <div className="headline-container mb-6" style={{ containerType: 'inline-size' }}>
                  <UniformText 
                    parameterId="headline"
                    as={(headlineTag === "h1" || headlineTag === "h2" || headlineTag === "h3" || headlineTag === "h4" || headlineTag === "h5" || headlineTag === "h6") ? headlineTag : "h1"}
                    className={`${colorClasses ? colorClasses.text : 'text-white'} font-bold responsive-headline text-responsive-xl`}
                    placeholder="Enter engaging headline for EcoQuest"
                  />
                </div>
                
                <UniformText 
                  parameterId="description"
                  as="p" 
                  className={`${colorClasses ? colorClasses.text + '/90' : 'text-white/90'} text-lg sm:text-xl mb-8 leading-relaxed`}
                  placeholder="Enter EcoQuest mission story"
                />

                {/* CTA Slot */}
                <div className="mb-8">
                  <UniformSlot name="cta" />
                </div>
                
                {/* Bottom Padding Spacer */}
                <div className={paddingClasses.bottom}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className={`w-6 h-6 ${colorClasses ? colorClasses.text : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  // Split layout (image left or right)
  return (
    <section 
      className={`relative min-h-[50vh] ${colorClasses?.bg || 'bg-white'}`}
      style={{
        ...(colorClasses?.customBg ? { backgroundColor: colorClasses.customBg } : {}),
        margin: marginValue
      }}
    >
      <div className="flex flex-col lg:flex-row min-h-[50vh]">
        {layout === "imageLeft" ? (
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
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
