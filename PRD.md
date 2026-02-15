# Product Requirements Document: Metro Connect

## Executive Summary

**Product Name:** Metro Connect

**Product Type:** Web application (mobile-first)

**Target Launch:** MVP in 2-3 weeks

**Core Value Prop:** Connect Delhi Metro travelers on the same route at the same time to reduce loneliness, increase safety through companionship, and enable social connections during daily commutes.

**The One-Liner:** Find and connect with fellow Delhi Metro travelers on your route, right when you need company.

**MVP Scope:** Gmail-authenticated platform where users can post their metro trips (current or scheduled), search for companions traveling similar routes with gender/time filters, send connection requests, and chat in-app. Simple reporting mechanism for safety.

---

## Problem Statement

### The Problem

Millions of people travel alone in Delhi Metro daily. This creates:

- **Loneliness:** Commuters feel isolated during 30-60 min journeys, especially newcomers to Delhi
- **Safety concerns:** Solo travelers (especially women) feel vulnerable during late hours or less-crowded routes
- **Missed connections:** People want to make friends but have no structured way to connect with others on the same route
- **Wasted opportunity:** Daily commute is dead time when it could be social time

### Why Now?

- Post-pandemic, people are craving in-person social connections again
- Metro ridership is back to pre-pandemic levels (~6-7 million daily)
- Young professionals (20-35) are comfortable meeting strangers via apps (dating apps normalized this)
- No existing solution for metro-specific companion finding in India

### Current Alternatives & Why They Fail

- **General friend-finding apps** (Bumble BFF, etc.): Not location/route-specific, no real-time matching
- **Metro official apps:** Only for ticketing and route planning, zero social features
- **Random conversations in metro:** Awkward, no filtering, no safety net

---

## Target Users & Personas

### Primary Persona: Priya - The Safety-Conscious Commuter

- **Age:** 24, working professional
- **Route:** Noida Sector 18 → Rajiv Chowk (daily, 8:30 AM)
- **Pain point:** Feels unsafe traveling alone early morning, wants female companions for her daily commute
- **Tech savvy:** Uses Instagram, comfortable with app-based solutions
- **Goal:** Find 2-3 regular female travel buddies for her route

### Secondary Persona: Arjun - The Lonely Newcomer

- **Age:** 27, recently moved to Delhi for work
- **Route:** Variable (exploring the city on weekends)
- **Pain point:** Doesn't know anyone in Delhi, wants to make friends
- **Tech savvy:** Heavy social media user
- **Goal:** Meet people who share similar interests, even if just for one journey

### Tertiary Persona: Ravi - The Daily Commuter

- **Age:** 32, settled professional
- **Route:** Dwarka → Kashmere Gate (daily, 9 AM sharp)
- **Pain point:** Bored during 45-min commute, wants conversation
- **Tech savvy:** Uses apps for convenience
- **Goal:** Find someone for casual chat, maybe long-term commute buddy

---

## User Stories

**As a new user:**

- I want to sign up with just my Gmail so I can start quickly without hassle
- I want to add my basic profile (name, age, gender, photo) so others can identify me
- I want to see how the app works before committing so I understand the value

**As a person planning to travel:**

- I want to post my trip (start station, end station, time) so others can find me
- I want to schedule future trips or set repeating trips so I don't have to add daily
- I want to specify my gender and preferences so I match with compatible people

**As someone searching for companions:**

- I want to search by route and time so I find people traveling with me
- I want to filter by gender so I feel safe and comfortable
- I want to see profile pics, age, and basic info before connecting so I can decide

**As someone connecting:**

- I want to send a connection request so the other person can choose to accept
- I want to chat with accepted connections in-app so we can coordinate meeting
- I want to see our matching route and time clearly so we know where to meet

**As a safety-conscious user:**

- I want to report problematic users so the platform stays safe
- I want to control what personal info I share (phone/social media) so I maintain privacy

---

## Feature List (MVP Only - Prioritized)

### P0 (Must Have - Core MVP)

**1. Authentication & Profile**

- Gmail OAuth login (no manual signup)
- Profile creation: Name, Age, Gender, Profile Picture, Short Bio (100 chars)
- Optional: Instagram/Twitter handle, Phone number (hidden by default, shareable after connection)
- Profile edit functionality

**2. Trip Management**

- Add trip: Start station (dropdown), End station (dropdown), Date & Time
- Trip types:
    - One-time (specific date/time)
    - Repeating (select days of week, same time)
- Edit/delete trips
- View "My Trips" (upcoming trips only)

**3. Search & Discovery**

- Search form: Start station, End station, Date/Time
- Filters: Gender preference (All/Male/Female/Other)
- Matching logic: Show users with trips where:
    - Their start station is within ±5 stations of search start
    - Their end station is within ±5 stations of search end
    - Their time is within ±30 minutes of search time
    - Gender matches filter preference
