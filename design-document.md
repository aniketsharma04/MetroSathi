# Design Document: Metro Connect

## Document Overview

**Product:** Metro Connect

**Version:** 1.0

**Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase + shadcn/ui

**Design Approach:** Mobile-first, clean, trust-focused

**Target Devices:** Mobile (375px-768px primary), Desktop (1024px+ secondary)

---

## 1. Design System

### 1.1 Color Palette

**Primary Colors (Metro Theme - Blue/Orange)**

```
Primary Blue (CTA, Links):     #0066CC (Metro line color inspired)
Primary Blue Hover:            #0052A3
Primary Blue Light:            #E6F2FF (backgrounds, badges)

Accent Orange (Highlights):    #FF6B35 (connection status, important actions)
Accent Orange Hover:           #E55A2B
Accent Orange Light:           #FFE8E0

Metro Purple (Secondary):      #7B3FF2 (premium features future, subtle accents)
Metro Purple Light:            #F3EAFF
```

**Neutral Colors (Interface)**

```
Background Primary:            #FFFFFF (main bg)
Background Secondary:          #F8F9FA (cards, sections)
Background Tertiary:           #F1F3F5 (input fields)

Border Default:                #E0E0E0
Border Hover:                  #BDBDBD
Border Focus:                  #0066CC

Text Primary:                  #1A1A1A (headings, body)
Text Secondary:                #666666 (metadata, labels)
Text Tertiary:                 #999999 (placeholders, disabled)
Text Inverse:                  #FFFFFF (on dark backgrounds)
```

**Semantic Colors**

```
Success Green:                 #10B981 (connection accepted, success messages)
Success Light:                 #D1FAE5

Warning Yellow:                #F59E0B (pending status, cautions)
Warning Light:                 #FEF3C7

Error Red:                     #EF4444 (errors, reports)
Error Light:                   #FEE2E2

Info Blue:                     #3B82F6 (tips, informational)
Info Light:                    #DBEAFE
```

**Gender Badge Colors**

```
Male Badge:                    #3B82F6 (blue)
Female Badge:                  #EC4899 (pink)
Other Badge:                   #8B5CF6 (purple)
All Badge:                     #6B7280 (gray)
```

### 1.2 Typography Scale

**Font Family:**

```css
Primary Font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
Monospace: 'Fira Code', 'Courier New', monospace (for station codes)
```

**Type Scale (Mobile-First):**

```
Display (Hero):
  Mobile: 32px / 38px / -0.02em / font-weight: 700
  Desktop: 48px / 56px / -0.02em / font-weight: 700

H1 (Page Titles):
  Mobile: 24px / 32px / -0.01em / font-weight: 600
  Desktop: 32px / 40px / -0.01em / font-weight: 600

H2 (Section Headers):
  Mobile: 20px / 28px / 0 / font-weight: 600
  Desktop: 24px / 32px / 0 / font-weight: 600

H3 (Card Titles):
  Mobile: 16px / 24px / 0 / font-weight: 600
  Desktop: 18px / 26px / 0 / font-weight: 600

Body Large:
  Mobile: 16px / 24px / 0 / font-weight: 400
  Desktop: 18px / 28px / 0 / font-weight: 400

Body (Default):
  Mobile: 14px / 22px / 0 / font-weight: 400
  Desktop: 16px / 24px / 0 / font-weight: 400

Body Small:
  Mobile: 13px / 20px / 0 / font-weight: 400
  Desktop: 14px / 21px / 0 / font-weight: 400

Caption (Metadata):
  Mobile: 12px / 18px / 0 / font-weight: 400
  Desktop: 13px / 19px / 0 / font-weight: 400

Label (Form Labels):
  Mobile: 14px / 20px / 0 / font-weight: 500
  Desktop: 14px / 20px / 0 / font-weight: 500

Button Text:
  Mobile: 15px / 22px / 0 / font-weight: 500
  Desktop: 16px / 24px / 0 / font-weight: 500
```

### 1.3 Spacing Scale

**Base Unit:** 4px (Tailwind default)

```
xs:   4px   (gap between icon and text)
sm:   8px   (small padding in badges)
md:   12px  (default gap in cards)
base: 16px  (standard padding)
lg:   20px  (section spacing)
xl:   24px  (card padding)
2xl:  32px  (page margins)
3xl:  40px  (section headers)
4xl:  48px  (major sections)
5xl:  64px  (hero sections)
```

**Component-Specific Spacing:**

```
Card Padding (Mobile):    16px
Card Padding (Desktop):   24px
Button Padding:           12px 24px (y, x)
Input Padding:            12px 16px
List Item Gap:            12px
Section Margin Bottom:    32px (mobile) / 48px (desktop)
```

### 1.4 Border Radius Scale

```
xs:   2px   (small badges)
sm:   4px   (input fields, small buttons)
md:   8px   (cards, default buttons)
lg:   12px  (large cards, modals)
xl:   16px  (hero sections)
full: 9999px (circular avatars, pills)
```

### 1.5 Shadows

```
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
      (subtle lift for cards)

md:   0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06)
      (default card shadow)

lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05)
      (elevated cards, modals)

xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04)
      (floating action buttons, dropdowns)

focus: 0 0 0 3px rgba(0, 102, 204, 0.15)
       (focus ring for accessibility)
```

### 1.6 Component Hierarchy

**Atomic Components (Smallest, Reusable):**

- Button (Primary, Secondary, Ghost, Danger)
- Input (Text, Number, Date, Time)
- Badge (Status, Gender, Info)
- Avatar (with fallback initials)
- Icon (using lucide-react)
- Dropdown/Select (station search)
- Checkbox (repeating days)
- Radio Button (trip type)
- Toast Notification
- Loading Spinner
- Empty State Illustration

**Molecular Components (Composed of Atoms):**

- SearchBar (Input + Icon + Button)
- StationPicker (Label + Dropdown + Validation)
- TripCard (Avatar + Text + Badges + Button)
- ConnectionCard (Avatar + Text + Actions)
- ChatMessage (Avatar + Text + Timestamp)
- ProfileHeader (Avatar + Name + Metadata)
- FormField (Label + Input + Error Message)
- FilterBar (Dropdowns + Checkboxes)
- NavigationTab (Icon + Label + Badge)

**Organism Components (Complex, Feature-Specific):**

- TripForm (Multiple FormFields + Submit)
- SearchResults (FilterBar + List of TripCards)
- ChatWindow (ProfileHeader + MessageList + ChatInput)
- ProfileModal (ProfileHeader + Bio + Actions)
- ConnectionsList (Tabs + List of ConnectionCards)
- ReportForm (FormFields + Submit)
- OnboardingFlow (Multi-step wizard)

**Template/Page Components:**

- DashboardPage
- SearchPage
- MyTripsPage
- ConnectionsPage
- ChatPage
- ProfilePage
- OnboardingPage

---

## 2. Component Structure

### 2.1 Atomic Components

### Button Component

