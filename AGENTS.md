# AGENTS.md

# Instant Mechanic --- Live Ops Dashboard

## 1. Project Mission

Build the `live-ops-dashboard` frontend as a production-style React.js
operations dashboard for Instant Mechanic.

The frontend must:

1.  Match the approved Google Stitch screens as closely as practical.
2.  Preserve visual consistency across all six screens.
3.  Use the supplied `DESIGN_SYSTEM.md` as the visual source of truth.
4.  Use `UI_RULES.md` as the behavioral/layout constraint.
5.  Integrate with the existing backend rather than inventing
    unsupported backend functionality.
6.  Prefer reusable components over page-specific duplicated UI.
7.  Never redesign an approved screen simply because another pattern
    seems more modern.

The application is an operations dashboard, not a generic admin
template.

------------------------------------------------------------------------

## 2. Existing Project

Root directory:

``` text
live-ops-dashboard/
├── backend/
└── frontend/
```

Backend: - Node.js - Express - MongoDB - Mongoose

Frontend: - React.js - JavaScript - Vite - Tailwind CSS v4 - Axios -
React Router - Lucide React - Recharts

Do not convert the frontend to TypeScript unless explicitly requested.

Do not replace React/Vite with Next.js or another framework.

------------------------------------------------------------------------

## 3. Target Frontend Architecture

The frontend currently has no established application architecture
beyond the Vite starter. Build it into:

``` text
frontend/
└── src/
    ├── assets/
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppLayout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Header.jsx
    │   │   └── MobileSidebar.jsx
    │   │
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Select.jsx
    │   │   ├── StatusBadge.jsx
    │   │   ├── DataTable.jsx
    │   │   ├── Pagination.jsx
    │   │   └── LoadingState.jsx
    │   │
    │   └── dashboard/
    │       ├── StatCard.jsx
    │       ├── BookingChart.jsx
    │       ├── RevenueChart.jsx
    │       ├── BookingStatusChart.jsx
    │       └── ServiceBreakdown.jsx
    │
    ├── pages/
    │   ├── Dashboard/
    │   │   └── Dashboard.jsx
    │   │
    │   ├── Bookings/
    │   │   ├── Bookings.jsx
    │   │   └── BookingDetail.jsx
    │   │
    │   ├── Mechanics/
    │   │   ├── Mechanics.jsx
    │   │   └── MechanicDetail.jsx
    │   │
    │   └── Customers/
    │       └── Customers.jsx
    │
    ├── services/
    │   ├── api.js
    │   ├── bookingService.js
    │   ├── customerService.js
    │   ├── mechanicService.js
    │   └── dashboardService.js
    │
    ├── hooks/
    │   └── ...
    │
    ├── utils/
    │   ├── formatters.js
    │   └── constants.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

This structure is a baseline. Add a folder only when there is a real
reusable responsibility for it.

Do not create a large abstraction layer before it is needed.

------------------------------------------------------------------------

## 4. Global Layout

`AppLayout` is the single global shell.

Conceptually:

``` text
AppLayout
├── Sidebar
├── Header
└── PageContent
    ├── Dashboard
    ├── Bookings
    ├── BookingDetail
    ├── Mechanics
    ├── MechanicDetail
    └── Customers
