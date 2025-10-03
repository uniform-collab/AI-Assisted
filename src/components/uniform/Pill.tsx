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
        return "border-none hover:opacity-90";
      case "secondary":
        return "border-none hover:opacity-90";
      case "light":
        return "border-none hover:opacity-90";
      case "primary (outline)":
        return "border border-2 hover:bg-eq-tomato hover:text-white";
      case "secondary (outline)":
        return "border border-2 hover:bg-secondary hover:text-white";
      case "light (outline)":
        return "border border-2 hover:bg-gray-200 hover:text-gray-800";
      case "primary (inverse)":
        return "border-none hover:opacity-90";
      case "secondary (inverse)":
        return "border-none hover:opacity-90";
      case "light (inverse)":
        return "border-none hover:opacity-90";
      default:
        return "border-none hover:opacity-90";
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

  // Get background color for inline styles
  const getBackgroundColor = (pillStyle: string) => {
    switch (pillStyle) {
      case "primary":
        return "#E54D2E"; // Vibrant orange-red
      case "secondary":
        return "#7BAF87"; // Muted sage-like green
      case "light":
        return "#EFEAE4"; // Very light off-white/pale beige
      case "primary (outline)":
        return "#FFFFFF"; // White
      case "secondary (outline)":
        return "#FFFFFF"; // White
      case "light (outline)":
        return "#FFFFFF"; // White
      case "primary (inverse)":
        return "#FDECE7"; // Very pale light peach/orange
      case "secondary (inverse)":
        return "#E9F2EB"; // Very pale light mint green
      case "light (inverse)":
        return "#DED8D0"; // Slightly darker light beige/taupe
      default:
        return "#E54D2E"; // Default to primary
    }
  };

  const pillClasses = `${styleClasses} ${sizeClasses} ${positionClasses} font-medium rounded-full transition-all duration-200 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm`;

  // Get border color for outline styles
  const getBorderColor = (pillStyle: string) => {
    switch (pillStyle) {
      case "primary (outline)":
        return "#E54D2E"; // Vibrant orange-red
      case "secondary (outline)":
        return "#7BAF87"; // Muted sage-like green
      case "light (outline)":
        return "#EFEAE4"; // Very light off-white/pale beige
      default:
        return "transparent";
    }
  };

  // Get text color for inline styles
  const getTextColor = (pillStyle: string) => {
    switch (pillStyle) {
      case "primary":
        return "#FFFFFF"; // White
      case "secondary":
        return "#FFFFFF"; // White
      case "light":
        return "#4A4A4A"; // Dark gray
      case "primary (outline)":
        return "#E54D2E"; // Vibrant orange-red
      case "secondary (outline)":
        return "#7BAF87"; // Muted sage-like green
      case "light (outline)":
        return "#4A4A4A"; // Dark gray
      case "primary (inverse)":
        return "#E54D2E"; // Vibrant orange-red
      case "secondary (inverse)":
        return "#7BAF87"; // Muted sage-like green
      case "light (inverse)":
        return "#4A4A4A"; // Dark gray
      default:
        return "#FFFFFF"; // Default to white
    }
  };

  const pillContent = (
    <div 
      className={pillClasses}
      style={{ 
        backgroundColor: getBackgroundColor(style),
        borderColor: getBorderColor(style),
        color: getTextColor(style)
      }}
    >
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

