import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type TabItemProps = ComponentProps<{
  tabLabel?: string;
  isActive?: boolean;
}>;

const TabItem: React.FC<TabItemProps> = ({ isActive = false }) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer";
  const activeClasses = isActive 
    ? "bg-white text-gray-900 shadow-sm" 
    : "text-gray-600 hover:text-gray-900 hover:bg-white/50";
  
  const combinedClasses = `${baseClasses} ${activeClasses}`;

  return (
    <button className={combinedClasses}>
      <UniformText 
        parameterId="tabLabel"
        as="span"
        placeholder="Tab Label"
      />
    </button>
  );
};

registerUniformComponent({
  type: "tabItem",
  component: TabItem,
});

export default TabItem;