```tsx
// Props
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  icon?: ReactNode (optional leading icon)
  fullWidth?: boolean
  children: ReactNode
  onClick: () => void
}

// Variants
Primary:
  bg-[#0066CC] text-white hover:bg-[#0052A3]
  px-6 py-3 rounded-md font-medium
  shadow-sm hover:shadow-md transition-all

Secondary:
  bg-white text-[#0066CC] border-2 border-[#0066CC]
  hover:bg-[#E6F2FF]
  px-6 py-3 rounded-md font-medium

Ghost:
  bg-transparent text-[#666666] hover:bg-[#F8F9FA]
  px-4 py-2 rounded-md

Danger:
  bg-[#EF4444] text-white hover:bg-[#DC2626]
  px-6 py-3 rounded-md font-medium

// Loading State
Shows spinner icon, disables button, text opacity 50%

// Disabled State
opacity-50 cursor-not-allowed
```

### Avatar Component

```tsx
// Props
type AvatarProps = {
  src?: string (image URL)
  alt: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallbackText: string (initials if no image)
  status?: 'online' | 'offline' (shows green/gray dot)
}

// Sizes
xs: 24px circle
sm: 32px circle
md: 48px circle (default)
lg: 64px circle
xl: 96px circle

// Fallback
Shows first 2 letters of name
Background: gradient based on name hash
Text: white, centered, bold

// Status Indicator
Small dot (8px) at bottom-right
Online: bg-[#10B981] border-2 border-white
Offline: bg-[#999999] border-2 border-white
```

### Badge Component

```tsx
// Props
type BadgeProps = {
  variant: 'gender' | 'status' | 'info'
  value: string
  size: 'sm' | 'md'
}

// Gender Variants
Male: bg-[#DBEAFE] text-[#3B82F6] "Male"
Female: bg-[#FCE7F3] text-[#EC4899] "Female"
Other: bg-[#EDE9FE] text-[#8B5CF6] "Other"

// Status Variants
Pending: bg-[#FEF3C7] text-[#F59E0B] "Pending"
Accepted: bg-[#D1FAE5] text-[#10B981] "Connected"

// Sizes
sm: px-2 py-0.5 text-xs rounded-sm
md: px-3 py-1 text-sm rounded-md
```

### Input Component

```tsx
// Props
type InputProps = {
  type: 'text' | 'number' | 'date' | 'time' | 'email'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  icon?: ReactNode (leading icon)
}

// Base Style
bg-[#F1F3F5] border border-[#E0E0E0]
px-4 py-3 rounded-md
text-[#1A1A1A] placeholder:text-[#999999]
focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/15

// Error State
border-[#EF4444] focus:border-[#EF4444]
Shows error text below in text-[#EF4444] text-sm

// With Icon
Icon positioned absolute left, input pl-10
```

### StationPicker Component (Special Dropdown)

```tsx
// Props
type StationPickerProps = {
  label: string
  value: string (selected station)
  onChange: (station: string) => void
  placeholder: string
  error?: string
  excludeStation?: string (for end station, exclude start)
}

// Features
- Searchable dropdown (type to filter)
- Grouped by metro line (Red, Blue, Yellow, etc.)
- Shows line color dot before station name
- Keyboard navigation (arrow keys, enter)
- Shows "No stations found" if search empty

// Visual
Trigger: Same as Input component
Dropdown:
  max-height: 300px, overflow-y-auto
  bg-white shadow-xl rounded-lg border
  Each option: hover:bg-[#F8F9FA]
  Selected: bg-[#E6F2FF] text-[#0066CC]
```

### 2.2 Molecular Components

### TripCard Component

```tsx
// Props
type TripCardProps = {
  trip: {
    userId: string
    userName: string
    userAge: number
    userGender: 'Male' | 'Female' | 'Other'
    avatarUrl?: string
    startStation: string
    endStation: string
    travelTime: string
    matchQuality: string (e.g., "±2 stations")
  }
  connectionStatus?: 'none' | 'pending' | 'connected'
  onConnect?: () => void
  onClick?: () => void (opens profile modal)
}

// Layout (Mobile)
Card: bg-white rounded-lg border shadow-sm p-4
Flex row:
  Left: Avatar (md size) with online status
  Right: Flex column flex-1
    Row 1: Name + Age + Gender Badge
    Row 2: Route (start → end) with metro icon
    Row 3: Time + Match Quality badge
    Row 4: Action button (Connect/Pending/Message)

// Layout (Desktop)
Same but p-6, larger text, avatar lg size

// Hover State
shadow-md, border-[#0066CC], cursor-pointer

// Action Buttons
none: "Connect" (primary button)
pending: "Pending" (secondary, disabled)
connected: "Message" (primary)
```

### ChatMessage Component

```tsx
// Props
type ChatMessageProps = {
  message: {
    content: string
    senderId: string
    timestamp: Date
  }
  isMine: boolean (sent by current user)
  senderAvatar?: string
  senderName: string
}

// Layout (Other's Message)
Flex row:
  Avatar (xs) + Message bubble
  Bubble: bg-[#F1F3F5] rounded-2xl rounded-tl-sm
         p-3 max-w-[75%]
  Timestamp below bubble (caption, text-[#999999])

// Layout (My Message)
Flex row-reverse:
  Message bubble (no avatar)
  Bubble: bg-[#0066CC] text-white rounded-2xl rounded-tr-sm
         p-3 max-w-[75%]
  Timestamp below bubble (caption, text-[#999999])

// Timestamp Format
"9:30 AM" or "Yesterday 9:30 AM" or "Jan 15, 9:30 AM"
```

### ProfileHeader Component

```tsx
// Props
type ProfileHeaderProps = {
  user: {
    name: string
    age: number
    gender: string
    avatarUrl?: string
    bio?: string
    instagramHandle?: string
    twitterHandle?: string
    isOnline: boolean
  }
  showSocialLinks: boolean (only if connected)
  onReport: () => void
}

// Layout
Flex column items-center:
  Avatar (xl size) with online status
  Name (H2) + Age
  Gender Badge
  Bio text (body small, text-[#666666], max 2 lines)

If showSocialLinks:
  Flex row gap-4:
    Instagram icon + handle (link)
    Twitter icon + handle (link)

Bottom:
  "Report User" link (text-sm text-[#EF4444])

// Spacing
All elements gap-3, entire section p-6
```

### 2.3 Organism Components

### TripForm Component

