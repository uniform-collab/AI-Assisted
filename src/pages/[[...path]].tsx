import type { GetServerSideProps } from "next";
import { CanvasClient } from "@uniformdev/canvas";
import { UniformComposition } from "@uniformdev/canvas-react";
import type { RootComponentInstance } from "@uniformdev/canvas";
import { createProjectMapService } from "../lib/uniform/projectMap";

interface PageProps {
  composition: RootComponentInstance | null;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { path } = context.query;
  const currentPath = Array.isArray(path) ? `/${path.join('/')}` : path ? `/${path}` : '/';

  // Check for required environment variables
  if (!process.env.UNIFORM_API_KEY || !process.env.UNIFORM_PROJECT_ID) {
    console.error('Missing required Uniform environment variables');
    return {
      props: {
        composition: null,
      },
    };
  }

  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
  });

  const projectMapService = createProjectMapService(
    process.env.UNIFORM_API_KEY,
    process.env.UNIFORM_PROJECT_ID,
    process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app"
  );

  try {
    console.log(`Resolving route for path: ${currentPath}`);
    
    // Use Project Map service to resolve the route
    const routeData = await projectMapService.resolveRoute(currentPath);
    const compositionId = routeData?.compositionId;

    if (!compositionId) {
      console.log(`No composition found for path: ${currentPath}`);
      return {
        notFound: true,
      };
    }

    console.log(`Found composition ID: ${compositionId} for path: ${currentPath}`);

    // Fetch the composition using the resolved ID
    const { composition } = await canvasClient.getCompositionById({
      compositionId: compositionId,
    });

    console.log(`Successfully fetched composition: ${composition._name}`);

    return {
      props: {
        composition,
      },
    };
  } catch (error) {
    console.error(`Failed to resolve route or fetch composition for path ${currentPath}:`, error);
    
    // Fallback: try to get the specific homepage composition for root path
    if (currentPath === '/') {
      try {
        console.log('Fallback: Fetching homepage composition by ID...');
        const { composition } = await canvasClient.getCompositionById({
          compositionId: "e3c51bc1-38e4-4a71-b632-f3a35d05db48" // Homepage composition ID
        });

        console.log('Fallback: Homepage composition fetched successfully');
        return {
          props: {
            composition,
          },
        };
      } catch (fallbackError) {
        console.error('Fallback: Failed to fetch homepage composition:', fallbackError);
      }
    }

    return {
      notFound: true,
    };
  }
};

const Page: React.FC<PageProps> = ({ composition }) => {
  // Handle case when no composition data is available
  if (!composition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  // the UniformComposition component takes over rendering the components on the composition data
  return <UniformComposition data={composition} />;
};

export default Page;
