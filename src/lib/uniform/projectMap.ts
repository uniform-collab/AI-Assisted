import { ProjectMapClient } from "@uniformdev/project-map";

export interface RouteData {
  path: string;
  compositionId?: string;
  projectMapNode?: unknown;
}

export interface NavigationItem {
  title: string;
  path: string;
  children: NavigationItem[];
  isRoot: boolean;
}

/**
 * Project Map configuration and utilities
 */
export class ProjectMapService {
  private client: ProjectMapClient;

  constructor(apiKey: string, projectId: string, apiHost?: string) {
    this.client = new ProjectMapClient({
      apiKey,
      projectId,
      apiHost: apiHost || process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    });
  }

  /**
   * Get navigation structure from project map
   */
  async getNavigationStructure(): Promise<NavigationItem[]> {
    try {
      const result = await this.client.getNodes({});
      const nodes = result?.nodes;
      
      if (!nodes || !Array.isArray(nodes)) {
        return [];
      }
      
      return nodes
        .filter(node => 
          node.path && 
          node.name &&
          !node.path.includes('[') && // Exclude dynamic routes
          node.path !== '/404' && // Exclude error pages
          node.path !== '/playground' // Exclude playground
        )
        .map(node => ({
          title: node.name,
          path: node.path === '/home' ? '/' : node.path, // Map /home to root
          children: [], // TODO: Implement hierarchical navigation if needed
          isRoot: node.path === '/' || node.path === '/home'
        }))
        .sort((a, b) => {
          // Custom sort: Home first, then alphabetical
          if (a.isRoot) return -1;
          if (b.isRoot) return 1;
          return a.title.localeCompare(b.title);
        });
    } catch (error) {
      console.error('Failed to fetch navigation from Project Map:', error);
      return [];
    }
  }

  /**
   * Check if a route pattern matches a given path
   */
  private matchesRoutePattern(pattern: string, path: string): boolean {
    // Handle exact matches first
    if (pattern === path) {
      return true;
    }
    
    // Handle dynamic routes (e.g., /tours/:tour matches /tours/anything)
    if (pattern.includes(':')) {
      const patternParts = pattern.split('/');
      const pathParts = path.split('/');
      
      // Must have the same number of segments
      if (patternParts.length !== pathParts.length) {
        return false;
      }
      
      // Check each segment
      for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[i];
        
        // Skip dynamic segments (starting with :)
        if (patternPart.startsWith(':')) {
          continue;
        }
        
        // Static segments must match exactly
        if (patternPart !== pathPart) {
          return false;
        }
      }
      
      return true;
    }
    
    return false;
  }

  /**
   * Resolve route from path using project map
   */
  async resolveRoute(path: string): Promise<RouteData | null> {
    try {
      console.log(`Route resolution requested for path: ${path}`);
      
      // Get all nodes and find matching path
      const result = await this.client.getNodes({});
      const nodes = result?.nodes || [];
      
      // Find node that matches the path (prioritize exact matches, then dynamic routes)
      const exactMatch = nodes.find(node => node.path === path);
      
      if (exactMatch && exactMatch.type === 'composition') {
        console.log(`Found exact matching node for path ${path}:`, exactMatch.name);
        return {
          path: path,
          compositionId: exactMatch.compositionId,
          projectMapNode: exactMatch,
        };
      }
      
      // If no exact match, try dynamic route matching
      const dynamicMatch = nodes.find(node => 
        node.type === 'composition' && this.matchesRoutePattern(node.path, path)
      );
      
      if (dynamicMatch) {
        console.log(`Found dynamic matching node for path ${path}:`, dynamicMatch.name, `(pattern: ${dynamicMatch.path})`);
        return {
          path: path,
          compositionId: dynamicMatch.compositionId,
          projectMapNode: dynamicMatch,
        };
      }
      
      console.log(`No matching composition node found for path: ${path}`);
      return null;
    } catch (error) {
      console.error(`Failed to resolve route for path: ${path}`, error);
      return null;
    }
  }
}

/**
 * Get project map service instance (client-side)
 */
export function getProjectMapService(): ProjectMapService | null {
  if (typeof window !== 'undefined') {
    // Client-side: use public environment variables
    const apiKey = process.env.NEXT_PUBLIC_UNIFORM_API_KEY;
    const projectId = process.env.NEXT_PUBLIC_UNIFORM_PROJECT_ID;
    const apiHost = process.env.NEXT_PUBLIC_UNIFORM_CLI_BASE_URL;

    if (apiKey && projectId) {
      return new ProjectMapService(apiKey, projectId, apiHost);
    }
  }

  return null;
}

/**
 * Create project map service instance (server-side)
 */
export function createProjectMapService(apiKey: string, projectId: string, apiHost?: string): ProjectMapService {
  return new ProjectMapService(apiKey, projectId, apiHost);
}

// Legacy exports for backward compatibility
export async function getProjectMapNodes() {
  const service = getProjectMapService();
  if (service) {
    return await service.getNavigationStructure();
  }
  return null;
}

export async function resolveRoute(path: string) {
  const service = getProjectMapService();
  if (service) {
    return await service.resolveRoute(path);
  }
  return null;
}