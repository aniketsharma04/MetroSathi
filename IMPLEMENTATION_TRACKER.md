# Metro Connect - Implementation Tracker

## Project Overview
- **Product:** Metro Connect (Metro Sathi)
- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase + shadcn/ui
- **Current State:** Phase 1 complete. Foundation fully set up with navigation, theme, metro data, Supabase config, DB schema, auth flow, and all route placeholders.

---

## Implementation Plan

### Phase 1: Foundation Setup
- [x] 1.1 Install shadcn/ui core components (button, input, badge, avatar, dialog, dropdown-menu, select, tabs, toast, separator, card, label, textarea, radio-group, checkbox, popover, command, sheet, sonner, tooltip, scroll-area)
- [x] 1.2 Set up custom Tailwind theme tokens (colors from design doc: primary blue, accent orange, gender colors, semantic colors)
- [x] 1.3 Create Delhi Metro station data file (all 12 lines, 300+ stations with sequences, interchange data)
- [x] 1.4 Set up app layout with mobile bottom navigation + desktop sidebar
- [x] 1.5 Update metadata (title, description, viewport, theme-color)
- [x] 1.6 Set up Supabase client (install @supabase/supabase-js, @supabase/ssr, client + server helpers)
- [x] 1.7 Create database schema SQL (profiles, trips, connections, messages, reports + RLS + triggers + storage)
- [x] 1.8 Set up Supabase auth with Google OAuth (auth callback route, onboarding redirect)
- [x] 1.9 Create auth middleware for protected routes
- [x] 1.10 (Added) Create TypeScript types for all entities
- [x] 1.11 (Added) Create landing page with Google sign-in (moved from Phase 2)
- [x] 1.12 (Added) Create dashboard page with "How it Works" and empty states
- [x] 1.13 (Added) Create placeholder pages for all routes (search, trips, connections, profile, onboarding)
- [x] 1.14 (Added) Create .env.local.example template

### Phase 2: Auth & Profile
- [x] 2.1 Build landing/onboarding page (hero, Gmail sign-in button) -- done in Phase 1
- [x] 2.2 Implement Google OAuth flow with Supabase Auth -- done in Phase 1
- [ ] 2.3 Build profile setup page (multi-step: basic info, preferences, done)
- [ ] 2.4 Build profile page (/profile) with view and edit functionality
- [ ] 2.5 Profile picture upload to Supabase Storage
- [ ] 2.6 Auth state management (context/provider)

### Phase 3: Trip Management
- [ ] 3.1 Build StationPicker component (searchable, grouped by metro line)
- [ ] 3.2 Build TripForm component (start/end station, date, time, trip type, repeat days)
- [ ] 3.3 Build Add Trip modal/page
- [ ] 3.4 Build My Trips page (/trips) with grouped list view
- [ ] 3.5 Trip CRUD API routes (create, read, update, delete)
- [ ] 3.6 Trip form validation (Zod schemas)

