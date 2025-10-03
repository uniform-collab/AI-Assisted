import React from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";
import Link from 'next/link';

type FooterLinkProps = ComponentProps<{
  linkText?: string;
  linkUrl?: LinkParamValue;
}>;

const FooterLink: React.FC<FooterLinkProps> = ({ linkUrl }) => {
  const url = linkUrl;

  const linkContent = (
    <UniformText 
      parameterId="linkText"
      as="span" 
      className="text-gray-300 hover:text-white transition-colors duration-200"
      placeholder="Link Text"
    />
  );

  // If there's a URL, wrap in a link
  if (url?.path) {
    return (
      <Link 
        href={url.path}
        target={url.type === 'url' ? '_blank' : '_self'}
        rel={url.type === 'url' ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {linkContent}
      </Link>
    );
  }

  return linkContent;
};

registerUniformComponent({
  type: "footerLink",
  component: FooterLink,
});

export default FooterLink;

