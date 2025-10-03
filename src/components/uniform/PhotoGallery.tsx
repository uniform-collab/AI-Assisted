import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type PhotoGalleryProps = ComponentProps<{
  title?: string;
  subtitle?: string;
}>;

const PhotoGallery: React.FC<PhotoGalleryProps> = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-4xl font-bold text-gray-900 mb-4"
            placeholder="Enter photo gallery title"
          />
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            placeholder="Enter photo gallery subtitle"
          />
        </div>
        
        {/* Gallery Images Slot */}
        <UniformSlot name="galleryImages" />
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "photoGallery",
  component: PhotoGallery,
});

export default PhotoGallery;