### Phase 4: Search & Discovery
- [ ] 4.1 Build search page (/search) with search form
- [ ] 4.2 Implement matching algorithm (+-5 stations, +-30 min, gender filter)
- [ ] 4.3 Build TripCard component for search results
- [ ] 4.4 Build profile modal (view other user's profile)
- [ ] 4.5 Search API route with filtering and sorting
- [ ] 4.6 Loading skeletons and empty states

### Phase 5: Connection System
- [ ] 5.1 Build connection request flow (send, accept, decline)
- [ ] 5.2 Build Connections page (/connections) with Requests + My Connections tabs
- [ ] 5.3 Connection API routes (send, accept, decline, list)
- [ ] 5.4 Connection status on search results (none/pending/connected)
- [ ] 5.5 Notification badge on connections tab

### Phase 6: In-App Chat
- [ ] 6.1 Build ChatWindow component (header, messages, input)
- [ ] 6.2 Build ChatMessage component (sent/received bubbles)
- [ ] 6.3 Chat API routes (send message, get messages)
- [ ] 6.4 Supabase Realtime subscription for live messages
- [ ] 6.5 Desktop split view (connections list + chat)
- [ ] 6.6 Message history with date separators

### Phase 7: Safety & Reporting
- [ ] 7.1 Build ReportForm component
- [ ] 7.2 Report API route
- [ ] 7.3 Report confirmation flow

### Phase 8: Dashboard & Polish
- [x] 8.1 Build dashboard page (/) with quick actions, my trips preview -- done in Phase 1
- [x] 8.2 Toast notification system (Sonner configured) -- done in Phase 1
- [ ] 8.3 Error boundaries and error pages
- [ ] 8.4 Loading states across all pages
- [ ] 8.5 Mobile responsiveness audit
- [ ] 8.6 Accessibility audit (focus states, ARIA labels, keyboard nav)

---

## Changes Log

| Date | What Changed | Why | Files Affected | Dependencies Added |
|------|-------------|-----|----------------|-------------------|
| Feb 15 | Created landing page in Phase 1 | Natural to build with layout setup | app/page.tsx | - |
| Feb 15 | Created dashboard page in Phase 1 | Needed to validate layout/nav works | app/(app)/dashboard/page.tsx | - |
| Feb 15 | Created all route placeholders | Ensures navigation works end-to-end | app/(app)/* pages | - |
| Feb 15 | Added TypeScript types file | Needed for type-safe development | lib/types.ts | - |
| Feb 15 | Switched from Geist to Inter font | Design doc specifies Inter as primary | app/layout.tsx | - |

## Decisions Made

| Decision | Reasoning | Date |
|----------|-----------|------|
| Use route group `(app)` for authenticated pages | Clean separation of public vs authenticated layouts | Feb 15 |
| Landing page at `/`, dashboard at `/dashboard` | Middleware redirects logged-in users to dashboard | Feb 15 |
| Inter font instead of Geist | Design doc specifies Inter as primary font | Feb 15 |
| Green Line includes extended Faridabad route | More complete station coverage for users | Feb 15 |
| Sonner for toasts instead of shadcn toast | Better mobile UX, simpler API, rich color support | Feb 15 |

## Known Issues / Tech Debt

| Issue | Severity | Notes |
|-------|----------|-------|
| Next.js 16 middleware deprecation warning | Low | "middleware" convention deprecated in favor of "proxy" - works fine for now |
| No .env.local with actual Supabase keys | Blocker for auth | Need to create Supabase project and add keys |
| Violet Line route may need verification | Low | Some stations may overlap with Magenta Line in Janakpuri area |

## Dependencies Added

| Package | Purpose | Phase |
|---------|---------|-------|
| @supabase/supabase-js | Supabase JS client | 1 |
| @supabase/ssr | Supabase SSR helpers (cookies) | 1 |
| 20 shadcn/ui components | UI component library | 1 |

## Files Created in Phase 1

```
lib/
  types.ts                    - TypeScript types for all entities
  metro-data.ts               - 300+ Delhi Metro stations across 12 lines
  utils.ts                    - cn() utility (existing)
  supabase/
    client.ts                 - Browser Supabase client
    server.ts                 - Server Supabase client
    middleware.ts              - Auth session management
    schema.sql                - Full DB schema with RLS, triggers, storage

components/
  layout/
    app-shell.tsx             - Main app wrapper with sidebar + bottom nav
    bottom-nav.tsx            - Mobile bottom tab navigation
    desktop-sidebar.tsx       - Desktop left sidebar navigation
  ui/
    (20 shadcn components)    - button, input, badge, avatar, dialog, etc.

app/
  layout.tsx                  - Root layout (Inter font, Sonner toaster)
  globals.css                 - Theme tokens + custom colors
  page.tsx                    - Landing page (public, Google sign-in)
  auth/callback/route.ts      - OAuth callback handler
  onboarding/page.tsx         - Onboarding placeholder
  (app)/
    layout.tsx                - Authenticated layout with AppShell
    dashboard/page.tsx        - Dashboard with how-it-works + empty states
    search/page.tsx           - Search placeholder
    trips/page.tsx            - My Trips placeholder
    trips/new/page.tsx        - Add Trip placeholder
    connections/page.tsx      - Connections with tabs placeholder
    profile/page.tsx          - Profile placeholder

middleware.ts                 - Next.js auth middleware
.env.local.example            - Environment variable template
```
