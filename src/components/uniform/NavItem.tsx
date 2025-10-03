import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = ComponentProps<{
  text?: string;
  url?: LinkParamValue;
  isActive?: boolean;
}>;

const NavItem: React.FC<NavItemProps> = ({ url, isActive }) => {
  const router = useRouter();
  const link = url;
  
  // Determine if this item should be active based on current route
  const isCurrentRoute = link?.path && router.asPath === link.path;
  const shouldBeActive = isActive || isCurrentRoute;

  const linkContent = (
    <UniformText 
      parameterId="text"
      as="span" 
      className="block w-full h-full"
      placeholder="Navigation Item"
    />
  );

  // Base classes for both desktop and mobile
  const baseClasses = "font-medium transition-all duration-200 ease-in-out";
  
  // Desktop-specific classes (horizontal layout)
  const desktopClasses = "hidden md:inline-block px-6 py-3 text-lg rounded-lg";
  
  // Mobile-specific classes (vertical layout)  
  const mobileClasses = "md:hidden block w-full px-6 py-4 text-lg text-left";
  
  const activeClasses = shouldBeActive 
    ? "bg-teal-700 text-white" 
    : "text-white hover:bg-orange-600 hover:bg-opacity-80";
  
  const desktopCombinedClasses = `${baseClasses} ${desktopClasses} ${activeClasses}`;
  const mobileCombinedClasses = `${baseClasses} ${mobileClasses} ${activeClasses}`;

  // If there's a URL, wrap in a link
  if (link?.path) {
    return (
      <>
        {/* Desktop Navigation Item */}
        <Link 
          href={link.path}
          target={link.type === 'url' ? '_blank' : '_self'}
          rel={link.type === 'url' ? 'noopener noreferrer' : undefined}
          className={desktopCombinedClasses}
        >
          {linkContent}
        </Link>
        
        {/* Mobile Navigation Item */}
        <Link 
          href={link.path}
          target={link.type === 'url' ? '_blank' : '_self'}
          rel={link.type === 'url' ? 'noopener noreferrer' : undefined}
          className={mobileCombinedClasses}
        >
          {linkContent}
        </Link>
      </>
    );
  }

  return (
    <>
      {/* Desktop Navigation Item */}
      <span className={desktopCombinedClasses}>
        {linkContent}
      </span>
      
      {/* Mobile Navigation Item */}
      <span className={mobileCombinedClasses}>
        {linkContent}
      </span>
    </>
  );
};

registerUniformComponent({
  type: "navItem",
  component: NavItem,
});

export default NavItem;
