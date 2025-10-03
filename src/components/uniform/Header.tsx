import React, { useState } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = ComponentProps<{
  companyName?: string;
  logo?: AssetParamValue;
}>;

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoAsset = flattenValues(logo, { toSingle: true });

  return (
    <header className="bg-teal-800 text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoAsset ? (
              <Image 
                src={logoAsset.url} 
                alt={logoAsset.title || "Company logo"} 
                width={160}
                height={40}
                className="object-contain"
              />
            ) : (
              <div className="text-white text-xl font-bold">
                <UniformText 
                  parameterId="companyName"
                  as="span"
                  placeholder="Company Logo"
                />
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <UniformSlot name="navigation" />
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist Icon */}
            <button className="text-white hover:text-orange-300 transition-colors duration-200 flex flex-col items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs mt-1">Wishlist</span>
            </button>
            
            {/* Profile Icon */}
            <button className="text-white hover:text-orange-300 transition-colors duration-200 flex flex-col items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-orange-300 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="mobile-navigation space-y-2">
              <UniformSlot name="navigation" />
            </div>
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/20 mt-4">
              <button className="text-white hover:text-orange-300 transition-colors duration-200 flex flex-col items-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs mt-1">Wishlist</span>
              </button>
              <button className="text-white hover:text-orange-300 transition-colors duration-200 flex flex-col items-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;