```

### Mandatory rule

The sidebar and header are global layout components.

Pages must NEVER recreate: - the sidebar - the application logo -
primary navigation - the global header - global page shell spacing

Individual pages render only their page-specific content.

------------------------------------------------------------------------

## 5. Routing

Use React Router.

Expected routes:

``` text
/dashboard
/bookings
/bookings/:id
/mechanics
/mechanics/:id
/customers
```

Use `AppLayout` around the application routes.

The detail pages must receive their identifier from the route and
request the corresponding backend resource.

------------------------------------------------------------------------

## 6. Backend Integration

The frontend is a consumer of the existing backend.

Current backend capabilities are read-oriented.

### Booking API

``` text
GET /bookings
GET /bookings/:id
```

Supported booking query parameters:

``` text
search
status
page
limit
sortBy
sortOrder
```

Supported booking statuses:

``` text
PENDING
ASSIGNED
ON_THE_WAY
COMPLETED
CANCELLED
```

Supported booking sorting fields:

``` text
bookingId
status
amount
scheduledAt
createdAt
```

Booking records provide:

``` text
bookingId
customerId
mechanicId
vehicle.make
vehicle.model
vehicle.year
service
category
status
amount
scheduledAt
createdAt
updatedAt
```

The booking list populates customer:

``` text
name
email
phone
```

and mechanic:

``` text
name
phone
status
```

The booking detail also provides mechanic `jobsCompleted`.

------------------------------------------------------------------------

## 7. Customer API

Current backend capability:

``` text
GET /customers
```

Supported query parameters:

``` text
search
page
limit
sortBy
sortOrder
```

Supported sorting fields:

``` text
name
email
phone
createdAt
```

Customer records:

``` text
name
email
phone
createdAt
updatedAt
```

The customer list also receives:

``` text
bookingCount
```

There is currently NO customer detail endpoint in the supplied backend.

Therefore:

-   Do not create a customer detail page requiring an unsupported
    endpoint.
-   Do not invent `/customers/:id`.
-   Do not invent customer edit/delete/create functionality.

------------------------------------------------------------------------

## 8. Mechanic API

Current backend capabilities:

``` text
GET /mechanics
GET /mechanics/:id
```

Supported query parameters:

``` text
search
status
page
limit
sortBy
sortOrder
```

Supported mechanic statuses:

``` text
AVAILABLE
BUSY
OFFLINE
```

Supported sorting fields:

``` text
name
status
jobsCompleted
createdAt
```

Mechanic records:

``` text
name
phone
status
jobsCompleted
currentBookingId
createdAt
updatedAt
```

Mechanic list can receive current booking information:

``` text
bookingId
service
status
scheduledAt
```

Mechanic detail can receive:

``` text
mechanic
currentBooking
lastBooking
```

------------------------------------------------------------------------

## 9. Dashboard API

Current backend capability:

``` text
GET /dashboard
```

The dashboard returns:

``` text
overview
analytics
```

Overview:

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

### Chart data

`bookingsOverTime`:

``` text
date
bookings
```

`revenueOverTime`:

``` text
date
revenue
```

`bookingStatus`:

``` text
status
count
```

`serviceBreakdown`:

``` text
category
service
count
revenue
```

Charts must be driven by these API results.

Do not fabricate dashboard numbers for the production UI.

------------------------------------------------------------------------

## 10. Backend Capability Rule

Before adding a button, control, action, filter, modal, or workflow,
determine whether the backend supports it.

If the backend only supports GET operations, the UI must not pretend
that POST/PATCH/DELETE operations exist.

Do NOT invent: - booking creation - booking editing - booking
cancellation - mechanic assignment - mechanic status updates - customer
editing - customer deletion - customer creation - payment processing -
dispatch actions - authentication flows - notifications - messaging -
live GPS tracking

unless the backend is explicitly extended to support them.

If a Stitch screen visually contains an element that requires
unsupported backend functionality, preserve the approved visual
hierarchy where possible but do not make the unsupported interaction
functional.

------------------------------------------------------------------------

## 11. API Service Layer

Pages should not make raw Axios calls directly.

Use:

``` text
services/api.js
services/bookingService.js
services/customerService.js
services/mechanicService.js
services/dashboardService.js
```

Example responsibility:

``` text
api.js
→ Axios instance/base configuration

bookingService.js
→ getBookings()
→ getBookingById()

customerService.js
→ getCustomers()

mechanicService.js
→ getMechanics()
→ getMechanicById()

