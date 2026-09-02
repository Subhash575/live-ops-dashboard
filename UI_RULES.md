# UI_RULES.md

# Instant Mechanic --- UI Implementation Rules

## 1. Core Rule

The frontend must reproduce the approved Instant Mechanic screens.

OpenCode/AI must behave as an implementation agent, not as a product
designer.

Do not redesign the application while implementing it.

------------------------------------------------------------------------

# 2. The Six Approved Screens

The current approved screen set is:

``` text
1. Dashboard
2. Bookings
3. Booking Detail
4. Mechanics
5. Mechanic Detail
6. Customers
```

These screens are considered one unified product.

They must feel like different pages of the SAME application.

------------------------------------------------------------------------

# 3. Global Components Are Sacred

The following are global:

``` text
AppLayout
Sidebar
Header
```

They must be implemented once.

Never copy their JSX into pages.

Correct:

``` text
AppLayout
├── Sidebar
├── Header
└── Outlet/PageContent
```

Incorrect:

``` text
Dashboard
├── Sidebar
├── Header
└── Content

Bookings
├── Sidebar
├── Header
└── Content
```

The second approach will cause visual drift.

------------------------------------------------------------------------

# 4. Sidebar Lock

The sidebar is locked unless the user explicitly requests a change.

Do not independently change:

-   width
-   logo size
-   logo placement
-   navigation spacing
-   icon size
-   active item styling
-   text size
-   navigation order
-   background
-   border treatment

Do not add navigation items because they are common in admin dashboards.

------------------------------------------------------------------------

# 5. Header Lock

The global header is locked.

Do not create different headers for different pages.

Do not independently add:

-   Quick Search
-   notification systems
-   extra profile controls
-   breadcrumb systems
-   additional status bars
-   page-specific header backgrounds

unless they are part of the approved screen or explicitly requested.

------------------------------------------------------------------------

# 6. Logo Lock

The Instant Mechanic logo must have one global implementation.

Do not use different: - sizes - aspect ratios - margins - icon/text
combinations

on different pages.

Use the same asset/component everywhere.

------------------------------------------------------------------------

# 7. LIVE Badge Lock

If the approved design contains a LIVE indicator:

-   use one shared implementation
-   preserve its size
-   preserve its position
-   preserve its typography
-   preserve its color
-   preserve its shape

Do not recreate a different LIVE badge on another page.

------------------------------------------------------------------------

# 8. No Quick Search

Do not add a global "Quick Search" control unless explicitly requested.

A search input belongs to the page where the backend supports that
search.

Booking search:

``` text
GET /bookings?search=...
```

Mechanic search:

``` text
GET /mechanics?search=...
```

Customer search:

``` text
GET /customers?search=...
```

Do not turn these into an unrelated global search feature.

------------------------------------------------------------------------

# 9. No Invented Components

Do not add UI simply because it is common in: - admin dashboards - SaaS
applications - CRM templates - modern design systems - AI-generated
dashboards

Examples of components that must NOT be invented without approval:

``` text
Quick Search
Notification Center
Activity Feed
Revenue Goal
Team Chat
Calendar Widget
Live GPS Map
Command Palette
AI Assistant
Recent Activity
System Health Panel
```

The backend and approved screens define the actual product scope.

------------------------------------------------------------------------

# 10. Backend-First UI Rule

Every interactive feature must answer:

> Does the current backend support this?

If no:

Do not implement it as a working feature.

------------------------------------------------------------------------

# 11. Current Backend Capability

The supplied backend currently exposes read endpoints.

``` text
GET /bookings
GET /bookings/:id

GET /customers

GET /dashboard

GET /mechanics
GET /mechanics/:id
```

There are currently no supplied: - POST - PUT - PATCH - DELETE

routes for these resources.

Therefore the frontend must not invent CRUD workflows.

------------------------------------------------------------------------

# 12. Booking Rules

Supported:

``` text
List bookings
Search bookings
Filter by booking status
Sort bookings
Paginate bookings
Open booking detail
```

Booking statuses:

``` text
PENDING
ASSIGNED
ON_THE_WAY
COMPLETED
CANCELLED
```

Do not add working UI for:

``` text
Create booking
Edit booking
Assign mechanic
Cancel booking
Change booking status
Complete booking
Delete booking
```

unless corresponding backend routes are added.

------------------------------------------------------------------------

# 13. Customer Rules

