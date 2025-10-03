import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type DestinationShowcaseProps = ComponentProps<{
  title?: string;
  subtitle?: string;
  padding?: string;
}>;

const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({ padding = "large" }) => {
  // Map padding to Tailwind CSS classes for spacing before title and after subtitle
  const getPaddingClasses = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return "pt-0 pb-0";
      case "small": return "pt-8 pb-8";
      case "medium": return "pt-12 pb-12";
      case "large": return "pt-16 pb-16";
      case "xlarge": return "pt-24 pb-24";
      default: return "pt-16 pb-16";
    }
  };

  const paddingClasses = getPaddingClasses(padding);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${paddingClasses}`}>
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-4xl font-bold text-gray-900 mb-4"
            placeholder="Enter destination showcase title"
          />
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            placeholder="Enter destination showcase subtitle"
          />
        </div>
        
        {/* Destination Items Slot */}
        <UniformSlot name="destinationItems" />
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "destinationShowcase",
  component: DestinationShowcase,
});

export default DestinationShowcase;
