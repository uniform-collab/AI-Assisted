import React from 'react';
import Image from 'next/image';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";

type GalleryImageProps = ComponentProps<{
  image?: AssetParamValue;
  altText?: string;
  caption?: string;
  photographer?: string;
}>;

const GalleryImage: React.FC<GalleryImageProps> = ({ 
  image,
  altText,
  caption,
  photographer
}) => {
  const imageAsset = flattenValues(image, { toSingle: true });
  
  // Extract focal point data from Uniform asset
  const getFocalPointStyle = (asset: { focalPoint?: { x: number; y: number } }) => {
    if (!asset?.focalPoint) return { objectFit: 'cover' as const };
    
    const { x, y } = asset.focalPoint;
    return {
      objectFit: 'cover' as const,
      objectPosition: `${x * 100}% ${y * 100}%`
    };
  };

  if (!imageAsset?.url) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-sm">No image selected</span>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageAsset.url}
          alt={altText || imageAsset.title || "Gallery image"}
          fill
          style={getFocalPointStyle(imageAsset)}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Overlay with caption and photographer */}
      {(caption || photographer) && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end">
          <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {caption && (
              <UniformText 
                parameterId="caption"
                as="p" 
                className="text-sm font-medium mb-1"
                placeholder="Image caption"
              />
            )}
            {photographer && (
              <UniformText 
                parameterId="photographer"
                as="p" 
                className="text-xs text-white/80"
                placeholder="Photographer credit"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

registerUniformComponent({
  type: "galleryImage",
  component: GalleryImage,
});

export default GalleryImage;
