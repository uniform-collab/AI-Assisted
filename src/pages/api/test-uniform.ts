import type { NextApiRequest, NextApiResponse } from 'next';
import { CanvasClient } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check environment variables
  const apiKey = process.env.UNIFORM_API_KEY;
  const projectId = process.env.UNIFORM_PROJECT_ID;

  if (!apiKey || !projectId) {
    return res.status(500).json({
      error: 'Missing environment variables',
      hasApiKey: !!apiKey,
      hasProjectId: !!projectId,
      projectId: projectId ? projectId.substring(0, 8) + '...' : 'missing'
    });
  }

  try {
    const canvasClient = new CanvasClient({
      apiKey,
      projectId,
      apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    });

    const projectMapClient = new ProjectMapClient({
      apiKey,
      projectId,
      apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    });

    // Test 1: Check Project Map functionality
    console.log('Testing Project Map...');
    try {
      const result = await projectMapClient.getNodes({});
      const nodes = result?.nodes || [];
      
      // Test 2: Try to resolve route (commenting out for now due to API changes)
      // const routeResult = await projectMapClient.resolveRoute({ route: '/home' });
      
      // Test 3: Try to fetch composition by ID
      const compositionId = "e3c51bc1-38e4-4a71-b632-f3a35d05db48";
      const compositionResult = await canvasClient.getCompositionById({
        compositionId: compositionId
      });
      
      return res.status(200).json({
        success: true,
        tests: {
          projectMapNodes: {
            success: true,
            nodeCount: nodes.length,
            nodes: nodes.map(node => ({ name: node.name, path: node.path }))
          },
          routeResolution: {
            success: false,
            route: '/home',
            compositionId: null,
            note: 'Route resolution temporarily disabled due to API changes'
          },
          compositionFetch: {
            success: true,
            compositionName: compositionResult.composition._name,
            compositionId: compositionResult.composition._id,
            type: compositionResult.composition.type || 'unknown',
            hasContent: !!compositionResult.composition.slots?.content?.length
          }
        },
        recommendation: 'Project Map node fetching is working! Route resolution temporarily disabled.'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Project Map or Composition error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        note: 'Check if Project Map is configured and composition exists'
      });
    }
    
  } catch (error) {
    console.error('Uniform API error:', error);
    return res.status(500).json({
      error: 'Failed to connect to Uniform API',
      message: error instanceof Error ? error.message : 'Unknown error',
      apiKey: apiKey ? apiKey.substring(0, 8) + '...' : 'missing',
      projectId: projectId ? projectId.substring(0, 8) + '...' : 'missing'
    });
  }
}