dashboardService.js
→ getDashboard()
```

Keep API concerns separate from presentation concerns.

------------------------------------------------------------------------

## 12. State and Data Handling

For the current scope, use React state/hooks unless the application
genuinely needs a larger state-management solution.

Each page should explicitly handle:

``` text
loading
success
empty
error
```

List pages must preserve: - current search - active filters - sorting -
pagination

when those values are represented by the backend API.

Do not create duplicate client-side datasets when the API already
provides the required data.

------------------------------------------------------------------------

## 13. Reusable Components

Create reusable components for repeated patterns.

High-priority reusable components:

``` text
AppLayout
Sidebar
Header
Button
Input
Select
StatusBadge
DataTable
Pagination
LoadingState
StatCard
```

Do not create a new component simply to move one line of JSX.

Create components when: - the pattern repeats - the component has a
clear responsibility - reuse improves consistency - the UI has
meaningful state/behavior

------------------------------------------------------------------------

## 14. Visual Source of Truth

When implementing a screen, follow this priority:

1.  Approved Stitch screen
2.  `DESIGN_SYSTEM.md`
3.  `UI_RULES.md`
4.  Existing reusable components
5.  Backend data contract
6.  General implementation judgment

Do not replace an approved design with a generic dashboard template.

If a visual decision is not specified, choose the smallest change that
preserves consistency with the existing screens.

------------------------------------------------------------------------

## 15. Do Not Regress Existing Screens

When implementing a new screen:

-   Do not change the global sidebar width.
-   Do not change the logo size.
-   Do not change global navigation spacing.
-   Do not redesign the header.
-   Do not introduce a second LIVE badge.
-   Do not introduce a second color system.
-   Do not introduce glassmorphism.
-   Do not add decorative separators without design approval.
-   Do not add Quick Search unless explicitly present in the approved
    design.
-   Do not change the global page background.
-   Do not change global typography.

A page-specific need must not alter a global component unless the change
is intentionally applied to every page.

------------------------------------------------------------------------

## 16. Tailwind CSS

Use Tailwind CSS v4 for styling.

Prefer: - semantic utility combinations - reusable component classes
where appropriate - CSS variables/design tokens for shared values

Do not scatter arbitrary colors throughout JSX.

For example, avoid repeated:

``` text
bg-[#123456]
text-[#abcdef]
```

when a design token can represent the value.

The design system should remain centrally controllable.

------------------------------------------------------------------------

## 17. Icons

Use `lucide-react`.

Do not mix multiple icon libraries.

Icons must: - have consistent sizing - visually match their surrounding
control - not be used as decoration when they communicate no meaning

------------------------------------------------------------------------

## 18. Charts

Use Recharts.

Charts must: - consume backend data - follow the design system - use
restrained styling - maintain readable axes/labels - avoid excessive
visual decoration

Do not create fake chart data merely to make a chart appear populated.

------------------------------------------------------------------------

## 19. Responsive Behavior

Follow the supplied design system:

### Desktop --- 1280px+

-   240px sidebar
-   full 12-column content grid

### Tablet --- 768px--1279px

-   sidebar collapses to icon-focused form
-   8-column layout

### Mobile --- below 768px

-   single-column content
-   sidebar becomes mobile navigation/hamburger behavior

Do not independently invent responsive layouts for each page.

------------------------------------------------------------------------

## 20. Code Quality

Keep components: - readable - focused - composable - predictable

Avoid: - giant page components - duplicated layout markup - duplicated
API logic - inline business logic spread across JSX - hardcoded API
responses - unnecessary dependencies

Before considering a task complete:

1.  Run the linter.
2.  Run the production build.
3.  Fix errors.
4.  Check all affected routes.
5.  Verify that existing pages still use the same global shell.

------------------------------------------------------------------------

## 21. Final Implementation Principle

The goal is not to make the dashboard "look nice."

The goal is:

> Reproduce the approved Instant Mechanic operations UI consistently,
> connect it to the actual backend contract, and prevent individual
> pages from making independent design decisions.

When in doubt, preserve the existing design.