Supported:

``` text
List customers
Search customers
Sort customers
Paginate customers
Show booking count
```

Do not add:

``` text
Create customer
Edit customer
Delete customer
Customer detail
```

because no corresponding supplied backend functionality exists.

If the approved customer screen contains a visual affordance that
suggests an unsupported operation, do not make it falsely functional.

------------------------------------------------------------------------

# 14. Mechanic Rules

Supported:

``` text
List mechanics
Search mechanics
Filter by status
Sort mechanics
Paginate mechanics
Open mechanic detail
View current booking
View last booking
View jobs completed
```

Mechanic statuses:

``` text
AVAILABLE
BUSY
OFFLINE
```

Do not add:

``` text
Assign mechanic
Change mechanic status
Edit mechanic
Delete mechanic
Create mechanic
```

without backend support.

------------------------------------------------------------------------

# 15. Dashboard Rules

Dashboard metrics must come from:

``` text
GET /dashboard
```

Do not hardcode production values.

Do not create fake trends.

Do not display a percentage change unless it is actually
supported/calculable from the available data.

Backend dashboard data includes:

``` text
totalBookings
todayBookings
completedBookings
pendingBookings
cancelledBookings
totalRevenue
activeMechanics
newCustomers
```

Analytics:

``` text
bookingsOverTime
revenueOverTime
bookingStatus
serviceBreakdown
```

------------------------------------------------------------------------

# 16. Search Rules

Search is server-backed.

Do not load an entire dataset and implement a different client-only
search when the backend already provides search.

Use debouncing only when useful and without changing the approved UI.

Preserve the user's search value during pagination/filter changes where
appropriate.

------------------------------------------------------------------------

# 17. Filter Rules

Only show filters supported by the backend.

Booking:

``` text
status
```

Mechanic:

``` text
status
```

Customer:

``` text
No status filter is supplied.
```

Do not add unsupported filters such as: - location - date range - price
range - service type

unless backend support is added.

------------------------------------------------------------------------

# 18. Pagination Rules

Backend pagination returns:

``` text
page
limit
total
totalPages
```

The frontend must use these values.

Do not create a fake pagination system based on the current array
length.

------------------------------------------------------------------------

# 19. Sorting Rules

### Bookings

Allowed:

``` text
bookingId
status
amount
scheduledAt
createdAt
```

### Customers

Allowed:

``` text
name
email
phone
createdAt
```

### Mechanics

Allowed:

``` text
name
status
jobsCompleted
createdAt
```

Do not add visible sorting controls for fields that the backend does not
support.

------------------------------------------------------------------------

# 20. Data Formatting

Formatting belongs in:

``` text
utils/formatters.js
```

Examples:

``` text
formatCurrency()
formatDate()
formatDateTime()
formatPhone()
formatStatus()
```

Do not repeat complex formatting logic across pages.

Do not alter raw backend values.

------------------------------------------------------------------------

# 21. Empty States

Every data-driven page must have a clear empty state.

Examples:

``` text
No bookings found
No mechanics found
No customers found
No booking data available
No current booking
No previous booking
```

Empty states must use the same component language as the rest of the
product.

Do not fill empty states with fake records.

------------------------------------------------------------------------

# 22. Loading States

Every API-driven screen must handle loading.

Use a reusable:

``` text
LoadingState.jsx
```

Do not allow a page to appear broken while waiting for the backend.

Avoid excessive skeleton complexity unless the approved screen calls for
it.

------------------------------------------------------------------------

# 23. Error States

API failures must have a clear, restrained error state.

Do not expose: - stack traces - raw server errors - database errors

to the user.

Use the existing backend error structure where available.

------------------------------------------------------------------------

# 24. Status Semantics

Never change the meaning of status colors between pages.

Booking:

``` text
PENDING     → warning
ASSIGNED    → blue
ON_THE_WAY  → blue
COMPLETED   → success
CANCELLED   → error
```

Mechanic:

``` text
AVAILABLE → success
BUSY      → active/in-progress
OFFLINE   → neutral/error according to approved screen
```

------------------------------------------------------------------------

# 25. Color Rule

Never choose a color just because it looks good.

Every color should come from:

``` text
DESIGN_SYSTEM.md
```

or an explicitly approved screen requirement.

Avoid arbitrary:

``` text
bg-red-500
bg-blue-500
text-purple-500
```

when a semantic design token exists.

