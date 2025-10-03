import React, { useState } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type TabsGridProps = ComponentProps<{
  title?: string;
  subtitle?: string;
  columns?: string;
  rows?: string;
  itemsPerPage?: string;
  padding?: string;
}>;

const TabsGrid: React.FC<TabsGridProps> = ({ 
  columns = "4",
  rows = "3", 
  itemsPerPage,
  padding = "medium"
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate items per page
  const getItemsPerPage = () => {
    if (itemsPerPage && itemsPerPage !== "auto") {
      return parseInt(itemsPerPage);
    }
    // Auto calculate based on rows and columns
    const cols = parseInt(columns);
    const rowCount = parseInt(rows);
    return cols * rowCount;
  };

  // Map columns to Tailwind CSS classes
  const getColumnClasses = (cols: string) => {
    switch (cols) {
      case "1": return "grid-cols-1";
      case "2": return "grid-cols-1 md:grid-cols-2";
      case "3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case "5": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case "6": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

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

  const columnClasses = getColumnClasses(columns);
  const paddingClasses = getPaddingClasses(padding);
  const itemsPerPageCount = getItemsPerPage();

  return (
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

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg">
            <UniformSlot name="tabs" />
          </div>
        </div>

        {/* Grid Content */}
        <div className="mb-8">
          <div className={`grid ${columnClasses} gap-6`}>
            <UniformSlot name="gridItems" />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {/* Page numbers */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === pageNum
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="px-3 py-2 text-gray-500">...</span>
            <button
              onClick={() => setCurrentPage(12)}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              12
            </button>
          </div>

          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "tabsGrid",
  component: TabsGrid,
});

export default TabsGrid;










