# EcoQuest Content Model Documentation

## Overview

This document outlines the complete content model for the EcoQuest sustainable travel platform. The content model is designed to support a comprehensive travel booking and content management system with personalization capabilities.

## Content Architecture

### Core Travel Entities

```
┌─────────────────────────────────────────────────────────────────┐
│                        TRAVEL ECOSYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DESTINATION ──→ TOUR ──→ TRIP (instances)                     │
│       │           │                                             │
│       │           └──→ ITINERARY ──→ ITINERARY DAY ──→ ACTIVITY │
│       │                                    │                    │
│       └──→ Featured Tours                  └──→ PARTNER         │
│                                                                 │
│  TRAVELER ──→ Books ──→ TRIP                                   │
│                                                                 │
│  INTEREST ←──→ Related to ←──→ TOUR/ACTIVITY/PARTNER           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Content & Marketing Entities

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTENT ECOSYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AUTHOR ──→ Creates ──→ BLOG POST                              │
│                           │                                     │
│                           └──→ Related to ──→ INTEREST         │
│                           │                                     │
│                           └──→ Has ──→ ENRICHMENTS             │
│                                                                 │
│  BREADCRUMB LINK (Navigation helper)                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Content Types Reference

### 🏝️ **DESTINATION**
*A geographic location where tours occur*

**Key Fields:**
- `name` (text, required) - Destination name
- `parentDestination` (reference) - Hierarchical relationship to parent destination
- `featuredImage` (asset) - Hero image for the destination
- `quickOverview` (text) - Brief summary
- `description` (rich text) - Detailed destination information
- `featuredTours` (references) - Tours available in this destination
- `travelerPhotos` (assets) - User-generated content
- `visaEntryRequirements` (rich text) - Travel requirements
- `enrichments` (enrichment tags) - Personalization data

**Relationships:**
- **Parent/Child**: Self-referencing for destination hierarchy
- **Tours**: One-to-many with Tour entities
- **Enrichments**: Tagged for personalization

---

### 🎒 **TOUR**
*A packaged travel offering with shared itinerary*

**Key Fields:**
- `name` (text, required) - Tour name
- `description` (text) - Tour overview
- `featuredImage` (asset, required) - Main tour image
- `destination` (reference) - Primary destination
- `start` (text) - Starting location
- `end` (text) - Ending location
- `duration` (text, required) - Tour length
- `physicalRating` (select, required) - Difficulty level (1-5)
- `travelStyle` (multi-select) - Style categories
- `tourType` (multi-select) - Tour categories
- `serviceLevel` (select, required) - Service quality level
- `tourCode` (text, required) - Unique identifier
- `partners` (references) - Associated partners
- `relatedInterests` (references) - Interest categories
- `enrichments` (enrichment tags) - Personalization data

**Nested Content:**
- `itinerary` (block: itineraryDay) - Daily schedule
- `trips` (block: trip) - Specific tour instances

**Relationships:**
- **Destination**: Many-to-one
- **Partners**: Many-to-many
- **Interests**: Many-to-many
- **Trips**: One-to-many (embedded)
- **Itinerary Days**: One-to-many (embedded)

---

### 📅 **TRIP** *(Block Type)*
*Specific instance of a tour with dates and pricing*

**Key Fields:**
- `startDate` (date, required) - Trip start date
- `endDate` (date, required) - Trip end date
- `currentPrice` (number) - Current pricing
- `listPrice` (number, required) - Original price
- `spacesRemaining` (number) - Available spots

**Usage:** Embedded within Tour entities to represent bookable instances

---

### 📋 **ITINERARY DAY** *(Block Type)*
*Single day within a tour itinerary*

**Key Fields:**
- `name` (text, required) - Day identifier
- `title` (text, required) - Day title (e.g., "Quito/Puerto Ayora")
- `description` (text) - Day overview
- `activities` (references, required) - Activities for this day

**Relationships:**
- **Activities**: One-to-many references

**Usage:** Embedded within Tour entities as part of itinerary

---

### 🎯 **ACTIVITY**
*Specific experience within an itinerary day*

**Key Fields:**
- `name` (text, required) - Activity name
- `type` (multi-select) - Activity category
- `description` (text) - Activity details
- `additionalCost` (number) - Extra cost if any
- `isOptional` (checkbox) - Whether activity is optional
- `partners` (references) - Associated service providers
- `enrichments` (enrichment tags) - Personalization data

**Activity Types:**
- Excursion
- Dining
- Craft & Creativity
- Social
- Volunteer

**Relationships:**
- **Partners**: Many-to-many
- **Itinerary Days**: Many-to-many (via references)

---

### 🤝 **PARTNER**
*Vendor or organization affiliated with tours/activities*

**Key Fields:**
- `name` (text, required) - Partner name
- `logo` (asset, required) - Partner logo
- `featuredImage` (asset) - Hero image
- `type` (multi-select, required) - Partner category
- `shortDescription` (text) - Brief overview
- `fullDescription` (rich text) - Detailed information
- `websiteUrl` (link) - Partner website
- `contactEmailAddress` (email link) - Contact information

**Partner Types:**
- Vendor
- NGO
- Non-profit
- Other

**Relationships:**
- **Tours**: Many-to-many
- **Activities**: Many-to-many

---

### ❤️ **INTEREST**
*Topics that travelers might focus on*

**Key Fields:**
- `name` (text, required) - Interest name
- `description` (text) - Interest details
- `icon` (asset) - Visual representation

**Relationships:**
- **Tours**: Many-to-many
- **Activities**: Many-to-many
- **Partners**: Many-to-many (implied)
- **Blog Posts**: Many-to-many

---

### 👤 **TRAVELER**
*Person who books tours*

**Key Fields:**
- `name` (text, required) - Traveler name
- `emailAddress` (email link) - Contact email
- `phoneNumber` (phone link) - Contact phone
- Address fields (multiple text fields)
- `country` (select) - Country of residence

**Supported Countries:**
- France, Germany, Iceland, Spain, Switzerland, United States

---

### 📝 **BLOG POST**
*Content marketing articles*

**Key Fields:**
- `title` (text, required) - Article title
- `summaryAbstract` (text) - Article summary
- `featuredImage` (asset) - Hero image
- `body` (rich text) - Article content
- `author` (reference, required) - Article author
- `publishDate` (date) - Publication date
- `category` (multi-select) - Content categories
- `relatedBlogPosts` (references) - Related articles
- `relatedInterests` (references) - Associated interests
- `enrichments` (enrichment tags) - Personalization data

**Blog Categories:**
- Food and dining
- Travel 101
- Safety
- Planning and preparation

**Relationships:**
- **Author**: Many-to-one
- **Interests**: Many-to-many
- **Related Posts**: Many-to-many (self-referencing)

---

### ✍️ **AUTHOR**
*Blog post authors*

**Key Fields:**
- `name` (text, required) - Author name
- `thumbnail` (asset) - Author photo
- `bio` (rich text) - Author biography

**Relationships:**
- **Blog Posts**: One-to-many

---

### 🔗 **BREADCRUMB LINK** *(Block Type)*
*Navigation helper for breadcrumb trails*

**Key Fields:**
- `title` (text, required) - Link text
- `link` (link) - Target URL or page

**Usage:** Embedded in compositions for navigation

---

## Personalization & Enrichments

### 🎯 **Enrichment System**

All major content types support enrichment tagging for personalization:

**Enrichment Categories:**
1. **Audience Segment** (Cap: 10 points)
   - adventure-seekers, eco-conscious-travelers, family-eco-travelers, etc.

2. **Interest** (Cap: 100 points)
   - wildlife-conservation, hiking-trekking, sustainable-food, etc.

3. **Shopper Type** (Cap: 15 points)
   - deal-seeker, premium-buyer, early-planner, etc.

**Content Types with Enrichments:**
- Tour
- Destination  
- Activity
- Blog Post

---

## Content Relationships Matrix

| Content Type | References | Referenced By | Embedded Content |
|--------------|------------|---------------|------------------|
| **Destination** | Parent Destination, Featured Tours | Tours | - |
| **Tour** | Destination, Partners, Interests | Destinations | Trips, Itinerary Days |
| **Trip** | - | - | *(Block in Tour)* |
| **Itinerary Day** | Activities | - | *(Block in Tour)* |
| **Activity** | Partners | Itinerary Days | - |
| **Partner** | - | Tours, Activities | - |
| **Interest** | - | Tours, Activities, Blog Posts | - |
| **Blog Post** | Author, Related Posts, Interests | Blog Posts | - |
| **Author** | - | Blog Posts | - |
| **Traveler** | - | - | - |
| **Breadcrumb Link** | - | - | *(Block in Compositions)* |

---

## Content Model Benefits

### 🔄 **Flexibility**
- Hierarchical destinations support any geographic structure
- Reusable activities across multiple tours
- Partner relationships enable ecosystem management

### 📊 **Personalization**
- Enrichment tagging on all major content types
- Interest-based content relationships
- Behavioral tracking through content interaction

### 🎯 **Content Strategy**
- Blog posts tied to interests and tours
- Author management for content attribution
- Category-based content organization

### 💼 **Business Operations**
- Tour instance management through trips
- Partner relationship tracking
- Traveler data collection for CRM

---

## Implementation Notes

### Block vs. Content Types
- **Content Types**: Standalone, reusable entities
- **Block Types**: Embedded content within other entities
  - Trip (in Tour)
  - Itinerary Day (in Tour)
  - Breadcrumb Link (in Compositions)

### Localization Support
Most content types support localization for international markets.

### Preview Configurations
Key content types have preview configurations for:
- Tour Detail pages
- Destination Detail pages  
- Blog post pages

This content model provides a robust foundation for EcoQuest's sustainable travel platform, supporting both operational needs and advanced personalization capabilities.

