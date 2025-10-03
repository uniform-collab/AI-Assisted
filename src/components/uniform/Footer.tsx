import React from 'react';
import Link from 'next/link';
import { registerUniformComponent, ComponentProps, UniformSlot } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";

type FooterProps = ComponentProps<{
  companyName?: string;
  description?: string;
  copyrightText?: string;
  newsletterTitle?: string;
  subscribeButtonText?: string;
}>;

const Footer: React.FC<FooterProps> = ({ 
  companyName = "EcoQuest",
  description,
  copyrightText,
  newsletterTitle = "Stay Updated",
  subscribeButtonText = "Subscribe"
}) => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const supportLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Help Center', href: '/help' },
    { name: 'Travel Insurance', href: '/insurance' },
    { name: 'Booking Terms', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
  ];

  const getSocialIcon = (iconName: string) => {
    const iconProps = "w-5 h-5 fill-current";
    
    switch (iconName) {
      case 'facebook':
        return (
          <svg className={iconProps} viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconProps} viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM15.15 12.15c0 1.717-1.393 3.11-3.11 3.11s-3.11-1.393-3.11-3.11 1.393-3.11 3.11-3.11 3.11 1.393 3.11 3.11zm1.68-3.51c-.404 0-.73-.326-.73-.73s.326-.73.73-.73.73.326.73.73-.326.73-.73.73zM12.04 7.27c-2.68 0-4.85 2.17-4.85 4.85s2.17 4.85 4.85 4.85 4.85-2.17 4.85-4.85-2.17-4.85-4.85-4.85zm5.58-1.93c-.5-.5-1.18-.78-1.89-.78H8.27c-.71 0-1.39.28-1.89.78-.5.5-.78 1.18-.78 1.89v7.48c0 .71.28 1.39.78 1.89.5.5 1.18.78 1.89.78h7.48c.71 0 1.39-.28 1.89-.78.5-.5.78-1.18.78-1.89V7.23c0-.71-.28-1.39-.78-1.89z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconProps} viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className={iconProps} viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              {companyName}
            </Link>
            <UniformText 
              parameterId="description"
              as="p" 
              className="text-white/80 mb-6 max-w-md leading-relaxed"
              placeholder="Enter company description"
            />
            
            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h4 className="font-semibold mb-3">{newsletterTitle}</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-accent text-gray-800"
                />
                <button className="bg-secondary hover:bg-secondary/90 px-6 py-2 rounded-r-lg font-medium transition-colors duration-200">
                  {subscribeButtonText}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links Slot */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <UniformSlot name="footerLinks" />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <UniformText 
              parameterId="copyrightText"
              as="p" 
              className="text-white/80 text-sm mb-4 md:mb-0"
              placeholder="Enter copyright text"
            />

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/80 hover:text-accent transition-colors duration-200"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;
