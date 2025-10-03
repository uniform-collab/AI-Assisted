# Uniform Context and Enrichments Implementation

## Overview

Your EcoQuest app has been successfully updated to use Uniform Context and enrichments from content entries. This implementation enables personalized experiences based on visitor behavior and interests.

## What's Been Implemented

### 1. Uniform Context Setup
- ✅ **Context packages installed**: All required Uniform Context packages are installed
- ✅ **Context manifest**: Configured to download and sync enrichment definitions
- ✅ **Context instance**: Created with proper SSR support for Next.js Page Router
- ✅ **App integration**: Updated `_app.tsx` and `_document.tsx` for full Context support

### 2. New Components


#### PersonalizedBanner Component  
- **Purpose**: Dynamic banner that changes based on visitor's enrichment scores
- **Location**: `src/components/uniform/PersonalizedBanner.tsx`
- **Features**:
  - Adaptive content based on highest scoring enrichments
  - Different messaging for different visitor types
  - Debug info in development mode

### 3. Enhanced Existing Components

#### TourCard Component
- **Enhancement**: Now tracks enrichments from tour entries
- **How it works**: When a tour card is viewed, it applies the enrichments defined in the tour's content entry
- **Example**: Viewing "Epic Australia" tour increases scores for wildlife-conservation, marine-activities, eco-conscious-travelers, etc.

#### BlogArticle Component
- **Enhancement**: Tracks enrichments from blog post entries
- **How it works**: When a blog article is viewed, it applies enrichments from the blog entry

### 4. Enrichment Categories

Your project uses three enrichment categories:

1. **Audience Segment** (`ce3586be-d714-42e6-a201-dfdbd0270ed5`)
   - adventure-seekers, eco-conscious-travelers, family-eco-travelers, etc.
   - Cap: 10 points

2. **Interest** (`2a729d76-0a0d-4b64-b6a5-3f66711c9caf`)
   - wildlife-conservation, hiking-trekking, sustainable-food, etc.
   - Cap: 100 points

3. **Shopper Type** (`4af66be8-8e5e-4c91-b09b-68edeeebba86`)
   - deal-seeker, premium-buyer, early-planner, etc.
   - Cap: 15 points

### 5. Utility Functions

#### enrichmentUtils.ts
- **Location**: `src/lib/uniform/enrichmentUtils.ts`
- **Functions**:
  - `applyEntryEnrichments()`: Applies enrichments from entries to Context
  - `getEnrichmentDisplayName()`: Gets human-readable names for enrichment categories
  - `getEngagementLevel()`: Determines engagement level from scores
  - `getTopInterests()`: Gets visitor's top interests
  - `formatInterestKey()`: Formats interest keys for display

## How It Works

1. **Content Entry Enrichments**: Tour and blog entries have enrichment data that defines what interests/segments they appeal to

2. **Automatic Tracking**: When components are viewed, they automatically apply enrichments to the visitor's Context profile

3. **Real-time Personalization**: The PersonalizedBanner adapts its content based on the visitor's accumulated enrichment scores

4. **Visual Feedback**: The EnrichmentDemo component shows visitors how their profile is building up

## Component Patterns Created

- **Enrichment Demo - Default**: Pre-configured pattern ready to use
- **Personalized Banner - Dynamic**: Dynamic banner pattern

## Usage Examples

### Adding the PersonalizedBanner to a page:
```typescript
// In Uniform Canvas, add the "Personalized Banner" component
// Or use the "Personalized Banner - Dynamic" pattern
```

### Using enrichments in custom components:
```typescript
import { applyEntryEnrichments } from "../lib/uniform/enrichmentUtils";
import { useUniformContext } from "@uniformdev/context-react";

function MyComponent({ entry }) {
  const { context } = useUniformContext();
  
  useEffect(() => {
    applyEntryEnrichments(context, entry);
  }, [entry, context]);
  
  // Component logic...
}
```

## Testing the Implementation

1. **Start the dev server**: `npm run dev`
2. **Add components**: Use Uniform Canvas to add the EnrichmentDemo and PersonalizedBanner to a page
3. **Browse content**: View different tours and blog posts to see enrichment scores increase
4. **See personalization**: Watch the PersonalizedBanner adapt based on your interests

## Development Notes

- **Context Manifest**: Automatically downloaded before dev/build via `npm run uniform:manifest`
- **Debug Mode**: PersonalizedBanner shows enrichment scores in development
- **SSR Support**: Full server-side rendering support for personalization
- **Type Safety**: All components use proper TypeScript types

## Next Steps

You can now:
- Create more personalized components using visitor enrichment data
- Build recommendation engines based on interests
- Implement A/B testing with Context criteria
- Create targeted content experiences

The foundation is in place for sophisticated personalization based on visitor behavior and content engagement!
