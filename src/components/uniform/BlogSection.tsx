import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type BlogSectionProps = ComponentProps<{
  title?: string;
  subtitle?: string;
}>;

const BlogSection: React.FC<BlogSectionProps> = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <UniformText 
            parameterId="title"
            as="h2" 
            className="text-4xl font-bold text-gray-900 mb-4"
            placeholder="Enter blog section title"
          />
          <UniformText 
            parameterId="subtitle"
            as="p" 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            placeholder="Enter blog section subtitle"
          />
        </div>
        
        {/* Blog Articles Slot */}
        <UniformSlot name="blogArticles" />
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "blogSection",
  component: BlogSection,
});

export default BlogSection;
