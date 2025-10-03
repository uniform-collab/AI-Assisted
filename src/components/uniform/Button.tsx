import React from 'react';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";

type ButtonProps = ComponentProps<{
  text?: string;
  link?: LinkParamValue;
  style?: string;
  size?: string;
  fullWidth?: boolean;
}>;

const Button: React.FC<ButtonProps> = ({ 
  text,
  link,
  style = "primary",
  size = "medium",
  fullWidth = false
}) => {
  const linkData = link;
  
  // Get button style classes
  const getStyleClasses = (buttonStyle: string) => {
    switch (buttonStyle) {
      case "primary":
        return "bg-eq-tomato text-white border-none hover:bg-secondary";
      case "secondary":
        return "bg-secondary text-white border-none hover:bg-eq-tomato";
      case "outline":
        return "btn-outline";
      default:
        return "bg-eq-tomato text-white border-none hover:bg-secondary";
    }
  };

  // Get button size classes
  const getSizeClasses = (buttonSize: string) => {
    switch (buttonSize) {
      case "small":
        return "px-4 py-2 text-sm";
      case "medium":
        return "px-6 py-3 text-base";
      case "large":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3 text-base";
    }
  };

  const styleClasses = getStyleClasses(style);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? "w-full" : "inline-block";

  const buttonClasses = `${styleClasses} ${sizeClasses} ${widthClasses} font-semibold rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer`;

  // If there's a link, render as Link component
  if (linkData?.path) {
    return (
      <Link 
        href={linkData.path} 
        className={buttonClasses}
        target={linkData.type === 'url' ? '_blank' : '_self'}
        rel={linkData.type === 'url' ? 'noopener noreferrer' : undefined}
      >
        <UniformText 
          parameterId="text"
          placeholder="Button Text"
        />
      </Link>
    );
  }

  // Default button (no link)
  return (
    <button className={buttonClasses} type="button">
      <UniformText 
        parameterId="text"
        placeholder="Button Text"
      />
    </button>
  );
};

registerUniformComponent({
  type: "button",
  component: Button,
});

export default Button;