- Results view: Card with profile pic, name, age, gender, exact start/end stations, time
- Empty state: "No travelers found. Try adjusting your search or filters."

**4. Connection System**

- "Connect" button on search results
- Connection request notification (in-app, simple badge)
- Accept/Reject connection requests
- View "My Connections" list

**5. In-App Chat**

- Text-only chat between accepted connections
- Message history (last 30 days)
- Online/offline status indicator
- No read receipts in MVP

**6. Safety & Reporting**

- "Report User" button on any profile
- Simple report form: Reason (dropdown: Fake profile, Harassment, Inappropriate behavior, Other), Optional text description
- Confirmation message: "Report submitted. We'll review within 24 hours."
- Reported user not blocked in MVP (manual review only)

### P1 (Should Have - If Time Permits)

- Profile completion percentage indicator (encourages filling details)
- "Share contact" feature (one-time reveal of phone/social after connection)
- Delete account functionality
- Trip history (past trips, read-only)

### P2 (Nice to Have - Post-MVP)

- Push notifications (connection requests, messages)
- Metro line color coding in UI
- Distance calculation (KM between stations)

---

## User Flows (Detailed Step-by-Step)

### Flow 1: New User Onboarding

1. **Landing page**
    - User sees: Hero image of metro + "Find your metro travel buddy"
    - CTA: "Sign up with Gmail" button
    - User clicks button
2. **Gmail OAuth**
    - Redirects to Google OAuth consent screen
    - User grants permissions
    - Redirects back to app
3. **Profile Setup (First Time)**
    - Screen: "Complete your profile"
    - Fields shown:
        - Name (pre-filled from Gmail, editable)
        - Age (number input, required)
        - Gender (dropdown: Male/Female/Other, required)
        - Profile Picture (upload, required - default avatar if skipped)
        - Bio (textarea, 100 char limit, optional)
    - "Skip for now" button → Goes to dashboard with incomplete profile banner
    - "Save & Continue" button → Goes to dashboard
4. **Dashboard (First Visit)**
    - Shows: "How it works" card with 3 steps (Add trip → Search companions → Connect & Chat)
    - CTAs: "Add My First Trip" or "Search for Companions"

### Flow 2: Adding a Trip

1. **User clicks "Add Trip" from dashboard**
    - Modal/page opens with form
2. **Fill trip details**
    - Start Station (searchable dropdown, all Delhi Metro stations)
    - End Station (searchable dropdown, validation: must be different from start)
    - Travel Date (date picker, default: today)
    - Travel Time (time picker, 24-hour format)
    - Trip Type (radio buttons):
        - [ ]  One-time
        - [ ]  Repeating (shows weekday checkboxes if selected: M T W T F S S)
3. **Submit**
    - Validation: All required fields filled
    - Success: "Trip added! Others can now find you."
    - Redirect: "My Trips" page showing the new trip
    - Error states:
        - If start = end: "Start and end stations must be different"
        - If time is in past (for today): "Time must be in future"

### Flow 3: Searching for Companions

1. **User clicks "Find Companions" from dashboard**
    - Search page with form
2. **Enter search criteria**
    - Start Station (dropdown)
    - End Station (dropdown)
    - Date (date picker, default: today)
    - Time (time picker)
    - Gender Filter (dropdown: All, Male, Female, Other, default: All)
    - "Search" button
3. **View results**
    - **If matches found:**
        - List of cards, each showing:
            - Profile pic (circular)
            - Name, Age, Gender badge
            - Route: "Kashmere Gate → Dwarka Sector 21" (with metro icon)
            - Time: "9:30 AM" (with clock icon)
            - Match indicator: "±2 stations from your route"
            - "Connect" button (or "Connected" if already connected, or "Pending" if request sent)
        - Sort: Closest match first (fewer station difference)
    - **If no matches:**
        - Empty state illustration
        - Text: "No travelers found on this route"
        - Suggestions:
            - "Try adjusting your time (±30 min)"
            - "Remove gender filter"
            - "Search a different route"
        - "Search Again" button
4. **Click on a card (not "Connect" button)**
    - Opens profile modal:
        - Larger profile pic
        - Full name, age, gender
        - Bio (if filled)
        - Trip details (full route, exact time)
        - Social links (if shared by user and connected)
        - "Connect" or "Message" button (if already connected)
        - "Report User" link (bottom, subtle)

### Flow 4: Sending & Accepting Connection

**Sender Side:**

1. User clicks "Connect" on someone's card
2. Button changes to "Pending" (disabled)
3. Toast notification: "Connection request sent to [Name]"

**Receiver Side:**

1. Notification badge appears on "Connections" tab (red dot with count)
2. User navigates to "Connections" → "Requests" tab
3. Sees list of pending requests with:
    - Profile pic, name, age
    - Matching route and time
    - "Accept" and "Decline" buttons