```tsx
// Props
type TripFormProps = {
  onSubmit: (trip: TripData) => void
  onCancel: () => void
  initialData?: TripData (for editing)
}

// Children Components
- 2x StationPicker (Start, End)
- DatePicker (calendar icon)
- TimePicker (clock icon)
- Radio Group (One-time / Repeating)
- If Repeating: Weekday Checkboxes (M T W T F S S)
- Submit Button + Cancel Button (ghost)

// Layout (Mobile)
Flex column gap-4:
  Label + StationPicker (Start)
  Label + StationPicker (End)
  Flex row gap-2:
    Label + DatePicker (flex-1)
    Label + TimePicker (flex-1)
  Label + Radio Group
  {conditional} Weekday Checkboxes
  Flex row gap-2:
    Cancel (ghost, flex-1)
    Submit (primary, flex-1)

// Validation States
Show errors below each field
Disable submit if invalid

// Weekday Checkboxes Visual
Grid of 7 boxes:
  Each: 40px square, rounded-md, border
  Checked: bg-[#0066CC] text-white
  Unchecked: bg-white text-[#666666]
  Labels: M T W T F S S
```

### SearchResults Component

```tsx
// Props
type SearchResultsProps = {
  results: TripCardProps[]
  isLoading: boolean
  filters: {
    gender: string
  }
  onFilterChange: (filters) => void
}

// Children Components
- FilterBar (sticky at top)
- If Loading: LoadingSpinner
- If Empty: EmptyState
- Else: List of TripCards

// Layout
Container:
  FilterBar (sticky top-0 z-10 bg-white shadow-sm)
  Content area:
    If loading: Center spinner
    If empty: EmptyState with illustration + message
    Else: Grid/Flex column gap-4 of TripCards

// FilterBar
Flex row justify-between items-center p-4:
  Left: "X results found"
  Right: Gender Dropdown

// EmptyState
Flex column items-center gap-4 py-12:
  Illustration (empty metro train, 200px)
  H3: "No travelers found"
  Body: "Try adjusting your filters or search time"
  Button: "Search Again" (secondary)

// Loading State
Full height flex center:
  Spinner (40px) + "Finding travelers..."
```

### ChatWindow Component

```tsx
// Props
type ChatWindowProps = {
  connection: {
    userId: string
    userName: string
    userAvatar?: string
    isOnline: boolean
  }
  messages: Message[]
  onSendMessage: (content: string) => void
  onBack: () => void (mobile only)
}

// Children Components
- ProfileHeader (compact version)
- MessageList (scrollable)
- ChatInput (sticky bottom)

// Layout (Mobile - Full Screen)
Flex column h-screen:
  Header (fixed top):
    Back arrow + Avatar (sm) + Name + Online status
    Height: 64px, bg-white, border-b, shadow-sm

  Messages area (flex-1 overflow-y-auto):
    Padding: p-4
    Flex column gap-2
    Scroll to bottom on new message

  Input area (fixed bottom):
    Flex row gap-2 p-4 bg-white border-t
    Input (flex-1) + Send button

// Layout (Desktop - Modal/Sidebar)
Same but:
  Header shows "Close" X instead of back arrow
  Max width: 600px
  Height: 600px

// ChatInput
Input:
  bg-[#F1F3F5] rounded-full px-4 py-2
  placeholder: "Type a message..."
  No border, focus:ring-2
Send Button:
  Icon only (paper plane), circular
  bg-[#0066CC] text-white
  Disabled if input empty
```

---

## 3. Page Layouts

### 3.1 Global Layout Structure

**Mobile Navigation (Bottom Tab Bar)**

```
Fixed bottom-0, h-64px, bg-white, border-t, shadow-lg
5 tabs equally spaced:
  1. Home (house icon)
  2. Search (magnifying glass icon)
  3. Add Trip (plus circle icon, larger, accent color)
  4. Connections (users icon, with badge if pending)
  5. Profile (user circle icon)

Active state: icon + label color = [#0066CC]
Inactive: color = [#999999]

Each tab:
  Icon (24px) + Label (caption size)
  Vertical stack, centered
```

**Desktop Navigation (Sidebar)**

```
Fixed left-0, w-240px, h-screen, bg-white, border-r
Padding: p-6

Logo + App Name at top
Nav items (vertical list):
  Same icons as mobile
  Icon + Label horizontal
  Hover: bg-[#F8F9FA]
  Active: bg-[#E6F2FF] text-[#0066CC]

Profile section at bottom
```

**Page Container (Mobile)**

```
Padding: px-4 pt-4 pb-20 (bottom padding for nav)
Background: bg-[#F8F9FA]
Min height: calc(100vh - 64px)
```

**Page Container (Desktop)**

```
Margin-left: 240px (sidebar width)
Padding: p-8
Max-width: 1200px
Margin: 0 auto
```

### 3.2 Individual Page Layouts

### Dashboard Page (/)

**Mobile Layout:**

```
Page Title: "Metro Connect" (H1) + Subtitle
Top margin: mt-2

Section 1: Quick Actions (if first visit)
  Card: "How it works"
  3 steps with icons:
    1. Add your trip (calendar icon)
    2. Find companions (search icon)
    3. Connect & chat (message icon)
  Each step: icon + text, horizontal, gap-3
  Card padding: p-4, bg-white, rounded-lg

Section 2: My Upcoming Trips
  Header: "My Trips" + "View All" link
  If empty:
    EmptyState: "No trips yet. Add your first trip!"
    CTA: "Add Trip" button (primary)
  Else:
    Horizontal scroll of TripCards (your own trips)
    Show max 3, rest in "My Trips" page

Section 3: Suggested Companions (future feature, empty in MVP)
  Hidden in MVP

CTAs at bottom:
  Two large buttons (full width, gap-3):
    1. "Add New Trip" (primary)
    2. "Find Companions" (secondary)
```

**Desktop Layout:**

```
Grid: 2 columns (60% / 40%)

Left column:
  Quick Actions card
  My Upcoming Trips (grid 2 cols)

Right column:
  Stats card (future):
    - Trips added
    - Connections made
    - Messages sent
  Recent Activity (future)
```

**Responsive Breakpoints:**

```
Mobile: < 768px (1 column)
Tablet: 768px - 1024px (1.5 column, larger cards)
Desktop: > 1024px (2 column)
```

### Search Page (/search)

**Mobile Layout:**

```
Fixed top section (bg-white, shadow-sm, z-10):
  Page Title: "Find Companions"
  Search Form:
    StationPicker (Start)
    StationPicker (End)
    Flex row gap-2:
      DatePicker (flex-1)
      TimePicker (flex-1)
    Gender Filter (dropdown)
    "Search" button (primary, full width)
  Padding: p-4

Scrollable results section:
  FilterBar (if results exist):
    "X results" + Sort dropdown (future)
  Results:
    If loading: LoadingSpinner centered
    If empty: EmptyState
    If results: List of TripCards (gap-3)
```

**Desktop Layout:**

```
Grid: 2 columns (30% / 70%)

Left column (sticky):
  Search Form (same fields, vertical)
  Filters (gender, time range)
  "Search" button

Right column (scrollable):
  Results area
  Pagination at bottom (if > 20 results)
```

**Empty State Details:**

```
Illustration: Empty metro train (SVG, 240px)
H2: "No travelers found"
Body: "We couldn't find anyone on this route. Try:"
List:
  - Adjusting your time by ±30 minutes
  - Removing gender filter
  - Searching a different route
Button: "Modify Search" (secondary)
```

