import React, { useState, createContext, useCallback, useRef } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type TabInfo = {
  label: string;
  isDisabled: boolean;
};

type TabsContextType = {
  activeTab: number;
  setActiveTab: (index: number) => void;
  variant: string;
  registerTab: (index: number, label: string, isDisabled: boolean) => void;
  getNextAutoIndex: () => number;
  tabs: TabInfo[];
};

const TabsContext = createContext<TabsContextType | null>(null);

type TabsProps = ComponentProps<{
  title?: string;
  subtitle?: string;
  variant?: string;
  alignment?: string;
  padding?: string;
}>;

const Tabs: React.FC<TabsProps> = ({ 
  variant = "default",
  alignment = "left",
  padding = "medium"
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<TabInfo[]>([]);
  const nextAutoIndexRef = useRef(0);

  const getNextAutoIndex = useCallback(() => {
    const currentIndex = nextAutoIndexRef.current;
    nextAutoIndexRef.current += 1;
    return currentIndex;
  }, []);

  const registerTab = useCallback((index: number, label: string, isDisabled: boolean) => {
    setTabs(prevTabs => {
      const newTabs = [...prevTabs];
      // Ensure we have enough slots
      while (newTabs.length <= index) {
        newTabs.push({ label: `Tab ${newTabs.length + 1}`, isDisabled: false });
      }
      
      // Only update if the tab info has actually changed
      const existingTab = newTabs[index];
      const newTabInfo = { label: label || `Tab ${index + 1}`, isDisabled };
      
      if (!existingTab || existingTab.label !== newTabInfo.label || existingTab.isDisabled !== newTabInfo.isDisabled) {
        newTabs[index] = newTabInfo;
        return newTabs;
      }
      
      return prevTabs; // No change needed
    });
  }, []);

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

  // Map alignment to Tailwind CSS classes
  const getAlignmentClasses = (align: string) => {
    switch (align) {
      case "left": return "justify-start";
      case "center": return "justify-center";
      case "right": return "justify-end";
      default: return "justify-start";
    }
  };

  // Get tab variant classes
  const getTabVariantClasses = (variant: string, isActive: boolean) => {
    const baseClasses = "px-4 py-2 font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2";
    
    switch (variant) {
      case "pills":
        return `${baseClasses} rounded-full ${
          isActive 
            ? "bg-orange-600 text-white shadow-md" 
            : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
        }`;
      case "underline":
        return `${baseClasses} border-b-2 ${
          isActive 
            ? "border-orange-600 text-orange-600" 
            : "border-transparent text-gray-600 hover:text-orange-600 hover:border-gray-300"
        }`;
      default:
        return `${baseClasses} rounded-lg ${
          isActive 
            ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`;
    }
  };

  const paddingClasses = getPaddingClasses(padding);
  const alignmentClasses = getAlignmentClasses(alignment);

  const contextValue: TabsContextType = {
    activeTab,
    setActiveTab,
    variant,
    registerTab,
    getNextAutoIndex,
    tabs
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <section className={`${paddingClasses} px-4 sm:px-6 lg:px-8 bg-white`}>
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <UniformText 
              parameterId="title"
              as="h2" 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              placeholder="Section Title"
            />
            <UniformText 
              parameterId="subtitle"
              as="p" 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              placeholder="Optional subtitle or description"
            />
          </div>

          {/* Tab Navigation - Dynamic based on registered tabs */}
          {tabs.length > 0 ? (
            <div className={`flex ${alignmentClasses} mb-8`}>
              <div className={`flex flex-wrap gap-2 ${variant === "default" ? "bg-gray-100 p-2 rounded-lg" : ""}`}>
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => !tab.isDisabled && setActiveTab(index)}
                    disabled={tab.isDisabled}
                    className={getTabVariantClasses(variant, activeTab === index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No tabs registered yet. TabPanels should register automatically.
            </div>
          )}

          {/* Tab Content */}
          <div className="tab-content">
            <UniformSlot 
              name="tabPanels" 
              emptyPlaceholder={
                <div className="text-center py-8 text-gray-500">
                  Add tab panels to create tabs
                </div>
              }
            />
          </div>
        </div>
      </section>
    </TabsContext.Provider>
  );
};

export { TabsContext };

registerUniformComponent({
  type: "tabs",
  component: Tabs,
});

export default Tabs;
