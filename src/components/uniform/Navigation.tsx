import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";

type NavigationProps = ComponentProps<Record<string, never>>;

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="navigation-container">
      {/* Desktop Navigation - Horizontal */}
      <div className="hidden md:flex items-center justify-center space-x-8 bg-teal-800 px-6 py-4">
        <UniformSlot name="navItems" />
      </div>
      
      {/* Mobile Navigation - Vertical */}
      <div className="md:hidden flex flex-col space-y-4 py-2">
        <UniformSlot name="navItems" />
      </div>
    </nav>
  );
};

registerUniformComponent({
  type: "navigation",
  component: Navigation,
});

export default Navigation;