**Loading State:**

```
3 skeleton TripCards (animated pulse)
Each skeleton:
  Gray rectangles mimicking avatar + text layout
  Shimmer animation
```

### My Trips Page (/trips)

**Mobile Layout:**

```
Header:
  Title: "My Trips"
  "Add Trip" button (icon + text)

Tabs:
  "Upcoming" | "Past" (future)
  Active: border-b-2 border-[#0066CC]

Content:
  If empty:
    EmptyState: "No trips yet. Add your first trip!"
    CTA: "Add Trip" button
  Else:
    List of TripCards (enhanced with Edit/Delete actions)
    Group by date:
      "Today" section
      "Tomorrow" section
      "This Week" section
      "Later" section

Each TripCard:
  Same as search result card
  But shows: Edit icon + Delete icon (top-right)
  If repeating: Shows "Repeats: M W F" badge
```

**Desktop Layout:**

```
Same as mobile but:
  Cards in 2-column grid
  Larger cards with more spacing
```

**Add/Edit Trip Modal:**

```
Overlay: bg-black/50
Modal:
  bg-white, rounded-lg, max-w-md
  Mobile: full screen
  Desktop: centered, 500px width

Header:
  Title: "Add Trip" or "Edit Trip"
  Close X button

Content:
  TripForm component

Footer:
  Cancel + Save buttons
```

### Connections Page (/connections)

**Mobile Layout:**

```
Header:
  Title: "Connections"
  Tabs:
    "Requests" (with badge if pending)
    "My Connections"

Requests Tab:
  If empty:
    EmptyState: "No pending requests"
  Else:
    List of ConnectionCards
    Each card:
      Avatar + Name + Age + Gender
      Route info (compact)
      Actions: "Accept" (primary) + "Decline" (ghost)
      Card: p-4, bg-white, border, rounded-lg

My Connections Tab:
  If empty:
    EmptyState: "No connections yet. Search for companions!"
    CTA: "Find Companions"
  Else:
    List of ConnectionCards
    Each card:
      Avatar + Name + Online status
      Last message preview (truncated)
      Timestamp (e.g., "2h ago")
      Unread badge (if unread messages)
      Click → Opens chat
```

**Desktop Layout:**

```
Grid: 2 columns (40% / 60%)

Left: Connections list (scrollable)
Right:
  If connection selected: ChatWindow
  Else: EmptyState: "Select a connection to chat"
```

**ConnectionCard Visual:**

```
Flex row items-center p-4:
  Avatar (md) with online status
  Flex column flex-1:
    Name + Age (text-md font-medium)
    Route or last message (text-sm text-[#666666])
    Timestamp (caption text-[#999999])
  Right side:
    Unread badge (if any): bg-[#0066CC] text-white px-2 py-0.5 rounded-full
    Or action buttons (Accept/Decline for requests)

Hover: bg-[#F8F9FA]
Active: bg-[#E6F2FF] border-l-4 border-[#0066CC]
```

### Profile Page (/profile)

**Mobile Layout:**

```
Header section (bg-gradient):
  Avatar (xl, centered)
  Edit button (floating, top-right)

Profile Info Card:
  Name (H1)
  Age + Gender badge
  Bio (body, text-[#666666])

Social Links Section (if filled):
  Instagram + Twitter icons with handles
  Links open in new tab

Settings Section:
  List items:
    "Edit Profile" →
    "Privacy Settings" → (future)
    "Help & Support" → (future)
    "Logout" (text-[#EF4444])

Each list item:
  Flex row justify-between
  Icon + Label + Chevron right
  Padding: py-4, border-b
  Hover: bg-[#F8F9FA]
```

**Desktop Layout:**

```
Centered card, max-width: 600px
Same sections but more spacious padding
```

**Edit Profile Modal:**

```
Full-screen (mobile) or centered modal (desktop)

Form fields:
  Avatar upload (click to change)
  Name (input)
  Age (number input)
  Gender (dropdown)
  Bio (textarea, 100 chars, shows count)
  Instagram handle (input, optional)
  Twitter handle (input, optional)
  Phone number (input, optional, with privacy toggle)

Footer:
  Cancel + Save buttons

Privacy toggle:
  "Share phone number with connections"
  Switch component (on/off)
```

### Onboarding Page (/onboarding)

**Layout (Mobile - Multi-step):**

```
Step 1: Welcome
  Logo + App name
  H1: "Welcome to Metro Connect"
  Body: "Find travel companions on Delhi Metro"
  Button: "Sign in with Gmail" (with Google icon)

Step 2: Profile Setup (after Gmail auth)
  Progress bar: 3 steps (Profile, Preferences, Done)

  Step 2a: Basic Info
    Avatar upload (optional, can skip)
    Name (pre-filled, editable)
    Age (required)
    Gender (required)
    "Next" button

  Step 2b: Preferences (optional)
    "Who would you like to connect with?"
    Gender preference checkboxes
    "Skip" or "Next"

  Step 2c: Done
    Checkmark icon
    "All set!"
    "You can now add trips and find companions"
    "Go to Dashboard" button

Navigation:
  Back arrow (steps 2a, 2b)
  Skip link (top-right, steps 2a, 2b)
```

**Desktop Layout:**

```
Centered card (500px width)
Same flow but:
  Larger text
  Side-by-side layout for some fields
  Illustration on left side (optional)
```

---

## 4. User Flow Visual Descriptions

### Flow 1: New User Onboarding (Visual Steps)

**Step 1: Landing Page**

```
Visual:
- Full screen gradient background (#0066CC to #7B3FF2)
- Centered white card (rounded-xl, shadow-2xl)
- Metro Connect logo (custom icon: M + train tracks)
- Headline: "Find Your Metro Travel Buddy"
- Subheadline: "Connect with fellow Delhi Metro travelers"
- Large "Sign in with Gmail" button (white bg, Google icon)
- Footer: "By signing in, you agree to Terms & Privacy"

User Action: Clicks "Sign in with Gmail"

Transition: Button shows loading spinner → Redirects to Google OAuth
```

**Step 2: Google OAuth (External)**

```
Visual: Google's standard OAuth screen
User selects account, grants permissions
Returns to app
```

**Step 3: Profile Setup - Basic Info**

```
Visual:
- Top: Progress indicator (1/3 filled circles)
- Headline: "Let's set up your profile"
- Large circular avatar placeholder with camera icon
  (Dashed border, click to upload)
- Name field (pre-filled from Gmail: "Rahul Sharma")
- Age field (empty, placeholder: "25")
- Gender dropdown (placeholder: "Select gender")
- Bottom: "Next" button (primary, disabled until required fields)

User Action:
1. Clicks avatar → File picker opens → Selects image
   (Visual feedback: Image preview in circle, loading spinner while uploading)
2. Edits name if needed
3. Enters age (keyboard numeric on mobile)
4. Selects gender from dropdown

Validation:
- Age < 18: Shows error "You must be 18+ to use Metro Connect"
- Next button enables only when age + gender filled

User clicks "Next"

Transition: Slide left animation to next screen
```

