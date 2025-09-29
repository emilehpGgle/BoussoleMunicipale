# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint checks

## Project Architecture

This is a **Boussole Municipale** (Municipal Compass) Next.js 15 application that helps Quebec City voters find their political alignment with municipal parties through an interactive questionnaire.

### Core Architecture

**Next.js App Router Structure:**
- `/app` - Pages using App Router (Next.js 13+)
- `/components` - Reusable React components and UI library
- `/lib` - Core business logic and data
- `/hooks` - Custom React hooks for state management

### Key Data Files

**Political Engine (`/lib/`):**
- `boussole-data.ts` - Contains all 21 questions, party positions, and political data structure
- `political-map-calculator.ts` - Algorithms for calculating user political position on 2D compass
- `postal-code-mapping.ts` - Maps Quebec postal codes to municipal districts

**API Routes (`/app/api/`):**
- Database operations for user responses, profiles, and results
- Share functionality for social media integration
- Supabase integration endpoints

### Data Structure

**Questions (`boussoleQuestions`):**
- 21 questions across 6 municipal categories (transport, housing, environment, governance, economics, security)
- Multiple response types: agreement scales, importance rankings, custom labels
- Each question has category, weight, and description

**Parties (`partiesData`):**
- 7 major Quebec municipal parties with complete political positions
- Each party has orientation, strengths/weaknesses, priorities, and position on every question
- Includes leader info, logos, colors, and website URLs

**Political Calculation (Bicephalous System):**

**1. Political Position (Educational Map):**
- 2D compass: Economic axis (interventionism ↔ free market) and Social axis (conservative ↔ progressive)
- Euclidean distance calculation between user and party positions
- Used for educational positioning on political map (`political-compass-chart.tsx`)
- Function: `calculateExactCompatibilityWithDetails()`

**2. Direct Affinity (Voting Decision):**
- Question-by-question distance calculation using agreement scores (FA=2, PA=1, N=0, PD=-1, FD=-2)
- Priority-based weighting system with user-selected municipal priorities:
  - 1st priority: ×2.0 multiplier
  - 2nd priority: ×1.75 multiplier
  - 3rd priority: ×1.5 multiplier
- Scarcity bonus: ×1.5 for single-question categories (tramway, 3rd link) to ensure equity
- Distance formula: `(4 - |score_user - score_party|) / 4 * 100`
- Final score: weighted average of all question agreements
- Used for practical voting decisions (`resultats/page.tsx`)
- Function: `calculateDirectCompatibility()`

### UI Components

**Built with:**
- Radix UI primitives
- Tailwind CSS for styling
- Shadcn/ui component library
- Custom political compass chart with Recharts

**Key Pages:**
- `/profil` - User demographic information
- `/test-politique-municipal` - Interactive 21-question survey
- `/resultats` - Political compass results and party matches
- `/parti/[id]` - Detailed party information pages

### State Management

**Custom Hooks:**
- `useProfile.ts` - User demographic data
- `useUserResponses.ts` - Question responses and progress
- `useResults.ts` - Political calculations and party matches
- `usePriorities.ts` - User priority rankings

### Database Integration 

Uses Supabase for:
- User sessions and profiles
- Response storage
- Results caching
- Share functionality

When working on this codebase, always consider the political neutrality and accuracy of the data, especially when modifying questions or party positions in `boussole-data.ts`.

## Priority Weighting System - Direct Affinity Calculation

### Core Architecture (`/lib/political-map-calculator.ts`)

**Category Mapping System:**
- Maps database question categories to user-selectable priorities
- Handles special municipal issues (tramway, 3rd link) with dedicated mapping
- Excludes priority selection question itself from compatibility calculation

**Weighting Algorithm:**
```typescript
// Base multipliers by priority rank
1st priority: ×2.0 multiplier
2nd priority: ×1.75 multiplier
3rd priority: ×1.5 multiplier
Non-priority questions: ×1.0 (base weight)

// Scarcity bonus for equity
Single-question categories: ×1.5 additional bonus
Multi-question categories: ×1.0 (no bonus)

// Final weight calculation
finalWeight = baseMultiplier × scarcityBonus
```

**Key Implementation Details:**
- `categoryToPriorityMapping`: Maps DB categories to priority names
- `calculateQuestionWeight()`: Applies priority and scarcity bonuses
- `analyzeQuestionDistribution()`: Counts questions per category for scarcity calculation
- Weighted average: `totalWeightedScore / totalWeight`

