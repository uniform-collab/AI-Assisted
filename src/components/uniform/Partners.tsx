import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type PartnersProps = ComponentProps<{
  title?: string;
  subtitle?: string;
  contextHeadline?: string;
}>;

const Partners: React.FC<PartnersProps> = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Optional context headline */}
          <UniformText 
            parameterId="contextHeadline"
            as="p" 
            className="text-orange-500 text-sm font-medium uppercase tracking-wide mb-2"
            placeholder="Optional context headline"
          />
          
          {/* Main title */}
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-3xl font-bold text-gray-900 mb-4"
            placeholder="Partners that we work with"
          />
          
          {/* Subtitle */}
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 max-w-2xl mx-auto mb-6"
            placeholder="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          />
        </div>
        
        {/* Partner Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          <UniformSlot name="partnerItems" />
        </div>

        {/* Optional CTAs */}
        <div className="flex justify-center items-center gap-4">
          <UniformSlot name="ctas" />
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "partners",
  component: Partners,
});

export default Partners;