**Step 4: Profile Setup - Preferences (Optional)**

```
Visual:
- Progress: 2/3 filled
- Headline: "Who would you like to connect with?"
- Subtext: "You can change this later in settings"
- 4 large checkbox cards in grid:

  [Icon: Male symbol]
  Male
  [Checkbox]

  [Icon: Female symbol]
  Female
  [Checkbox]

  [Icon: Diverse symbol]
  Other
  [Checkbox]

  [Icon: All symbol]
  Everyone
  [Checkbox]

- Bottom: "Skip" (ghost) + "Next" (primary)

User Action: Selects preferences (can select multiple)

User clicks "Next" or "Skip"

Transition: Fade to completion screen
```

**Step 5: Completion**

```
Visual:
- Progress: 3/3 filled
- Large checkmark icon (animated scale-in, green)
- Headline: "All set, Rahul!"
- Body: "You can now add trips and find companions"
- Large "Go to Dashboard" button (primary)

User clicks button

Transition: Fade out → Dashboard fades in
```

### Flow 2: Adding a Trip (Visual Steps)

**Step 1: Dashboard - Initial State**

```
Visual:
- Bottom nav visible, "Add Trip" tab in center (larger, accent color)
- User sees "My Trips" section (empty state):
  - Empty metro illustration
  - "No trips yet. Add your first trip!"
  - "Add Trip" button

User Action: Taps "Add Trip" button or center nav tab

Transition: Modal slides up from bottom (mobile) or fades in (desktop)
```

**Step 2: Add Trip Modal - Empty Form**

```
Visual:
- Modal header: "Add Trip" + Close X
- Form fields (all empty):

  [Label: Start Station]
  [Dropdown: "Select start station" with search icon]

  [Label: End Station]
  [Dropdown: "Select end station"]

  [Label: When are you traveling?]
  [Two fields side by side]
    [Date: Today (calendar icon)] [Time: 9:00 AM (clock icon)]

  [Label: Trip Type]
  [Radio: ( ) One-time  ( ) Repeating]

- Bottom: "Cancel" (ghost) + "Add Trip" (primary, disabled)

User Action: Clicks "Start Station" dropdown

Transition: Dropdown expands with animation
```

**Step 3: Station Selection**

```
Visual:
- Dropdown opens (full height on mobile, 300px on desktop)
- Search box at top: "Search stations..."
- Grouped list:

  [Red Line] (with red dot)
  • Rithala
  • Rohini Sector 18-19
  • ...

  [Blue Line] (with blue dot)
  • Noida City Centre
  • Sector 52
  • ...

  (Scrollable list)

User Action:
1. Types "kashmere" in search
   (List filters in real-time, shows only matching stations)
2. Clicks "Kashmere Gate"

Visual Feedback:
- Selected station shows with checkmark
- Dropdown closes
- Field now shows "Kashmere Gate" with metro icon

Transition: Smooth collapse, focus moves to End Station
```

**Step 4: Complete Form**

```
Visual (after filling all fields):
- Start: Kashmere Gate ✓
- End: Dwarka Sector 21 ✓
- Date: Feb 15, 2026 ✓
- Time: 9:30 AM ✓
- Type: (•) Repeating selected

  [Weekday selector appears with slide-down animation]
  Grid of day buttons:
  [M] [T] [W] [T] [F] [S] [S]
  Blue background = selected
  User has selected: M, W, F

- "Add Trip" button now enabled (primary blue)

User Action: Taps "Add Trip"

Visual Feedback:
- Button shows loading spinner
- After 500ms: Success animation (checkmark)
- Modal closes with slide-down

Transition: Dashboard reappears
```

**Step 5: Dashboard - Trip Added**

```
Visual:
- "My Trips" section now shows:

  [Card with border-l accent blue bar]
  📍 Kashmere Gate → Dwarka Sector 21
  🕐 9:30 AM
  🔁 Repeats: Mon, Wed, Fri
  [Edit] [Delete]

- Toast notification at top:
  ✓ "Trip added! Others can now find you."
  (Auto-dismisses after 3s)

User sees their trip is active
```

### Flow 3: Searching for Companions (Visual Steps)

**Step 1: Search Page - Empty**

```
Visual:
- Nav: "Search" tab active (blue)
- Page title: "Find Companions"
- Search form (clean, spacious):

  [Start Station]
  [Kashmere Gate ▼]

  [End Station]
  [Dwarka Sector 21 ▼]

  [When?]
  [Feb 15 📅] [9:30 AM 🕐]

  [Gender Preference]
  [Everyone ▼]

  [Search Button - Full width, primary]

- Below form: Illustration + "Enter your trip details to find companions"

User Action: User has already filled form, clicks "Search"

Transition: Button shows loading, page scrolls to results area
```

**Step 2: Loading State**

```
Visual:
- Search form collapses to sticky header (mobile) or stays in sidebar (desktop)
- Results area shows:

  [Skeleton Card 1: Gray rectangles pulsing]
  [Skeleton Card 2: Gray rectangles pulsing]
  [Skeleton Card 3: Gray rectangles pulsing]

  Center text: "Finding travelers..." (with spinner)

Duration: 1-2 seconds

Transition: Skeletons fade out, real cards fade in
```

**Step 3: Results Displayed**

```
Visual:
- Filter bar at top (sticky):
  "3 travelers found" | [Gender: Everyone ▼]

- List of TripCards:

  [Card 1]
  -----------------------------------
  | [Avatar]  Priya Sharma, 24 👧   |
  |           Laxmi Nagar → Dwarka  |
  |           Sec 21                |
  |           ⏰ 9:15 AM             |
  |           📍 ±2 stations         |
  |           [Connect] button      |
  -----------------------------------

  [Card 2]
  -----------------------------------
  | [Avatar]  Arjun Mehta, 27 👨    |
  |           Shahdara → Dwarka     |
  |           ⏰ 9:30 AM             |
  |           📍 ±4 stations         |
  |           [Connect] button      |
  -----------------------------------

  [Card 3]
  -----------------------------------
  | [Avatar]  Sneha Verma, 22 👧    |
  |           Kashmere Gate →       |
  |           Rajouri Garden        |
  |           ⏰ 9:45 AM             |
  |           📍 ±3 stations         |
  |           [Connect] button      |
  -----------------------------------

User Action: Taps on Card 1 (anywhere except Connect button)

Transition: Profile modal slides up from bottom
```

**Step 4: Profile Modal**