**Equity Considerations:**
- Municipal-specific issues (tramway, 3rd link) get scarcity bonus to prevent dilution
- Questions without priority mapping receive base weight (1.0) to remain included
- System ensures balanced influence across all municipal domains

### Validation and Testing

**Debug Mode Available:**
- Comprehensive console logging in `calculateDirectCompatibility()`
- Shows priority mapping, weights, and contribution per question
- Displays final score calculation breakdown

**Critical Test Scenarios:**
1. **Priority Impact**: Verify questions in user priorities get correct multipliers
2. **Scarcity Bonus**: Confirm tramway/3rd link questions get ×1.5 bonus
3. **Non-Priority Handling**: Ensure unmapped questions still contribute with ×1.0 weight
4. **Edge Cases**: Test with no priorities selected, single priority, identical priorities

## Lessons Learned - Next.js 15 Build Errors (Commit df29959)

### Problem Encountered: Client/Server Component Architecture Conflicts

**Issue 1: Metadata Export + Client Components Conflict**
```
Error: You are attempting to export "metadata" from a component marked with "use client", which is disallowed.
```

**Root Cause:**
- In Next.js 15 App Router, `export const metadata` MUST be in Server Components only
- framer-motion animations require `'use client'` (Client Components only)
- Cannot have both in the same file - architectural limitation

**Solution Applied:**
- Created `/components/ui/rainbow-button-client.tsx` wrapper with `'use client'`
- Kept SEO pages as Server Components to preserve metadata exports
- Used pattern: `import { RainbowButtonClient as RainbowButton }`

**Issue 2: Export * in Client Boundary**
```
Error: It's currently unsupported to use "export *" in a client boundary.
```

**Root Cause:**
- framer-motion library uses `export *` which conflicts with Next.js 15 client boundaries
- Occurs when Server Components try to use components requiring client-side features

**Solution Applied:**
- Wrapper Client Component isolates the animation logic
- Server Component imports the wrapper instead of direct framer-motion components

### Prevention Guidelines

**1. Architecture Planning:**
- ✅ Always plan Client vs Server Component separation BEFORE adding animations
- ✅ SEO pages with metadata = Server Components (no `'use client'`)
- ✅ Animation components = Client Components (with `'use client'`)
- ✅ Use wrapper pattern when Server Components need Client functionality

**2. Component Design Pattern:**
```tsx
// ✅ Correct: Wrapper Client Component
'use client'
import { OriginalComponent } from './original'
export { OriginalComponent as ClientWrapper }

// ✅ Server Component can use it
import { ClientWrapper } from './wrapper-client'
export const metadata = { ... } // This works
```

**3. ESLint Prevention:**
- Run `pnpm run lint` before every build
- Fix unused imports immediately (leads to build failures in production)
- Escape all apostrophes in JSX text: `l'histoire` → `l&apos;histoire`

**4. Build Verification Workflow:**
1. Test build frequently during development: `pnpm run build`
2. Address architecture errors first (Client/Server separation)
3. Clean up ESLint errors second (imports, apostrophes)
4. Never commit code that doesn't build successfully

**5. Next.js 15 Specific Rules:**
- `metadata` exports = Server Components ONLY
- Animations/state/effects = Client Components ONLY
- Use wrapper pattern to bridge the gap
- Prefer selective Client Component marking over page-level `'use client'`

This pattern ensures optimal SEO, proper architecture, and build reliability.

## SEO Configuration - Vercel Domain Management (Critical)

### Problem: Google Indexing Multiple Domains
Even with a custom domain configured, Google may index both `boussolemunicipale.com` AND `*.vercel.app` domains, creating duplicate content that dilutes SEO.

### Solution: Official Vercel 2025 4-Step Process

#### ✅ Steps 1-2: Implemented in Code
- **X-Robots-Tag headers**: Added to `next.config.mjs` to prevent Vercel domains from being indexed
- **Dynamic canonical tags**: Added to `app/layout.tsx` to always point to `boussolemunicipale.com`

#### 🔧 Step 3: WAF Custom Rule (MANUAL - Required in Vercel Dashboard)
**CRITICAL**: This must be configured manually in Vercel Dashboard:

