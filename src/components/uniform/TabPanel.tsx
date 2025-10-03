import React, { useContext, useEffect, useRef } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { TabsContext } from './Tabs';

type TabPanelProps = ComponentProps<{
  tabLabel?: string;
  icon?: string;
  isDisabled?: boolean;
  tabIndex?: number;
}>;

const TabPanel: React.FC<TabPanelProps> = ({ 
  tabLabel = "",
  isDisabled = false,
  tabIndex
}) => {
  const tabsContext = useContext(TabsContext);
  const assignedIndexRef = useRef<number | null>(null);
  const hasRegisteredRef = useRef(false);
  
  // Assign index only once, and only when we have context
  if (assignedIndexRef.current === null && tabsContext) {
    assignedIndexRef.current = typeof tabIndex === 'number' 
      ? tabIndex 
      : tabsContext.getNextAutoIndex();
  }
  
  // Fallback for standalone usage
  const actualTabIndex = assignedIndexRef.current ?? 0;
  
  // Register this tab with the parent whenever props change
  useEffect(() => {
    if (tabsContext && assignedIndexRef.current !== null && !hasRegisteredRef.current) {
      tabsContext.registerTab(actualTabIndex, tabLabel, isDisabled);
      hasRegisteredRef.current = true;
    }
  }, [tabsContext, actualTabIndex, tabLabel, isDisabled]);
  
  // Update registration when props change (but don't re-register)
  useEffect(() => {
    if (tabsContext && hasRegisteredRef.current) {
      tabsContext.registerTab(actualTabIndex, tabLabel, isDisabled);
    }
  }, [tabsContext, actualTabIndex, tabLabel, isDisabled]);
  
  // Show this panel only if it's the active tab (when in tabs context)
  const isActive = tabsContext ? tabsContext.activeTab === actualTabIndex : true;

  // If no tabs context (standalone usage), always show content
  if (!tabsContext) {
    return (
      <div className="tab-panel standalone">
        {/* Standalone content - always visible */}
        <div className="tab-content">
          <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400">
            <h3 className="font-medium text-blue-800">
              <UniformText 
                parameterId="tabLabel"
                as="span"
                placeholder="Tab Label"
              />
            </h3>
          </div>
          
          <UniformSlot 
            name="content" 
            emptyPlaceholder={
              <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <p>Add content to this tab panel</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`tab-panel ${isActive ? 'tab-panel-active' : 'tab-panel-inactive'}`}
      style={{
        display: isActive ? 'block' : 'none'
      }}
    >
      {/* Tab Content - Always render but container controls visibility */}
      <div className="tab-content">
        <UniformSlot 
          name="content" 
          emptyPlaceholder={
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="mb-4">
                <UniformText 
                  parameterId="tabLabel"
                  as="h3"
                  className="text-lg font-medium mb-2"
                  placeholder="Tab Label"
                />
              </div>
              <p>Add content to this tab panel</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: "tabPanel",
  component: TabPanel,
});

export default TabPanel;
