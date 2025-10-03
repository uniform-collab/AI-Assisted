import React from 'react';
import Image from 'next/image';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";

type SectionProps = ComponentProps<{
  eyebrow?: string;
  headline?: string;
  description?: string;
  backgroundImage?: AssetParamValue;
  padding?: string;
  backgroundColor?: string;
  layout?: string;
  box?: string;
  headlineTag?: string;
}>;

const Section: React.FC<SectionProps> = ({ 
  eyebrow,
  headline,
  description,
  backgroundImage,
  padding = "none",
  backgroundColor = "image",
  layout = "fullBackground",
  box = "none",
  headlineTag = "h2"
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

  // Map padding to Tailwind CSS classes for content spacing
  const getPaddingClasses = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return { top: "", bottom: "" };
      case "small": return { top: "pt-8", bottom: "pb-8" };
      case "medium": return { top: "pt-12", bottom: "pb-12" };
      case "large": return { top: "pt-16", bottom: "pb-16" };
      case "xlarge": return { top: "pt-24", bottom: "pb-24" };
      default: return { top: "", bottom: "" };
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
  const colorClasses = getBackgroundClasses(backgroundColor);

  // Render wavy border decorations
  const renderBoxDecorations = () => {
    return (
      <>
        {(box === "top" || box === "both") && (
          <div className="absolute top-0 left-0 w-full z-20">
            <div className="eq-box-bg-top w-full"></div>
          </div>
        )}
        {(box === "bottom" || box === "both") && (
          <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="eq-box-bg-bottom w-full"></div>
          </div>
        )}
      </>
    );
  };

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
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* Top Padding Spacer */}
        <div className={paddingClasses.top}></div>
        
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
            as={(headlineTag === "h1" || headlineTag === "h2" || headlineTag === "h3" || headlineTag === "h4" || headlineTag === "h5" || headlineTag === "h6") ? headlineTag : "h2"}
            className={`${textColor} font-bold responsive-headline text-4xl lg:text-5xl`}
            placeholder="Enter engaging headline for section"
          />
        </div>
        
        <UniformText 
          parameterId="description"
          as="p" 
          className={`${textColorWithOpacity} text-lg lg:text-xl mb-8 leading-relaxed`}
          placeholder="Enter section description"
        />

        {/* Content Slot */}
        <div className="mb-8">
          <UniformSlot name="content" />
        </div>

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
          alt={image.title || "Section background"}
          fill
          style={getFocalPointStyle(image)}
          className="brightness-90"
          priority
        />
      </div>
    )
  );

  // Full background layout (original)
  if (layout === "fullBackground" || (!layout && !image?.url)) {
    return (
      <section 
        className={`relative min-h-[50vh] flex items-center justify-center ${colorClasses?.bg || ''}`}
        style={colorClasses?.customBg ? { backgroundColor: colorClasses.customBg } : undefined}
      >
        {/* Background Image - Only show if no background color is selected AND image is provided */}
        {!colorClasses && image?.url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={image.url}
              alt={image.title || "Section background"}
              fill
              style={getFocalPointStyle(image)}
              className="brightness-75"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}

        {/* Box Decorations */}
        {renderBoxDecorations()}

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Top Padding Spacer */}
          <div className={paddingClasses.top}></div>
          
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
              as={(headlineTag === "h1" || headlineTag === "h2" || headlineTag === "h3" || headlineTag === "h4" || headlineTag === "h5" || headlineTag === "h6") ? headlineTag : "h2"}
              className={`${colorClasses ? colorClasses.text : 'text-white'} font-bold responsive-headline text-responsive-xl`}
              placeholder="Enter engaging headline for section"
            />
          </div>
          
          <UniformText 
            parameterId="description"
            as="p" 
            className={`${colorClasses ? colorClasses.text + '/90' : 'text-white/90'} text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed`}
            placeholder="Enter section description"
          />

          {/* Content Slot */}
          <div className="mb-8">
            <UniformSlot name="content" />
          </div>

          {/* CTA Slot */}
          <div className="mb-8">
            <UniformSlot name="cta" />
          </div>
          
          {/* Bottom Padding Spacer */}
          <div className={paddingClasses.bottom}></div>
        </div>
      </section>
    );
  }

  // Split layout (image left or right)
  return (
    <section 
      className={`relative min-h-[50vh] ${colorClasses?.bg || 'bg-white'}`}
      style={colorClasses?.customBg ? { backgroundColor: colorClasses.customBg } : undefined}
    >
      {/* Box Decorations */}
      {renderBoxDecorations()}
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
  type: "section",
  component: Section,
});

export default Section;