1. Go to **Project Dashboard** → **Firewall** → **WAF**
2. Click **Add Rule** → Name: "Redirect to canonical domain"
3. Configure the rule:
   - **If**: Hostname **is any of** → Enter: `boussole-municipale-emile-pelletiers-projects.vercel.app`
   - **And**: Hostname **is any of** → Enter: `boussole-municipale-j5wgqoprp-emile-pelletiers-projects.vercel.app`
   - **Then**: **Redirect** → Enter: `https://boussolemunicipale.com`
4. Click **Save Rule**

**Result**: All traffic from Vercel domains automatically redirects to the canonical domain.

#### 🧪 Step 4: Verification Commands
After deploying and configuring WAF:

```bash
# Test X-Robots-Tag header (should show "X-Robots-Tag: noindex")
curl -I https://[project].vercel.app

# Test WAF redirect (should redirect to boussolemunicipale.com)
curl -I https://[project].vercel.app

# Google Search Console URL Inspection
# Check indexing status at: https://search.google.com/search-console
```

### Expected Results
- ❌ Vercel domains: Not indexed by Google
- ✅ boussolemunicipale.com: Primary domain for all SEO
- 🚀 Consolidated ranking signals and improved SEO performance

## Animation Architecture - Server/Client Hybrid Pattern (Optimal)

### Architecture Philosophy: "Client Components to the Leaves"

**Pattern Established (Commit 71b4fd4):** Optimal architecture for Next.js 15 animations with SEO preservation.

**Core Principle:**
- ✅ Pages = Server Components (for metadata and SEO)
- ✅ Animations = Client Component wrappers (for interactivity)
- ✅ Content flows through children pattern

### Implementation Structure

**1. Animation Wrappers (`/components/ui/animated-wrappers.tsx`):**
```tsx
'use client'
import { motion } from 'framer-motion'

export function AnimatedSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// More wrappers: AnimatedGrid, AnimatedTitle, AnimatedStats, AnimatedCTA
```

**2. Page Pattern (Server Component + Metadata):**
```tsx
// ✅ Server Component with metadata
export const metadata: Metadata = {
  title: "Page Title",
  description: "SEO description",
  // ... complete SEO config
}

export default function PageName() {
  return (
    <div>
      <AnimatedSection delay={0.2}>
        <h1>Content wrapped in Client animation</h1>
      </AnimatedSection>
    </div>
  )
}
```

### Benefits of Hybrid Architecture

**SEO Performance:**
- Full metadata control in Server Components
- Static content pre-rendered
- Search engines crawl content before hydration

**Animation Performance:**
- Animations isolated to Client Components only
- Minimal client-side JavaScript
- Progressive enhancement approach

**Development Experience:**
- Clear separation of concerns
- Reusable animation wrappers
- Type-safe animation props

### Applied Across All Pages

**✅ Implemented Pages:**
- `app/page.tsx` - Homepage (optimized from full Client Component)
- `app/(static)/comment-ca-marche/page.tsx` - Process explanation
- `app/(static)/pourquoi-important/page.tsx` - Importance messaging
- `app/(static)/faq/page.tsx` - FAQ with accordion animations
- `app/(static)/centre-aide/page.tsx` - Help center

**Animation Consistency:**
- Staggered entrance animations (0.1s-0.5s delays)
- Scroll-triggered reveals with `whileInView`
- Grid layouts with coordinated timing
- CTA sections with enhanced emphasis

### Wrapper Components Available

**Layout Animations:**
- `AnimatedSection` - Basic fade-in with delay
- `AnimatedGrid` - Staggered grid animations
- `AnimatedStats` - Emphasized statistics display

**Content Animations:**
- `AnimatedTitle` - Enhanced title reveals
- `AnimatedCTA` - Call-to-action emphasis

**Usage Pattern:**
```tsx
<AnimatedSection delay={0.2} className="mb-8">
  <AnimatedGrid staggerDelay={0.1}>
    <Card>Static content</Card>
    <Card>More content</Card>
  </AnimatedGrid>
</AnimatedSection>
```

### Architecture Decision Rationale

**Why Not Full Client Components?**
- ❌ Loss of metadata export capability
- ❌ SEO performance degradation
- ❌ Larger JavaScript bundle size
- ❌ Delayed content availability

**Why Not Server-Safe Fallbacks?**
- ❌ No actual animations (poor UX)
- ❌ Conditional rendering complexity
- ❌ Inconsistent animation behavior

**✅ Hybrid Pattern Advantages:**
- Perfect SEO with full animations
- Follows Next.js 15 best practices
- Minimal performance impact
- Maximum developer flexibility

This hybrid architecture is now the standard for all new animated pages in the application.