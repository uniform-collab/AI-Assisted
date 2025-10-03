import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type PopularToursProps = ComponentProps<{
  title?: string;
  subtitle?: string;
}>;

const PopularTours: React.FC<PopularToursProps> = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-4xl font-bold text-gray-900 mb-4"
            placeholder="Enter popular tours section title"
          />
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            placeholder="Enter popular tours section subtitle"
          />
        </div>
        
        {/* Tour Cards Slot */}
        <UniformSlot name="tourCards" />
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "popularTours",
  component: PopularTours,
});

export default PopularTours;
