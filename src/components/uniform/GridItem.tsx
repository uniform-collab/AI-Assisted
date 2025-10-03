import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";

type GridItemProps = ComponentProps<{
  columnStart?: number;
  columnSpan?: number;
  rowStart?: number;
  rowSpan?: number;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  shadow?: string;
}>;

const GridItem: React.FC<GridItemProps> = ({ 
  columnStart,
  columnSpan = 1,
  rowStart,
  rowSpan = 1,
  padding = "none",
  backgroundColor = "transparent",
  borderRadius = "none",
  shadow = "none"
}) => {
  
  // Convert parameters to numbers
  const colStart = columnStart ? Number(columnStart) : 0;
  const colSpan = columnSpan ? Number(columnSpan) : 1;
  const rowStartNum = rowStart ? Number(rowStart) : 0;
  const rowSpanNum = rowSpan ? Number(rowSpan) : 1;

  // Map padding to Tailwind classes
  const getPaddingClass = (paddingSize: string) => {
    switch (paddingSize) {
      case "none": return '';
      case "small": return 'p-2';
      case "medium": return 'p-4';
      case "large": return 'p-6';
      case "xlarge": return 'p-8';
      default: return '';
    }
  };

  // Map background colors to Tailwind classes
  const getBackgroundClass = (bgColor: string) => {
    switch (bgColor) {
      case "transparent": return '';
      case "white": return 'bg-white';
      case "moss": return 'bg-green-200'; // Closest Tailwind equivalent to #C0DAC5
      case "lightGray": return 'bg-gray-50';
      case "terracotta": return 'bg-orange-200'; // Closest Tailwind equivalent to #FAC09E
      case "offWhite": return 'bg-gray-50';
      case "pine": return 'bg-teal-900'; // Closest Tailwind equivalent to #00413A
      case "warmGray": return 'bg-stone-500'; // Closest Tailwind equivalent to #78716C
      default: return '';
    }
  };

  // Map text colors to Tailwind classes based on background
  const getTextColorClass = (bgColor: string) => {
    switch (bgColor) {
      case "pine":
      case "warmGray":
        return 'text-white';
      default:
        return 'text-gray-700';
    }
  };

  // Map border radius to Tailwind classes
  const getBorderRadiusClass = (radius: string) => {
    switch (radius) {
      case "none": return '';
      case "small": return 'rounded';
      case "medium": return 'rounded-lg';
      case "large": return 'rounded-xl';
      case "full": return 'rounded-2xl';
      default: return '';
    }
  };

  // Map shadow to Tailwind classes
  const getShadowClass = (shadowSize: string) => {
    switch (shadowSize) {
      case "none": return '';
      case "small": return 'shadow-sm';
      case "medium": return 'shadow-md';
      case "large": return 'shadow-lg';
      case "xlarge": return 'shadow-xl';
      default: return '';
    }
  };

  // Build the className string
  const className = [
    'transition-all duration-200 ease-in-out',
    getPaddingClass(padding),
    getBackgroundClass(backgroundColor),
    getTextColorClass(backgroundColor),
    getBorderRadiusClass(borderRadius),
    getShadowClass(shadow)
  ].filter(Boolean).join(' ');

  // Create inline styles only for grid positioning (since Tailwind doesn't support dynamic grid positioning)
  const gridStyles: React.CSSProperties = {
    gridColumn: colStart > 0 ? `${colStart} / ${colStart + colSpan}` : `span ${colSpan}`,
    gridRow: rowStartNum > 0 ? `${rowStartNum} / ${rowStartNum + rowSpanNum}` : `span ${rowSpanNum}`,
  };

  return (
    <div className={className} style={gridStyles}>
      <UniformSlot 
        name="content" 
        emptyPlaceholder={
          <div className="p-2 text-xs opacity-70 text-center">
            Grid item content
          </div>
        }
      />
    </div>
  );
};

registerUniformComponent({
  type: "gridItem",
  component: GridItem,
});

export default GridItem;