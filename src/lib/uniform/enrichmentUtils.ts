import { Context } from "@uniformdev/context";

// Enrichment category IDs
export const ENRICHMENT_CATEGORIES = {
  AUDIENCE_SEGMENT: 'ce3586be-d714-42e6-a201-dfdbd0270ed5',
  INTEREST: '2a729d76-0a0d-4b64-b6a5-3f66711c9caf',
  SHOPPER_TYPE: '4af66be8-8e5e-4c91-b09b-68edeeebba86'
} as const;

// Helper to apply enrichments from Uniform entries to Context
export function applyEntryEnrichments(context: Context | null, entry: any) {
  if (!context || !entry?.fields?.enrichments?.value) {
    return;
  }

  const enrichments = entry.fields.enrichments.value;
  
  enrichments.forEach((enrichment: any) => {
    const { cat, key, str } = enrichment;
    // Update context with enrichment data
    context.update({
      enrichments: [
        {
          str: parseFloat(str) || 0,
          cat: cat,
          key: key
        }
      ]
    });
  });
}

// Helper to get enrichment display names
export function getEnrichmentDisplayName(enrichmentId: string): string {
  switch (enrichmentId) {
    case ENRICHMENT_CATEGORIES.AUDIENCE_SEGMENT:
      return 'Audience Segment';
    case ENRICHMENT_CATEGORIES.INTEREST:
      return 'Interest';
    case ENRICHMENT_CATEGORIES.SHOPPER_TYPE:
      return 'Shopper Type';
    default:
      return 'Unknown Enrichment';
  }
}

// Helper to determine engagement level based on score
export function getEngagementLevel(score: number, maxScore: number = 100): string {
  const percentage = (score / maxScore) * 100;
  
  if (percentage > 70) return 'Very High';
  if (percentage > 50) return 'High';
  if (percentage > 30) return 'Moderate';
  if (percentage > 10) return 'Low';
  return 'Minimal';
}

// Helper to get the top interests from context scores
export function getTopInterests(scores: Record<string, number>, limit: number = 3): Array<{key: string, score: number, category: string}> {
  const interests: Array<{key: string, score: number, category: string}> = [];
  
  Object.entries(scores).forEach(([enrichmentId, score]) => {
    if (enrichmentId === ENRICHMENT_CATEGORIES.INTEREST && typeof score === 'object') {
      Object.entries(score).forEach(([key, value]) => {
        interests.push({
          key,
          score: value as number,
          category: 'Interest'
        });
      });
    }
  });
  
  return interests
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Helper to format interest keys for display
export function formatInterestKey(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
