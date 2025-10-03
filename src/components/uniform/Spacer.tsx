import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";

type SpacerProps = ComponentProps<{
  size?: string;
}>;

const Spacer: React.FC<SpacerProps> = ({ 
  size = "16"
}) => {
  // Convert size to CSS height
  const getSpacerHeight = (spacerSize: string) => {
    switch (spacerSize) {
      case "8":
        return "h-2"; // 8pt = 0.5rem = 8px
      case "12":
        return "h-3"; // 12pt = 0.75rem = 12px
      case "16":
        return "h-4"; // 16pt = 1rem = 16px
      case "20":
        return "h-5"; // 20pt = 1.25rem = 20px
      default:
        return "h-4"; // Default to 16pt
    }
  };

  const heightClass = getSpacerHeight(size);

  return (
    <div 
      className={`${heightClass} w-full`}
      aria-hidden="true"
      role="presentation"
    />
  );
};

registerUniformComponent({
  type: "spacer",
  component: Spacer,
});

export default Spacer;
