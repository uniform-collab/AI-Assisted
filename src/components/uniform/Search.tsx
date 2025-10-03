import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type SearchProps = ComponentProps<{
  searchPlaceholder?: string;
  buttonText?: string;
}>;

const Search: React.FC<SearchProps> = ({ 
  searchPlaceholder = "Where do you want to go?",
  buttonText = "Explore Tours"
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full px-4 py-3 border border-neutral/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-500"
          />
        </div>
        <UniformText 
          parameterId="buttonText"
          as="button" 
          className="btn-primary w-full sm:w-auto px-8 py-3 font-semibold"
          placeholder="Explore Tours"
        />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: "search",
  component: Search,
});

export default Search;

