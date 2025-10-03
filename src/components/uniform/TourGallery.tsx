import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type TourGalleryProps = ComponentProps<{
  title?: string;
  subtitle?: string;
}>;

const TourGallery: React.FC<TourGalleryProps> = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-4xl font-bold text-gray-900 mb-4"
            placeholder="Enter tour gallery title"
          />
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            placeholder="Enter tour gallery subtitle"
          />
        </div>
        
        {/* Tour Gallery Items Slot */}
        <UniformSlot name="tourGalleryItems" />
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "tourGallery",
  component: TourGallery,
});

export default TourGallery;
