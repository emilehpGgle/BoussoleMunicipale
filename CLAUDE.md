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

**Political Calculation:**
- 2D compass: Economic axis (interventionism ↔ free market) and Social axis (conservative ↔ progressive) 
- Weighted scoring system based on question importance and user answers
- Distance calculation between user and party positions for compatibility percentage

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