```
Visual:
- Full-screen modal (mobile) or centered (desktop)
- Header: Close X (top-left)
- Content:

  [Large Avatar - 96px circular]

  Priya Sharma, 24
  [Female badge]

  Bio:
  "Love reading books during my commute. Always up for good conversation!"

  Trip Details:
  📍 Laxmi Nagar → Dwarka Sector 21
  ⏰ 9:15 AM, Feb 15
  🔁 Repeats: Mon, Wed, Fri
  📏 ±2 stations from your route

  [Connect Button - Full width, primary]

  (If connected, shows Instagram/Twitter icons with handles)

  Bottom: "Report User" (small, red text)

User Action: Taps "Connect"

Visual Feedback:
- Button changes: "Connect" → Loading spinner → "Pending"
- Button becomes secondary (white bg, blue border, disabled)
- Toast appears: "Connection request sent to Priya"

Transition: Modal stays open, user can close or browse
```

**Step 5: Back to Results**

```
Visual:
- User closes modal (swipe down or X)
- Returns to results list
- Card 1 now shows "Pending" button instead of "Connect"
  (Button is disabled, different color)

User sees updated state, can search again or connect with others
```

### Flow 4: Receiving & Accepting Connection (Visual Steps)

**Step 1: Connection Request Notification**

```
Visual (on Priya's device):
- Bottom nav "Connections" tab shows red badge with "1"
- If app is open: Toast notification
  "Rahul Sharma wants to connect" (with avatar)
  [View] button

User Action: Taps "Connections" tab or toast notification

Transition: Navigates to Connections page
```

**Step 2: Connections Page - Requests Tab**

```
Visual:
- Header: "Connections"
- Tabs: "Requests (1)" | "My Connections"
  (Requests tab active, shows badge count)

- Request card:
  -----------------------------------
  | [Avatar]  Rahul Sharma, 28 👨   |
  |           Kashmere Gate →       |
  |           Dwarka Sector 21      |
  |           ⏰ 9:30 AM             |
  |                                 |
  | [Accept - primary] [Decline -  |
  |                      ghost]    |
  -----------------------------------

User Action: Taps anywhere on card

Transition: Profile modal opens (same as search flow)
```

**Step 3: Viewing Requester Profile**

```
Visual:
- Profile modal shows Rahul's full profile
- Same layout as before
- But actions are different:

  [Accept Connection - primary, full width]
  [Decline - ghost, full width]

User Action: Reviews profile, taps "Accept"

Visual Feedback:
- Accept button shows loading
- Modal closes with success animation
- Returns to Connections page

Transition: Smooth modal dismiss
```

**Step 4: Connection Accepted State**

```
Visual (Connections page):
- "Requests" tab now shows (0) badge (or no badge)
- "My Connections" tab shows (1) badge
- Tab auto-switches to "My Connections"

- Connection card:
  -----------------------------------
  | [Avatar] Rahul Sharma, 28       |
  | 🟢 Online                        |
  |                                 |
  | "You're now connected!"         |
  | (Last message preview)          |
  |                                 |
  | [Message] button                |
  -----------------------------------

- Toast at top:
  ✓ "You're now connected with Rahul!"

User Action: Taps on card or "Message" button

Transition: Chat window opens
```

**Step 5: Both Users See Update**

```
Visual (on Rahul's device):
- Search results: Priya's card changes from "Pending" to "Message"
- Connections tab gets badge (1)
- If on Connections page: See Priya in "My Connections"

Both users can now chat
```

### Flow 5: Chatting (Visual Steps)

**Step 1: Opening Chat**

```
Visual (Mobile):
- From Connections page, user taps on Priya's card
- Screen transition: Slide from right

Chat window appears:
- Header (fixed):
  [← Back] [Avatar-sm] Priya Sharma 🟢 Online [...menu]

- Messages area (empty initially):
  Center: "Start a conversation with Priya"

- Input area (fixed bottom):
  [Text input: "Type a message..."] [Send icon button]

User Action: Taps input field

Visual Feedback:
- Keyboard slides up
- Messages area scrolls to bottom
- Input field gains focus ring (blue)
```

**Step 2: Typing & Sending First Message**

```
Visual:
- User types: "Hi Priya! I saw we're on the same route. Want to meet at Kashmere Gate tomorrow?"

- As user types:
  - Send button changes from gray (disabled) to blue (enabled)
  - Character count appears if >200 chars (max 500)

User Action: Taps Send button

Visual Feedback:
1. Message appears immediately in chat (optimistic UI):

   [My message bubble - right side]
   -----------------------------------
   |  Hi Priya! I saw we're on the  |
   |  same route. Want to meet at   |
   |  Kashmere Gate tomorrow?        |
   -----------------------------------
              9:30 AM

2. Input field clears
3. Send button becomes disabled again
4. Sending indicator briefly shows (if slow network)

Transition: Message animates in (slide + fade)
```

**Step 3: Receiving Reply**

```
Visual (after Priya replies):
- New message appears with subtle bounce animation:

[Her message bubble - left side]
-----------------------------------
[Avatar-xs] Hey Rahul! Sure, what
            time works for you?
-----------------------------------
            9:32 AM

- If user is scrolled up: "New message" indicator at bottom
- Auto-scroll to bottom when at bottom

User Action: Continues conversation

Visual shows alternating bubbles:
- Right side (blue): Rahul's messages
- Left side (gray): Priya's messages
```

**Step 4: Message History View**

```
Visual (scrolling up):
- Messages load in reverse chronological order
- Date separators appear:

  --------- Today ---------
  [Messages from today]

  --------- Yesterday ---------
  [Messages from yesterday]

  --------- Feb 13 ---------
  [Older messages]

- Scroll reaches top: "No more messages"
- Pull-to-refresh (mobile): Checks for older messages
```

**Step 5: Desktop Split View**

```
Visual (Desktop - Connections page):
- Left sidebar: List of connections
  (Priya's card is highlighted/active)

- Right pane: Chat window embedded
  (No back button, shows close X instead)

User can click different connections in sidebar
Chat pane updates without page reload
```

### Flow 6: Reporting a User (Visual Steps)

**Step 1: Opening Report Form**

```
Visual:
- User is viewing someone's profile (let's say suspicious account)
- At bottom of profile modal: "Report User" link (small, red)

User Action: Taps "Report User"

Transition: Report modal slides up (overlay on profile modal)
```

**Step 2: Report Form**

```
Visual:
- Modal header:
  "Report [Name]"
  Close X

- Warning text:
  ⚠️ "Reporting is serious. Please select a reason:"

- Reason dropdown (required):
  [Select reason ▼]

  Dropdown options:
  - Fake or Misleading Profile
  - Harassment or Abusive Behavior
  - Inappropriate Content
  - Spam or Scam
  - Safety Concern
  - Other

- Description textarea (optional):
  "Provide additional details (optional)"
  Placeholder: "What happened?"
  Character limit: 500

- Checkbox:
  ☐ "I understand that false reports may result in my account being suspended"

- Bottom buttons:
  [Cancel - ghost] [Submit Report - danger (red)]

User Action: Selects "Harassment", adds description, checks box

Visual Feedback:
- Submit button disabled until reason selected + checkbox checked
- Description shows char count: "245 / 500"
```

**Step 3: Submitting Report**

