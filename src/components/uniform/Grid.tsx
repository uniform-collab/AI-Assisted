import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type GridProps = ComponentProps<{
  columns?: string;
  gap?: string;
  title?: string;
  subtitle?: string;
  padding?: string;
}>;

const Grid: React.FC<GridProps> = ({ columns = "3", gap = "medium", padding = "medium", title, subtitle }) => {
  // Map columns to CSS Grid template columns for precise control
  const getColumnClasses = (cols: string) => {
    switch (cols) {
      case "1": return "grid-cols-1";
      case "2": return "grid-cols-2";
      case "3": return "grid-cols-3";
      case "4": return "grid-cols-4";
      case "5": return "grid-cols-5";
      case "6": return "grid-cols-6";
      case "12": return "grid-cols-12";
      default: return "grid-cols-3";
    }
  };

  // Map gap to Tailwind CSS classes
  const getGapClasses = (gapSize: string) => {
    switch (gapSize) {
      case "small": return "gap-4";
      case "medium": return "gap-6";
      case "large": return "gap-8";
      case "xlarge": return "gap-12";
      default: return "gap-6";
    }
  };

  // Map padding to Tailwind CSS classes
  const getPaddingClasses = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return "py-0";
      case "small": return "py-8";
      case "medium": return "py-12";
      case "large": return "py-16";
      case "xlarge": return "py-24";
      default: return "py-12";
    }
  };

  const columnClasses = getColumnClasses(columns);
  const gapClasses = getGapClasses(gap);
  const paddingClasses = getPaddingClasses(padding);



  // Check if we have any title content to show
  const hasTitle = title && title.trim().length > 0;
  const hasSubtitle = subtitle && subtitle.trim().length > 0;
  const showTitleSection = hasTitle || hasSubtitle;

  return (
    <section className={paddingClasses}>
      <div className="container mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
        {/* Title Section - Only render if there's content */}
        {showTitleSection && (
          <div className="text-center mb-12">
            <UniformText 
              parameterId="title"
              as="h2" 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              placeholder="Grid Section Title"
            />
            <UniformText 
              parameterId="subtitle"
              as="p" 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              placeholder="Optional subtitle or description for the grid section"
            />
          </div>
        )}

        {/* Grid Container */}
        <div className={`grid ${columnClasses} ${gapClasses}`}>
          <UniformSlot name="gridItems" />
        </div>

          </div>
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "grid",
  component: Grid,
});

export default Grid;
