import type { GetServerSideProps } from 'next';

interface DebugPageProps {
  serverInfo: {
    nodeEnv: string;
    hasApiKey: boolean;
    hasProjectId: boolean;
    hasPreviewSecret: boolean;
    apiKeyPreview: string;
    projectId: string;
    timestamp: string;
  };
}

export default function DebugPage({ serverInfo }: DebugPageProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Uniform Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Server Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>NODE_ENV:</strong> {serverInfo.nodeEnv}</p>
            <p><strong>UNIFORM_API_KEY:</strong> {serverInfo.hasApiKey ? `Set (${serverInfo.apiKeyPreview})` : 'Not set'}</p>
            <p><strong>UNIFORM_PROJECT_ID:</strong> {serverInfo.hasProjectId ? serverInfo.projectId : 'Not set'}</p>
            <p><strong>UNIFORM_PREVIEW_SECRET:</strong> {serverInfo.hasPreviewSecret ? 'Set' : 'Not set'}</p>
            <p><strong>Server Timestamp:</strong> {serverInfo.timestamp}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Manual API Test</h2>
          <p className="mb-4">Since the API route isn&apos;t working, try this direct link:</p>
          <a 
            href="/api/test-uniform" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Test API Route (opens in new tab)
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Route Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Expected Homepage ID:</strong> e3c51bc1-38e4-4a71-b632-f3a35d05db48</p>
            <p><strong>Expected Routes:</strong></p>
            <ul className="ml-4 list-disc">
              <li><code>/</code> - Homepage (by composition ID)</li>
              <li><code>/home</code> - Homepage (by slug)</li>
              <li><code>/debug</code> - This debug page</li>
              <li><code>/api/test-uniform</code> - API test endpoint</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<DebugPageProps> = async () => {
  return {
    props: {
      serverInfo: {
        nodeEnv: process.env.NODE_ENV || 'undefined',
        hasApiKey: !!process.env.UNIFORM_API_KEY,
        hasProjectId: !!process.env.UNIFORM_PROJECT_ID,
        hasPreviewSecret: !!process.env.UNIFORM_PREVIEW_SECRET,
        apiKeyPreview: process.env.UNIFORM_API_KEY ? process.env.UNIFORM_API_KEY.substring(0, 8) + '...' : 'none',
        projectId: process.env.UNIFORM_PROJECT_ID || 'none',
        timestamp: new Date().toISOString(),
      }
    }
  };
};