```
User Action: Taps "Submit Report"

Visual Feedback:
1. Button shows loading spinner
2. After 1 second: Success state

   [Checkmark icon - green]
   "Report Submitted"
   "We'll review this within 24 hours. Thank you for helping keep Metro Connect safe."

   [Okay - primary button]

3. User taps "Okay"

Transition: Report modal closes → Profile modal closes → Returns to previous screen
```

**Step 4: Confirmation Toast**

```
Visual (back on search/connections page):
- Toast notification at top:
  ✓ "Report submitted. We're reviewing your report."
  (Auto-dismisses after 4 seconds)

- No visual change to reported user (they're not blocked in MVP)
- Backend logs the report for admin review
```

---

## 5. Data Display Patterns

### 5.1 Lists

### Scrollable Lists (Default)

```
Usage: Trip results, connections, messages

Structure:
- Container: Flex column, gap-3
- Items: Cards with hover state
- Spacing: p-4 per card, gap-3 between cards
- Scroll: overflow-y-auto, max-height defined
- Empty state: Center-aligned illustration + text

Mobile:
- Full width cards
- Touch-friendly tap targets (min 48px height)
- Swipe gestures (future: swipe to delete)

Desktop:
- Grid layout (2 columns) for wider items
- Hover effects more pronounced
- Click anywhere on card to open
```

### Horizontal Scroll Lists

```
Usage: "My Trips" preview on dashboard

Structure:
- Container: flex flex-row overflow-x-auto
- Items: min-w-[280px] shrink-0 (fixed width cards)
- Snap: snap-x snap-mandatory
- Hide scrollbar: scrollbar-hide class

Visual:
- Cards slightly peek at right edge (shows "more")
- Scroll indicators (dots) below (mobile only)
- Shadow fade on right edge to indicate more content
```

### Grouped Lists

```
Usage: Trips grouped by date, stations grouped by line

Structure:
- Each group has header (sticky on scroll)
- Header: text-sm font-semibold text-[#999999] uppercase
  bg-[#F8F9FA] px-4 py-2
- Items below header (normal list)

Visual:
[Today]
  - Trip 1
  - Trip 2
[Tomorrow]
  - Trip 3
[This Week]
  - Trip 4
```

### 5.2 Forms

### Form Field Pattern

```
Standard structure for all inputs:

<div class="space-y-2">
  <label class="text-sm font-medium text-[#1A1A1A]">
    Field Label
    {optional && <span class="text-[#999999]">(optional)</span>}
  </label>

  <input
    class="w-full px-4 py-3 bg-[#F1F3F5] border border-[#E0E0E0] rounded-md
           focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/15
           text-[#1A1A1A] placeholder:text-[#999999]"
  />

  {error && (
    <p class="text-sm text-[#EF4444] flex items-center gap-1">
      <AlertCircle size={16} />
      {errorMessage}
    </p>
  )}

  {helperText && (
    <p class="text-sm text-[#666666]">{helperText}</p>
  )}
</div>
```

### Form Validation States

```
Default (untouched):
  border-[#E0E0E0]

Focus (active):
  border-[#0066CC] ring-2 ring-[#0066CC]/15

Error:
  border-[#EF4444] ring-2 ring-[#EF4444]/15
  Shows error message below

Success (valid):
  border-[#10B981]
  Shows checkmark icon in input (right side)

Disabled:
  bg-[#F8F9FA] text-[#999999] cursor-not-allowed
```

### Multi-Step Forms

```
Usage: Onboarding, add trip with conditions

Visual:
- Progress indicator at top:
  Circles connected by lines
  Filled circle = completed step
  Current = blue outline + pulse animation
  Future = gray outline

  (1)---(2)---(3)

- One section visible at a time
- Navigation: "Back" + "Next" / "Submit"
- Can't skip required steps
- Auto-save drafts (future)
```

### 5.3 Feedback Patterns

### Toast Notifications

```
Usage: Success/error messages, confirmations

Position:
  Mobile: Top center, below header
  Desktop: Top right corner

Structure:
  bg-white shadow-lg rounded-lg p-4 border-l-4
  Flex row items-start gap-3
  Icon (left) + Message + Close button (right)

Variants:
Success:
  border-l-[#10B981] text-[#10B981]
  Icon: CheckCircle

Error:
  border-l-[#EF4444] text-[#EF4444]
  Icon: XCircle

Warning:
  border-l-[#F59E0B] text-[#F59E0B]
  Icon: AlertTriangle

Info:
  border-l-[#3B82F6] text-[#3B82F6]
  Icon: Info

Animation:
  Enter: Slide down + fade in (300ms)
  Exit: Slide up + fade out (200ms)
  Auto-dismiss: 4 seconds (unless error, then 6 seconds)

Accessibility:
  role="alert"
  aria-live="polite"
```

### Modals

```
Usage: Add/edit trip, profile view, confirmations

Structure:
  Overlay: fixed inset-0 bg-black/50 backdrop-blur-sm
  Modal: bg-white rounded-lg shadow-2xl

Mobile:
  Full screen: inset-x-0 bottom-0 rounded-t-2xl
  Slide up animation
  Pull-to-dismiss (swipe down)

Desktop:
  Centered: max-w-md mx-auto my-auto
  Fade + scale animation
  Click outside to dismiss

Header:
  p-6 border-b
  Title (H2) + Close X button (top-right)

Content:
  p-6 overflow-y-auto max-h-[60vh]

Footer (if actions):
  p-6 border-t
  Buttons aligned right
  Cancel (ghost) + Primary action

Accessibility:
  Focus trap (Tab cycles within modal)
  Escape key to close
  Focus returns to trigger element on close
```

### Inline Feedback

```
Usage: Form field errors, character counts, validation

Pattern:
  Message appears directly below input
  text-sm, appropriate color
  Icon for visual clarity
  Transition: slide down 200ms

Examples:

Character count:
  "245 / 500 characters"
  text-[#666666] when under limit
  text-[#F59E0B] when approaching (450+)
  text-[#EF4444] when over limit

Validation message:
  ✓ "Username available"
  ✗ "This field is required"
  ⚠ "Password must be at least 8 characters"
```

### Loading States

**Skeleton Loaders:**

```
Usage: Loading lists, cards

Structure:
  Same shape as actual component
  bg-[#E0E0E0] rounded (matches real content)
  Pulse animation (opacity 50% → 100% → 50%)

Example (TripCard skeleton):
  <div class="flex gap-4 p-4 bg-white rounded-lg animate-pulse">
    <div class="w-12 h-12 bg-[#E0E0E0] rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-[#E0E0E0] rounded w-3/4"></div>
      <div class="h-4 bg-[#E0E0E0] rounded w-1/2"></div>
    </div>
  </div>
```

**Spinners:**

```
Usage: Button loading, page loading

Variants:

Small (16px):
  In buttons, inline with text

Medium (32px):
  Section loading

Large (48px):
  Full-page loading

Color: Matches context (blue for primary, white for buttons)

Animation:
  Rotating circle with partial border
  border-4 border-[#E0E0E0] border-t-[#0066CC]
  animate-spin (1s linear infinite)
```