4. User clicks "Accept"
    - Request moves to "My Connections" tab
    - Both users can now message each other
    - Toast: "You're now connected with [Name]!"
5. User clicks "Decline"
    - Request disappears
    - No notification to sender (ghost decline)

### Flow 5: Chatting with Connection

1. **User opens "My Connections" tab**
    - List of accepted connections
    - Each card shows: Profile pic, name, last message preview, timestamp
    - Unread message indicator (blue dot)
2. **User clicks on a connection**
    - Opens chat screen (full-page or sidebar)
    - Shows:
        - Header: Profile pic, name, "View Profile" link
        - Message history (scrollable, most recent at bottom)
        - Text input box at bottom
        - "Send" button
3. **User types and sends message**
    - Message appears immediately in sender's chat (optimistic UI)
    - Sent to server
    - Appears in receiver's chat in real-time (or on refresh if not online)
4. **Error states:**
    - If send fails: "Message not sent. Tap to retry."
    - If connection is lost: "Reconnecting..." banner at top

### Flow 6: Reporting a User

1. **User clicks "Report User" on profile modal**
    - Opens report form modal
2. **Fill report details**
    - Reason (dropdown):
        - Fake/Misleading Profile
        - Harassment or Abuse
        - Inappropriate Behavior
        - Spam
        - Other
    - Description (textarea, optional, 500 char limit)
    - "Submit Report" button
3. **Submit**
    - Loading state on button
    - Success: Modal closes, toast: "Report submitted. We'll review this within 24 hours."
    - No change to user's visibility/connection in MVP

---

## Out of Scope (V2 Features)

**Safety & Verification:**

- Phone number OTP verification
- Government ID verification
- Background checks/criminal record screening
- Panic button with live location sharing
- SOS contacts integration
- Real-time location tracking during trip

**Advanced Social Features:**

- User ratings and reviews
- Trip completion confirmation (both users confirm they traveled together)
- Recommendation algorithm based on feedback
- User blocking functionality
- Travel history with specific companions
- Group trips (3+ people traveling together)
- Public vs private trips (currently all trips are visible to searches)

**Communication:**

- Voice/video calling
- Image/file sharing in chat
- Read receipts
- Typing indicators
- Push notifications (for MVP, users refresh manually)

**Discovery & Matching:**

- AI-based compatibility matching
- Interest tags (books, music, etc.)
- Smart suggestions ("You might like..." based on patterns)
- Popular routes/times insights
- Nearby users (live location-based)

**Gamification:**

- Badges for regular travelers
- Streak tracking (consecutive days)
- Leaderboards

**Monetization:**

- Premium features (unlimited connections, verified badge, etc.)
- Ads

---

## Technical Considerations

### Tech Stack (Recommended)

**Frontend:**

- **Next.js 14+** (App Router) - SSR for better mobile performance
- **TypeScript** - Type safety, better DX
- **Tailwind CSS** - Rapid UI development, mobile-first utilities
- **shadcn/ui** - Pre-built accessible components (modal, dropdown, etc.)
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation (shared between frontend/backend)

**Backend:**

- **Next.js API Routes** - For CRUD operations (auth, profiles, trips, connections)
    - Simple, same repo, good for MVP
    - No separate deployment needed
- **Supabase** (Recommended) - All-in-one backend solution:
    - **PostgreSQL database** - Relational data (users, trips, connections, messages)
    - **Supabase Auth** - Gmail OAuth built-in
    - **Supabase Storage** - Profile picture uploads
    - **Supabase Realtime** - WebSocket-based real-time chat (perfect for MVP)
    - **Row Level Security** - Built-in privacy controls
    - **Free tier:** 500MB database, 1GB storage, 2GB bandwidth (enough for MVP testing)

