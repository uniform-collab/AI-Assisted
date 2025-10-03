import React from 'react';
import Image from 'next/image';

const Partners: React.FC = () => {
  const partners = [
    {
      id: 1,
      name: 'National Geographic',
      logo: '/partner-natgeo.svg',
      description: 'Working with National Geographic, we offer unique expeditions to remote places with cutting-edge photography and storytelling.',
    },
    {
      id: 2,
      name: 'Partner Name',
      logo: '/partner-2.svg', 
      description: 'Working with adventure specialists who offer unique expeditions to remote places with cutting-edge photography and storytelling.',
    },
    {
      id: 3,
      name: 'Partner Name',
      logo: '/partner-3.svg',
      description: 'Working with adventure specialists who offer unique expeditions to remote places with cutting-edge photography and storytelling.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Partners that we work with
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {partners.map((partner) => (
            <div key={partner.id} className="text-center">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-16 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={128}
                    height={64}
                    style={{ objectFit: 'contain' }}
                    className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary px-8 py-3">
            Explore Latest
          </button>
          <button className="btn-outline px-8 py-3">
            Browse Latest
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
