import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type PaginationProps = ComponentProps<{
  currentPage?: number;
  totalPages?: number;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}>;

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 2,
  totalPages = 12,
  showPrevNext = true,
  showFirstLast = false,
  maxVisiblePages = 5
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Show first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
    }

    // Show visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pages.push(
        <button
          key={i}
          className={`px-3 py-2 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isActive
              ? 'bg-orange-500 text-white border-orange-500'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      {showPrevNext && (
        <button
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage <= 1}
        >
          &lt;
        </button>
      )}
      
      {renderPageNumbers()}
      
      {showPrevNext && (
        <button
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

registerUniformComponent({
  type: "pagination",
  component: Pagination,
});

export default Pagination;
