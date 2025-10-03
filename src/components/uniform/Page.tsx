import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";

type PageProps = ComponentProps<Record<string, never>>;

const Page: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header slot */}
      <UniformSlot name="header" />
      
      {/* Main content slot where all page components will be placed */}
      <main className="flex-grow">
        <UniformSlot name="content" />
      </main>
      
      {/* Footer slot */}
      <UniformSlot name="footer" />
    </div>
  );
};

registerUniformComponent({
  type: "page",
  component: Page,
});

export default Page;
