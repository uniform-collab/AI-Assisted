import type { GetServerSideProps } from "next";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { withUniformGetServerSideProps } from "@uniformdev/canvas-next/route";
import { UniformComposition } from "@uniformdev/canvas-react";
import type { RootComponentInstance } from "@uniformdev/canvas";

interface PageProps {
  data: RootComponentInstance | null;
  preview?: boolean;
}

export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: (context) => {
    const { path } = context.query;
    const currentPath = Array.isArray(path) ? `/${path.join('/')}` : path ? `/${path}` : '/';
    const { preview } = context;
    
    console.log(`Resolving route for path: ${currentPath} (preview: ${preview})`);
    
    return {
      state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
      // This is crucial - pass the actual path to resolve dynamic segments
      path: currentPath,
    };
  },
  // Enable client-side composition handling for dynamic data
  handleComposition: async (routeResponse, context) => {
    const { composition } = routeResponse.compositionApiResponse || {};
    
    if (!composition) {
      console.log(`No composition found for path`);
      return {
        notFound: true,
      };
    }

    console.log(`Successfully fetched composition: ${composition._name} (preview: ${context.preview || false})`);
    
    // Ensure dynamic inputs are resolved
    return {
      props: {
        preview: context.preview || false,
        data: composition,
      },
    };
  },
});

const Page: React.FC<PageProps> = ({ data, preview }) => {
  // Handle case when no composition data is available
  if (!data) {
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
  return <UniformComposition data={data} behaviorTracking="onLoad" />;
};

export default Page;