------------------------------------------------------------------------

# 26. Glassmorphism Prohibition

Do not introduce:

``` text
backdrop-blur
frosted glass cards
large translucent panels
glass navigation
```

The product uses: - tonal layers - white cards - subtle outlines -
restrained shadows

------------------------------------------------------------------------

# 27. Separator Rule

Do not add decorative separators between sections merely to make a page
look more structured.

Tables may use subtle horizontal dividers.

Separators should have a clear structural purpose.

------------------------------------------------------------------------

# 28. Card Rule

Cards use the established system:

``` text
white surface
subtle border
subtle shadow
12px radius for primary cards
```

Do not: - add giant shadows - add gradient backgrounds - use excessive
rounded corners - create floating glass cards

------------------------------------------------------------------------

# 29. Table Rule

Tables must remain operationally dense.

Use:

``` text
horizontal dividers
no vertical borders
clear column labels
consistent row spacing
status badges
```

Do not convert every row into a large card on desktop.

On mobile, controlled horizontal scrolling is acceptable when necessary
to preserve information.

------------------------------------------------------------------------

# 30. Icon Rule

Use:

``` text
lucide-react
```

Only.

Keep icon sizes consistent.

Do not use icons as decoration everywhere.

------------------------------------------------------------------------

# 31. Page Independence Rule

Pages own page content.

Pages do NOT own:

``` text
global navigation
global header
global branding
global shell spacing
```

This prevents the exact problem of: - different logo sizes - different
sidebar widths - different navigation spacing - different header
styles - different LIVE badges

------------------------------------------------------------------------

# 32. Component Reuse Rule

If the same visual pattern appears twice, first check whether a shared
component should own it.

Priority components:

``` text
Button
Input
Select
StatusBadge
DataTable
Pagination
LoadingState
StatCard
```

Do not create visually similar components with slightly different
padding/colors.

------------------------------------------------------------------------

# 33. Page Implementation Pattern

A typical page should conceptually be:

``` text
Page
├── Page heading/content header
├── Controls
├── Data/content section
└── Pagination
```

The global shell is outside the page.

------------------------------------------------------------------------

# 34. Do Not Over-Abstract

Do not create: - generic "UniversalDashboardWidget" - generic
"DynamicEverything" - huge configuration-driven UI systems

unless there is a demonstrated need.

Readable React components are preferred.

------------------------------------------------------------------------

# 35. Visual Comparison Rule

After implementing a screen, compare it against the approved Stitch
reference.

Check:

``` text
Sidebar width
Logo size
Header height
Page margins
Card dimensions
Typography
Spacing
Button sizes
Table density
Badge appearance
Chart proportions
```

If the implementation differs without a functional reason, fix it.

------------------------------------------------------------------------

# 36. Responsive Rule

Do not create completely different designs for mobile, tablet, and
desktop.

Adapt the same visual system.

``` text
Desktop:
full sidebar + 12 columns

Tablet:
collapsed sidebar + 8 columns

Mobile:
mobile navigation + 1 column
```

------------------------------------------------------------------------

# 37. No Backend Assumptions

Never assume that a field exists because another mechanic/dashboard
application normally has it.

Only use fields confirmed by the supplied backend
models/services/controllers.

Confirmed examples:

Booking:

``` text
bookingId
customerId
mechanicId
vehicle
service
category
status
amount
scheduledAt
timestamps
```

Customer:

``` text
name
email
phone
timestamps
```

Mechanic:

``` text
name
phone
status
jobsCompleted
currentBookingId
timestamps
```

------------------------------------------------------------------------

# 38. If a Screen Requires Unsupported Data

Do not invent the data.

Choose one:

1.  Use an existing backend field.
2.  Derive a simple value accurately from available data.
3.  Render an appropriate empty/unavailable state.
4.  Identify that backend support is required before implementing the
    feature.

Never fabricate production data.

------------------------------------------------------------------------

# 39. Change Control

If implementing a feature requires changing: - backend API - model -
route - global layout - design token - shared component

do not silently change it as a side effect.

Make the change explicit.

------------------------------------------------------------------------

# 40. Final Rule

The AI coding agent must follow this principle:

> Do not make independent design decisions when the project already has
> an approved design system, approved screens, reusable global
> components, and a defined backend contract.

Implement what exists. Reuse what exists. Connect what exists. Do not
invent what does not exist.
