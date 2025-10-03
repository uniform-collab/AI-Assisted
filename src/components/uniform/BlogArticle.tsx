import React, { useEffect } from 'react';
import { registerUniformComponent, ComponentProps } from "@uniformdev/canvas-react";
import { UniformText } from "@uniformdev/canvas-react";
import { AssetParamValue, LinkParamValue, flattenValues } from "@uniformdev/canvas";
import { useUniformContext } from "@uniformdev/context-react";
import { applyEntryEnrichments } from "../../lib/uniform/enrichmentUtils";
import Link from 'next/link';
import Image from 'next/image';

type BlogArticleProps = ComponentProps<{
  articleTitle?: string;
  articleExcerpt?: string;
  articleImage?: AssetParamValue;
  authorName?: string;
  authorAvatar?: AssetParamValue;
  publishDate?: string;
  articleUrl?: LinkParamValue;
  blogEntry?: any; // Blog entry data from Uniform CMS
}>;

const BlogArticle: React.FC<BlogArticleProps> = ({ 
  articleImage, 
  authorAvatar, 
  articleUrl, 
  publishDate,
  blogEntry 
}) => {
  const { context } = useUniformContext();
  const image = flattenValues(articleImage, { toSingle: true });
  const avatar = flattenValues(authorAvatar, { toSingle: true });
  const url = articleUrl;

  // Track enrichments when blog article is viewed
  useEffect(() => {
    applyEntryEnrichments(context, blogEntry);
  }, [blogEntry, context]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const articleContent = (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={image.url} 
            alt={image.title || "Article image"} 
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <UniformText 
          parameterId="articleTitle"
          as="h3" 
          className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
          placeholder="Article Title"
        />
        
        <UniformText 
          parameterId="articleExcerpt"
          as="p" 
          className="text-gray-600 mb-4 line-clamp-3"
          placeholder="Article excerpt..."
        />
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {avatar && (
              <Image 
                src={avatar.url} 
                alt={avatar.title || "Author avatar"} 
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <UniformText 
              parameterId="authorName"
              as="span" 
              className="font-medium"
              placeholder="Author Name"
            />
          </div>
          
          {publishDate && (
            <time dateTime={publishDate}>
              {formatDate(publishDate)}
            </time>
          )}
        </div>
      </div>
    </article>
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
        {articleContent}
      </Link>
    );
  }

  return articleContent;
};

registerUniformComponent({
  type: "blogArticle",
  component: BlogArticle,
});

export default BlogArticle;

