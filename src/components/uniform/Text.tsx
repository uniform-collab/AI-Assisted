import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type TextProps = ComponentProps<{
  text?: string;
  size?: string;
  color?: string;
  alignment?: string;
  weight?: string;
}>;

const Text: React.FC<TextProps> = ({ 
  size = "default",
  color = "default",
  alignment = "left",
  weight = "normal"
}) => {
  
  // Get text size classes
  const getSizeClasses = (textSize: string) => {
    switch (textSize) {
      case "xsmall":
        return "text-xs"; // 12px
      case "small":
        return "text-sm"; // 14px
      case "default":
        return "text-lg"; // 18px
      case "large":
        return "text-xl"; // 20px
      case "xlarge":
        return "text-2xl"; // 24px
      default:
        return "text-lg"; // 18px default
    }
  };

  // Get text color classes
  const getColorClasses = (textColor: string) => {
    switch (textColor) {
      case "default":
        return "text-gray-900";
      case "muted":
        return "text-gray-600";
      case "light":
        return "text-gray-400";
      case "white":
        return "text-white";
      case "primary":
        return "text-eq-tomato";
      case "secondary":
        return "text-secondary";
      default:
        return "text-gray-900";
    }
  };

  // Get text alignment classes
  const getAlignmentClasses = (textAlignment: string) => {
    switch (textAlignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "justify":
        return "text-justify";
      default:
        return "text-left";
    }
  };

  // Get font weight classes
  const getWeightClasses = (fontWeight: string) => {
    switch (fontWeight) {
      case "light":
        return "font-light";
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      default:
        return "font-normal";
    }
  };

  const sizeClasses = getSizeClasses(size);
  const colorClasses = getColorClasses(color);
  const alignmentClasses = getAlignmentClasses(alignment);
  const weightClasses = getWeightClasses(weight);

  const textClasses = `${sizeClasses} ${colorClasses} ${alignmentClasses} ${weightClasses} leading-relaxed`;

  return (
    <UniformText 
      parameterId="text"
      as="p" 
      className={textClasses}
      placeholder="Enter text content"
    />
  );
};

registerUniformComponent({
  type: "text",
  component: Text,
});

export default Text;
