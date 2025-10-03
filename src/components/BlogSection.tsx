import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

const BlogSection: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Title sentence within about one lines that is written about sections',
      excerpt: 'Here lots in wanted sections such that in adventure sections',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Peter Johanson',
      date: 'November 2024',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Sustainable Travel Tips for the Eco-Conscious Explorer',
      excerpt: 'Discover how to minimize your environmental impact while maximizing your travel adventures',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Peter Johanson',
      date: 'November 2024',
      readTime: '3 min read',
    },
    {
      id: '3',
      title: 'Wildlife Conservation Through Responsible Tourism',
      excerpt: 'Learn how your travel choices can contribute to wildlife preservation efforts',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Peter Johanson',
      date: 'November 2024',
      readTime: '7 min read',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-4">
            Related content creation
          </span>
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Recent blog posts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="card group cursor-pointer">
              <Link href={`/blog/${post.id}`} className="block">
                {/* Image */}
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-200 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-medium">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
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

export default BlogSection;
