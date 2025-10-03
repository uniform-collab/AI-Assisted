import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";

type TopBorderProps = ComponentProps<{
  style?: string;
  width?: string;
  position?: string;
}>;

const TopBorder: React.FC<TopBorderProps> = ({ 
  style = "gradient",
  width = "medium",
  position = "top"
}) => {
  // Map style and position to CSS classes
  const getStyleClasses = (borderStyle: string, borderPosition: string) => {
    const prefix = borderPosition === "bottom" ? "eq-box-bg-bottom" : "eq-box-bg-top";
    switch (borderStyle) {
      case "gradient": return prefix;
      case "moss": return `${prefix}-moss`;
      case "terracotta": return `${prefix}-terracotta`;
      case "pine": return `${prefix}-pine`;
      default: return prefix;
    }
  };

  // Map width to max-width classes
  const getWidthClasses = (borderWidth: string) => {
    switch (borderWidth) {
      case "small": return "max-w-xs";
      case "medium": return "max-w-lg";
      case "large": return "max-w-2xl";
      case "full": return "max-w-full";
      default: return "max-w-lg";
    }
  };

  const styleClass = getStyleClasses(style, position);
  const widthClass = getWidthClasses(width);

  return (
    <div className={`${styleClass} ${widthClass} my-4`}></div>
  );
};

registerUniformComponent({
  type: "topBorder",
  component: TopBorder,
});

export default TopBorder;
