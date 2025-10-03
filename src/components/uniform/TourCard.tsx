import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues, LinkParamValue } from "@uniformdev/canvas";
import { useUniformContext } from "@uniformdev/context-react";
import { applyEntryEnrichments } from "../../lib/uniform/enrichmentUtils";

type TourCardProps = ComponentProps<{
  tourTitle?: string;
  tourImage?: AssetParamValue;
  duration?: string;
  price?: string;
  location?: string;
  route?: string;
  tourUrl?: LinkParamValue;
  pillText?: string;
  pillStyle?: string;
  tourEntry?: any; // Tour entry data from Uniform CMS
}>;

const TourCard: React.FC<TourCardProps> = ({
  tourTitle,
  tourImage,
  duration,
  price,
  location,
  route,
  tourUrl,
  pillText,
  pillStyle = "secondary",
  tourEntry,
}) => {
  const { context } = useUniformContext();
  const image = flattenValues(tourImage, { toSingle: true });
  const link = tourUrl?.path;

  // Track enrichments when tour card is viewed
  useEffect(() => {
    applyEntryEnrichments(context, tourEntry);
  }, [tourEntry, context]);
  
  // Get pill style classes (similar to Pill component)
  const getPillStyleClasses = (style: string) => {
    switch (style) {
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

  // Get pill background color
  const getPillBackgroundColor = (style: string) => {
    switch (style) {
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

  // Get pill text color
  const getPillTextColor = (style: string) => {
    switch (style) {
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

  // Get pill border color
  const getPillBorderColor = (style: string) => {
    switch (style) {
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


  const defaultImage = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const CardContent = () => (
    <div className="card group cursor-pointer h-full">
      {/* Image Container */}
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={image?.url || defaultImage}
          alt={image?.title || tourTitle || "Tour"}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-30">
          <div 
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:transform hover:scale-105 shadow-sm inline-block ${getPillStyleClasses(pillStyle)}`}
            style={{ 
              backgroundColor: getPillBackgroundColor(pillStyle),
              borderColor: getPillBorderColor(pillStyle),
              color: getPillTextColor(pillStyle)
            }}
          >
            <UniformText 
              parameterId="pillText"
              placeholder="Category"
              as="span"
              className="whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <UniformText 
          parameterId="tourTitle"
          as="h3" 
          className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-200"
          placeholder="Enter tour title"
        />

        {/* Meta Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            {location && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <UniformText 
                  parameterId="location"
                  placeholder="Location"
                  as="span"
                />
              </span>
            )}
            {duration && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <UniformText 
                  parameterId="duration"
                  placeholder="Duration"
                  as="span"
                />
              </span>
            )}
          </div>
          
          {route && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
              </svg>
              <UniformText 
                parameterId="route"
                placeholder="Route"
                as="span"
              />
            </div>
          )}
          
          <div className="flex items-center">
            {price && (
              <span className="text-secondary font-semibold">
                <UniformText 
                  parameterId="price"
                  placeholder="Price"
                  as="span"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

registerUniformComponent({
  type: "tourCard",
  component: TourCard,
});

export default TourCard;
