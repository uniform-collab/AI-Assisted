import React from 'react';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";

type PillProps = ComponentProps<{
  text?: string;
  link?: LinkParamValue;
  style?: string;
  size?: string;
  position?: string;
}>;

const Pill: React.FC<PillProps> = ({ 
  link,
  style = "primary",
  size = "small",
  position = "topLeft"
}) => {
  
  // Get pill style classes
  const getStyleClasses = (pillStyle: string) => {
    switch (pillStyle) {
      case "primary":
        return "bg-eq-tomato text-white border-none hover:bg-secondary";
      case "secondary":
        return "bg-secondary text-white border-none hover:bg-eq-tomato";
      case "outline":
        return "bg-white/90 text-gray-800 border border-gray-300 hover:bg-white";
      case "light":
        return "bg-white/90 text-gray-800 border-none hover:bg-white";
      case "dark":
        return "bg-gray-800/90 text-white border-none hover:bg-gray-900";
      case "transparent":
        return "bg-black/20 text-white border-none hover:bg-black/30 backdrop-blur-sm";
      default:
        return "bg-eq-tomato text-white border-none hover:bg-secondary";
    }
  };

  // Get pill size classes
  const getSizeClasses = (pillSize: string) => {
    switch (pillSize) {
      case "small":
        return "px-3 py-1 text-xs";
      case "medium":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-6 py-3 text-base";
      default:
        return "px-3 py-1 text-xs";
    }
  };

  // Get position classes for overlay positioning
  const getPositionClasses = (pillPosition: string) => {
    switch (pillPosition) {
      case "topLeft":
        return "absolute top-3 left-3 z-30";
      case "topRight":
        return "absolute top-3 right-3 z-30";
      case "topCenter":
        return "absolute top-3 left-1/2 transform -translate-x-1/2 z-30";
      case "bottomLeft":
        return "absolute bottom-3 left-3 z-30";
      case "bottomRight":
        return "absolute bottom-3 right-3 z-30";
      case "bottomCenter":
        return "absolute bottom-3 left-1/2 transform -translate-x-1/2 z-30";
      case "center":
        return "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30";
      case "inline":
        return "inline-block";
      default:
        return "absolute top-3 left-3 z-30";
    }
  };

  const styleClasses = getStyleClasses(style);
  const sizeClasses = getSizeClasses(size);
  const positionClasses = getPositionClasses(position);

  const pillClasses = `${styleClasses} ${sizeClasses} ${positionClasses} font-medium rounded-full transition-all duration-200 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm`;

  const pillContent = (
    <div className={pillClasses}>
      <UniformText 
        parameterId="text"
        placeholder="Pill Text"
        as="span"
        className="block"
      />
    </div>
  );

  // If there's a link, wrap in a link component
  if (link?.path) {
    return (
      <Link 
        href={link.path} 
        target={link.type === 'url' ? '_blank' : '_self'}
        rel={link.type === 'url' ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {pillContent}
      </Link>
    );
  }

  return pillContent;
};

registerUniformComponent({
  type: "pill",
  component: Pill,
});

export default Pill;

