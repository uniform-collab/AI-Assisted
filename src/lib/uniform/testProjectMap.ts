/**
 * Test utilities for Project Map integration
 * This file can be used to test Project Map functionality in development
 */

import { getProjectMapService } from './projectMap';

export async function testProjectMapIntegration() {
  console.log('🗺️ Testing Project Map Integration...');
  
  const projectMapService = getProjectMapService();
  
  if (!projectMapService) {
    console.warn('❌ Project Map service not available - check environment variables');
    return false;
  }

  try {
    // Test getting project map nodes
    console.log('📋 Fetching project map nodes...');
    const nodes = await projectMapService.getNavigationStructure();
    console.log(`✅ Found ${nodes.length} project map nodes`);

    // Test navigation structure
    console.log('🧭 Building navigation structure...');
    const navigation = await projectMapService.getNavigationStructure();
    console.log(`✅ Built navigation with ${navigation.length} items`);

    // Test route resolution
    console.log('🔍 Testing route resolution...');
    const homeRoute = await projectMapService.resolveRoute('/');
    console.log(`✅ Home route resolved:`, homeRoute ? 'Found' : 'Not found');

    console.log('🎉 Project Map integration test completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Project Map integration test failed:', error);
    return false;
  }
}

export async function logProjectMapStructure() {
  const projectMapService = getProjectMapService();
  
  if (!projectMapService) {
    console.warn('Project Map service not available');
    return;
  }

  try {
    const navigation = await projectMapService.getNavigationStructure();
    console.log('🗺️ Current Project Map Structure:');
    console.table(navigation.map(item => ({
      title: item.title,
      path: item.path,
      hasChildren: item.children.length > 0,
      isRoot: item.isRoot
    })));
  } catch (error) {
    console.error('Error logging project map structure:', error);
  }
}