**Alternative for Chat (if Supabase Realtime doesn't fit):**

- **Socket.io** - More control, but requires separate Node.js server
- **Pusher** - Managed WebSocket service (paid, but easy)
- **Firebase Firestore** - Good for chat, but mixing backends gets messy

**File Storage:**

- **Supabase Storage** (if using Supabase for backend)
- **Cloudinary** (alternative, generous free tier)

**Deployment:**

- **Vercel** - Free for Next.js, instant deployments, preview URLs
- **Supabase** - Hosted automatically

**Authentication:**

- **NextAuth.js** with Google provider (if not using Supabase Auth)
- **Supabase Auth** (simpler, recommended)

### Database Schema (High-Level)

```sql
-- Users
users (
  id, email, name, age, gender,
  profile_pic_url, bio,
  instagram_handle, twitter_handle, phone,
  created_at, updated_at
)

-- Trips
trips (
  id, user_id,
  start_station, end_station,
  travel_date, travel_time,
  is_repeating, repeat_days (array),
  created_at
)

-- Connections
connections (
  id, requester_id, recipient_id,
  status (pending/accepted/rejected),
  created_at, updated_at
)

-- Messages
messages (
  id, connection_id, sender_id,
  content,
  created_at
)

-- Reports
reports (
  id, reporter_id, reported_user_id,
  reason, description,
  status (pending/reviewed),
  created_at
)
```

### Key Technical Decisions

**1. Real-time Chat Implementation:**

- **Recommended:** Supabase Realtime (simplest for MVP)
    - Subscribe to new messages in active chat
    - Automatic updates when other user sends message
    - Fallback to polling every 3s if WebSocket fails
- **Alternative:** Socket.io if need more control (adds complexity)

**2. Metro Station Data:**

- Hardcoded list of Delhi Metro stations (all lines, ~250+ stations)
- Store as JSON file or seed in database
- Autocomplete search in dropdown (use `react-select` or `shadcn/ui Combobox`)

**3. Matching Logic:**

- Algorithm for "±5 stations":
    - Each metro line has ordered stations
    - Calculate station index difference
    - If within 5, it's a match
    - Needs station sequence data (get from official Delhi Metro map)

**4. Image Uploads:**

- Client-side resize before upload (use `browser-image-compression`)
- Limit: 2MB, formats: jpg/png
- Generate thumbnails for list views (150x150)

**5. Performance:**

- Index database columns: `user_id`, `travel_date`, `travel_time`, `start_station`, `end_station`
- Pagination for search results (20 per page)
- Lazy load chat messages (last 50, load more on scroll up)

**6. Security:**

- All API routes check authentication
- Row Level Security in Supabase (users can only edit their own data)
- Sanitize user input (bio, messages) to prevent XSS
- Rate limiting on search/connection requests (prevent spam)

### Mobile-First Considerations

- Design for 375px width first (iPhone SE size)
- Touch-friendly tap targets (min 44px)
- Bottom navigation for main tabs (easier thumb reach)
- Swipe gestures for chat (swipe back to close)
- Optimize images (WebP format, lazy loading)
- PWA capabilities (add to home screen, offline message)

---

## Success Metrics

### Primary Metrics (What Success Looks Like)

**User Acquisition:**

- 100 signups in first month (MVP launch)
- 20% conversion from landing page visit to signup

**Engagement:**

- 50% of users add at least one trip within first session
- 30% of users search for companions within first week
- 20% of users send at least one connection request

**Core Value Delivery:**

- 15% connection request acceptance rate (shows real interest)
- Average 3 messages per connection (shows actual conversation)
- 10 daily active users searching/posting trips (critical mass)

**Retention:**

- 30% week-1 retention (users return within 7 days)
- 5 users with repeating trips (shows habit formation)

### Secondary Metrics

- Average time on platform per session: 5+ minutes
- Search-to-connection ratio: 1:5 (1 connection for every 5 searches)
- Zero critical safety incidents (harassment leading to police reports)
- <5% report rate (shows community is safe)

### Failure Indicators (Red Flags)

- <50 signups in first month → Poor product-market fit
- 0% connection acceptance rate → Safety concerns or bad UX
- 20% report rate → Platform being misused
- Zero repeating users → No habit formation, one-time use only

---

## Open Questions & Risks

**Open Questions:**

1. **Legal compliance:** Do we need user consent for data sharing? Any Delhi Metro terms we're violating?
2. **Station data accuracy:** Where to source official station list with correct sequence?
3. **Moderation capacity:** Who reviews reports? How fast can we respond?
4. **Gender verification:** How to prevent misuse of gender filters? (e.g., men selecting "Female" to match with women)

**Risks:**

1. **Cold start problem:** No users = no matches = no value → Mitigation: Launch in one popular route first (e.g., Noida-Connaught Place), seed with beta testers
2. **Safety incidents:** One bad incident can kill the platform → Mitigation: Strong reporting, fast response, clear safety guidelines, optional verification badge in v2
3. **Misuse for dating/hookups:** Platform becomes Tinder for metro → Mitigation: Clear messaging "companion finding, not dating", report options, community guidelines
4. **Technical:** Real-time chat at scale can be expensive → Mitigation: Start with Supabase free tier, optimize if usage grows

---

## Next Steps After PRD Approval

1. **Design Document:** Create detailed UI/UX design with component structure, color scheme, mobile layouts
2. **Database Schema:** Finalize tables, relationships, indexes
3. **API Contract:** Define all API endpoints with request/response formats
4. **MVP Development Plan:** Break down into phases with daily checkpoints
5. **Testing Plan:** Define manual test cases for each flow

---

**PRD Version:** 1.0

**Last Updated:** February 15, 2026

**Stakeholders:** Product (You), Development (You)

**Approval Needed Before:** Design phase begins

---

Ready to move to **Design Document** phase? Or any changes to the PRD first? 🚇