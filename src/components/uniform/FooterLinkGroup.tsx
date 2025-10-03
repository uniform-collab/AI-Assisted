import React from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type FooterLinkGroupProps = ComponentProps<{
  groupTitle?: string;
}>;

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = () => {
  return (
    <div className="footer-link-group">
      <UniformText 
        parameterId="groupTitle"
        as="h3" 
        className="text-white font-semibold mb-4"
        placeholder="Group Title"
      />
      
      <ul className="space-y-2">
        <UniformSlot name="links" />
      </ul>
    </div>
  );
};

registerUniformComponent({
  type: "footerLinkGroup",
  component: FooterLinkGroup,
});

export default FooterLinkGroup;

