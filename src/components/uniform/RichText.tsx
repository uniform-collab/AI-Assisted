import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformRichText } from "@uniformdev/canvas-react";
import { RichTextParamValue } from "@uniformdev/canvas";

type RichTextProps = ComponentProps<{
  content?: RichTextParamValue;
  size?: string;
  color?: string;
  alignment?: string;
  maxWidth?: string;
}>;

const RichText: React.FC<RichTextProps> = ({ 
  size = "default",
  color = "default",
  alignment = "left",
  maxWidth = "full"
}) => {
  
  // Get text size classes
  const getSizeClasses = (textSize: string) => {
    switch (textSize) {
      case "small":
        return "text-sm"; // 14px
      case "default":
        return "text-base"; // 16px
      case "large":
        return "text-lg"; // 18px
      case "xlarge":
        return "text-xl"; // 20px
      default:
        return "text-base"; // 16px default
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

  // Get max width classes
  const getMaxWidthClasses = (maxWidthValue: string) => {
    switch (maxWidthValue) {
      case "narrow":
        return "max-w-sm mx-auto"; // 640px
      case "medium":
        return "max-w-md mx-auto"; // 768px
      case "wide":
        return "max-w-lg mx-auto"; // 1024px
      case "full":
      default:
        return ""; // No max width constraint
    }
  };

  const sizeClasses = getSizeClasses(size);
  const colorClasses = getColorClasses(color);
  const alignmentClasses = getAlignmentClasses(alignment);
  const maxWidthClasses = getMaxWidthClasses(maxWidth);

  const richTextClasses = `${sizeClasses} ${colorClasses} ${alignmentClasses} ${maxWidthClasses} leading-relaxed prose prose-gray max-w-none`;

  return (
    <div className={richTextClasses}>
      <UniformRichText 
        parameterId="content"
        placeholder="Enter rich text content with formatting options"
      />
    </div>
  );
};

registerUniformComponent({
  type: "richText",
  component: RichText,
});

export default RichText;
