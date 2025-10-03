import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjectMapService } from '../lib/uniform/projectMap';

interface NavigationItem {
  title: string;
  path: string;
  children: NavigationItem[];
  isRoot: boolean;
}

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
  isMobile?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ className = "", onItemClick, isMobile = false }) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const projectMapService = getProjectMapService();
        if (projectMapService) {
          const structure = await projectMapService.getNavigationStructure();
          setNavigationItems(structure);
        } else {
          // Fallback navigation if Project Map is not available
          setNavigationItems([
            { title: 'Home', path: '/', children: [], isRoot: true },
            { title: 'Tours', path: '/tours', children: [], isRoot: false },
            { title: 'Destinations', path: '/destinations', children: [], isRoot: false },
            { title: 'About', path: '/about', children: [], isRoot: false },
            { title: 'Contact', path: '/contact', children: [], isRoot: false },
          ]);
        }
      } catch (error) {
        console.error('Error loading navigation:', error);
        // Fallback navigation
        setNavigationItems([
          { title: 'Home', path: '/', children: [], isRoot: true },
          { title: 'Tours', path: '/tours', children: [], isRoot: false },
          { title: 'Destinations', path: '/destinations', children: [], isRoot: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavigation();
  }, []);

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.path} className={level > 0 ? "ml-4" : ""}>
        <Link
          href={item.path}
          className={isMobile 
            ? "block py-2 text-white hover:text-accent transition-colors duration-200 font-medium"
            : "block py-2 px-3 text-white hover:text-accent transition-colors duration-200 font-medium"
          }
          onClick={onItemClick}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <ul className="mt-1">
            {item.children.map(child => renderNavigationItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  if (isLoading) {
    return (
      <nav className={className}>
        <div className="flex space-x-4">
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={className}>
      <ul className={isMobile ? "space-y-4" : "flex space-x-6"}>
        {navigationItems.map(item => renderNavigationItem(item))}
      </ul>
    </nav>
  );
};

export default Navigation;