**Progress Indicators:**

```
Usage: Multi-step processes, file uploads

Linear progress bar:
  w-full h-2 bg-[#E0E0E0] rounded-full
  Inner bar: bg-[#0066CC] h-full rounded-full
  Width animated based on percentage

Circular progress:
  SVG circle with stroke-dashoffset animation
  Shows percentage in center
```

### Empty States

```
Usage: No trips, no connections, no search results

Structure:
  Centered flex column
  Illustration (200-240px SVG)
  H3 headline
  Body text (explanation)
  CTA button (if actionable)

Visual style:
  py-12 (vertical padding)
  max-w-sm mx-auto (constrain width)
  text-center
  text-[#666666] for body

Examples:

No trips:
  [Empty calendar illustration]
  "No trips yet"
  "Add your first trip to find travel companions"
  [Add Trip button]

No connections:
  [Empty users illustration]
  "No connections yet"
  "Search for companions on your route to get started"
  [Find Companions button]

No search results:
  [Empty search illustration]
  "No travelers found"
  "Try adjusting your search criteria"
  [Modify Search button]
```

### 5.4 Card Patterns

### Standard Card

```
Base structure:
  bg-white rounded-lg shadow-sm border border-[#E0E0E0]
  p-4 (mobile) / p-6 (desktop)
  hover:shadow-md transition-shadow

Clickable cards:
  cursor-pointer
  hover:border-[#0066CC]
  active:scale-[0.98]
```

### Info Card

```
Usage: Tips, how-to guides, warnings

Structure:
  border-l-4 border-[color]
  bg-[color-light]
  p-4

Variants:
  Info: border-[#3B82F6] bg-[#DBEAFE]
  Warning: border-[#F59E0B] bg-[#FEF3C7]
  Success: border-[#10B981] bg-[#D1FAE5]
  Error: border-[#EF4444] bg-[#FEE2E2]

Content:
  Icon (matching color) + Title + Body text
```

### Stat Card

```
Usage: Dashboard metrics (future)

Structure:
  bg-white rounded-lg p-6 shadow-sm
  Flex column gap-2

Content:
  Label (caption, text-[#999999])
  Value (H1, text-[#1A1A1A])
  Change indicator (+X%, color-coded)
  Optional icon (top-right)
```

---

## 6. Responsive Behavior

### Breakpoints

```
sm:  640px   (large phones)
md:  768px   (tablets)
lg:  1024px  (laptops)
xl:  1280px  (desktops)
2xl: 1536px  (large screens)
```

### Mobile-First Approach

**Default (< 640px):**

- Single column layouts
- Bottom navigation
- Full-width cards
- Modals take full screen
- Larger tap targets (min 44px)
- Simplified headers (hamburger menu if needed)

**Tablet (640px - 1024px):**

- Introduce 2-column grids where appropriate
- Side navigation still bottom (or left sidebar option)
- Modals can be centered (max-width)
- Larger text/spacing

**Desktop (> 1024px):**

- Left sidebar navigation
- Multi-column layouts (2-3 cols)
- Hover states more prominent
- Keyboard shortcuts
- Split views (connections + chat)

### Component Responsive Patterns

**Navigation:**

```
Mobile: Bottom tab bar (fixed)
Desktop: Left sidebar (fixed)

Transition point: md (768px)
```

**Cards:**

```
Mobile:
  Grid 1 column, full width

Tablet:
  Grid 2 columns, gap-4

Desktop:
  Grid 2-3 columns (depending on page), gap-6
```

**Forms:**

```
Mobile:
  All inputs full width, stacked
  Buttons full width

Desktop:
  Related fields side-by-side (date + time)
  Buttons inline, right-aligned
  Max-width form container (600px)
```

**Modals:**

```
Mobile:
  Slide from bottom, full width
  height: auto (content-based) or full-screen

Desktop:
  Centered, fixed width (500px)
  max-height: 80vh
  Can click outside to dismiss
```

**Chat:**

```
Mobile:
  Full-screen view when open
  Back button to return to connections list

Desktop:
  Split view: connections list (40%) + chat (60%)
  No back button, chat embedded in page
```

---

## 7. Accessibility Considerations

### Color Contrast

All text meets WCAG AA standards:

- Primary text on white: 4.5:1 minimum
- Secondary text on white: 4.5:1 minimum
- White text on blue buttons: 4.5:1 minimum

### Focus States

All interactive elements have visible focus rings:

```css
focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2
```

### Keyboard Navigation

- Tab order follows visual order
- All actions keyboard-accessible
- Modals trap focus
- Escape closes modals/dropdowns

### Screen Reader Support

- Semantic HTML (nav, main, section, article)
- ARIA labels where needed
- alt text for images
- aria-live for dynamic content (toasts)
- role="alert" for important messages

### Touch Targets

Minimum 44x44px for all tappable elements on mobile

---

## 8. Performance Optimizations

### Images

- Next.js Image component (automatic optimization)
- WebP format with JPEG fallback
- Lazy loading for below-fold images
- Avatar thumbnails (150x150) for lists

### Code Splitting

- Route-based code splitting (automatic with Next.js App Router)
- Dynamic imports for heavy components (chat, maps future)

### Data Fetching

- Server components where possible (Next.js 14)
- Parallel data fetching for independent queries
- Pagination for long lists (20 items per page)
- Optimistic UI updates (messages, connections)

### Caching

- Station list cached in localStorage
- User profile cached (revalidate on profile page)
- Chat messages cached (last 50)

---

## 9. Design Tokens (Tailwind Config)

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
          light: '#E6F2FF',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E55A2B',
          light: '#FFE8E0',
        },
        metro: {
          purple: '#7B3FF2',
          'purple-light': '#F3EAFF',
        },
        gender: {
          male: '#3B82F6',
          female: '#EC4899',
          other: '#8B5CF6',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
}
```

---

## 10. Next Steps

**After Design Doc Approval:**

1. **Create Component Library** (shadcn/ui + custom components)
    - Set up design tokens in Tailwind
    - Build atomic components first
    - Storybook for component documentation (optional)
2. **Set Up Supabase**
    - Create database schema
    - Configure auth (Gmail OAuth)
    - Set up storage buckets (profile pictures)
    - Enable Realtime for chat
3. **Build Pages Iteratively:**
    - Phase 1: Auth + Profile (2 days)
    - Phase 2: Trip Management (2 days)
    - Phase 3: Search + Connect (3 days)
    - Phase 4: Chat (2 days)
    - Phase 5: Polish + Testing (2 days)
4. **Testing:**
    - Manual testing on real devices (iPhone, Android)
    - Accessibility audit (WAVE, axe DevTools)
    - Performance audit (Lighthouse)

Ready to move to **MVP Development Plan**? Or any changes to the Design Document? 🎨