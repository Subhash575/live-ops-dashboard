# DESIGN_SYSTEM.md

# Instant Mechanic --- Precision Ops Design System

## 1. Purpose

This document is the visual source of truth for the `live-ops-dashboard`
frontend.

The product is a high-stakes live operations dashboard for Instant
Mechanic.

Brand personality:

-   Utilitarian
-   Reliable
-   Alert
-   Corporate Modern
-   Information-dense
-   Precise

The UI must support quick operational decisions without unnecessary
decoration.

------------------------------------------------------------------------

# 2. Design Principles

## 2.1 Information First

Prioritize operational information over decorative elements.

## 2.2 Consistency First

Shared UI should look identical across Dashboard, Bookings, Booking
Detail, Mechanics, Mechanic Detail, and Customers.

## 2.3 Status Has Meaning

Color should communicate operational state, not decoration.

## 2.4 Tonal Depth

Prefer tonal surfaces and subtle outlines over heavy shadows.

## 2.5 Density Without Clutter

Use compact spacing while maintaining readable hierarchy.

------------------------------------------------------------------------

# 3. Color Tokens

The supplied design tokens are the foundation.

## Surface

``` text
surface                  #f8f9ff
surface-dim              #cbdbf5
surface-bright           #f8f9ff
surface-container-lowest #ffffff
surface-container-low    #eff4ff
surface-container        #e5eeff
surface-container-high   #dce9ff
surface-container-highest#d3e4fe
```

## Text

``` text
on-surface         #0b1c30
on-surface-variant #434655
inverse-surface    #213145
inverse-on-surface #eaf1ff
```

## Brand / Primary

``` text
surface-tint       #0053db
primary            #004ac6
primary-container  #2563eb
on-primary         #ffffff
on-primary-container #eeefff
inverse-primary    #b4c5ff
```

## Secondary

``` text
secondary                  #565e74
on-secondary               #ffffff
secondary-container        #dae2fd
on-secondary-container    #5c647a
secondary-fixed            #dae2fd
secondary-fixed-dim        #bec6e0
on-secondary-fixed         #131b2e
on-secondary-fixed-variant #3f465c
```

## Tertiary

``` text
tertiary                  #943700
on-tertiary               #ffffff
tertiary-container        #bc4800
on-tertiary-container     #ffede6
tertiary-fixed             #ffdbcd
tertiary-fixed-dim         #ffb596
on-tertiary-fixed          #360f00
on-tertiary-fixed-variant  #7d2d00
```

## Error

``` text
error            #ba1a1a
on-error         #ffffff
error-container  #ffdad6
on-error-container #93000a
```

## Outline

``` text
outline         #737686
outline-variant #c3c6d7
```

------------------------------------------------------------------------

# 4. Brand Usage

The product-level visual guidance additionally identifies:

``` text
Deep Navy: #0F172A
Vibrant Blue: #2563EB
```

Use these only where consistent with the supplied screen references and
token system.

### Blue

Reserved primarily for: - primary actions - active navigation - selected
controls - important interactive states - primary chart line

Do not turn every element blue.

### Green

Reserved for: - completed services - healthy vehicle/mechanic states
where applicable - successful operational conditions

### Amber

Reserved for: - pending work - approaching deadlines - lower-priority
warnings

### Red

Reserved for: - cancelled states - critical failures - missed SLA/error
conditions

------------------------------------------------------------------------

# 5. Typography

Font family:

``` text
Geist
```

## Display

``` text
32px
600
40px line-height
-0.02em
```

Use for major dashboard-level headings when appropriate.

## Headline Large

``` text
24px
600
32px line-height
-0.01em
```

Use for major section/page headings.

## Headline Medium

``` text
20px
600
28px line-height
```

## Title Large

``` text
18px
500
24px line-height
```

## Body Large

``` text
16px
400
24px line-height
```

## Body Medium

``` text
14px
400
20px line-height
```

## Label Medium

``` text
12px
500
16px line-height
0.02em
```

## Label Small

``` text
11px
600
16px line-height
```

## Mobile Headline

``` text
20px
600
28px line-height
```

------------------------------------------------------------------------

# 6. Typography Rules

Use 400 for: - descriptions - secondary information - supporting
metadata

Use 500 for: - labels - control text - moderate emphasis

Use 600 for: - headings - important values - critical data

Do not use excessive bold text.

------------------------------------------------------------------------

# 7. Numerical Data

Dashboard numbers and live metrics should use tabular numbers.

Use:

``` css
font-variant-numeric: tabular-nums;
```

This prevents changing digit widths from causing visual movement.

Use tabular numbers for: - booking counts - revenue - job counts -
dates/times where useful - pagination counts - operational counters

------------------------------------------------------------------------

# 8. Spacing

Base unit:

``` text
4px
```

Tokens:

``` text
xs   4px
sm   8px
md   16px
lg   24px
xl   32px
```

Container:

``` text
max-width: 1440px
gutter: 16px
```

Primary KPI cards:

``` text
gap: 16px
```

Desktop page margins:

``` text
24px
```

Mobile page margins:

``` text
16px
```

Avoid arbitrary spacing values unless a screen-specific visual
requirement clearly demands them.

------------------------------------------------------------------------

# 9. Grid

Desktop:

``` text
12-column fluid grid
```

Sidebar:

``` text
240px fixed
```

Tablet:

``` text
8-column grid
```

Mobile:

``` text
1-column stack
```

The grid must remain predictable across pages.

------------------------------------------------------------------------

# 10. Radius

``` text
sm      4px
default 8px
md      12px
lg      16px
xl      24px
full    9999px
```

Usage:

``` text
Buttons/input/small components → 8px
Dashboard cards/containers     → 12px
Status badges                  → 9999px
```

Do not mix random corner radii.

------------------------------------------------------------------------

# 11. Elevation

The design system prefers tonal layering and subtle outlines.

## Level 0

Application background:

``` text
#f8f9ff
```

## Level 1

Cards:

``` text
background: white
border: 1px solid #E2E8F0
shadow: 0 2px 4px rgba(0,0,0,0.05)
```

Use sparingly.

## Level 2

Popovers/tooltips:

``` text
shadow: 0 10px 15px rgba(0,0,0,0.1)
```

Do not use large shadows for ordinary cards.

------------------------------------------------------------------------

# 12. Sidebar

The sidebar is global.

Desktop:

``` text
width: 240px
```

It must be implemented once in:

``` text
components/layout/Sidebar.jsx
```

The sidebar must preserve: - approved logo sizing - approved navigation
spacing - approved active state - approved icon treatment - approved
typography - approved width

Individual pages must never recreate it.

Tablet: - collapse to icon-focused navigation

Mobile: - use the approved mobile navigation/hamburger pattern

Do not invent additional navigation items.

------------------------------------------------------------------------

# 13. Header

The header is global.

Implement once:

``` text
components/layout/Header.jsx
```

Every page uses the same header.

Do not create: - a Dashboard-specific header - a Booking-specific
header - a Mechanic-specific header

unless the approved screen explicitly requires page content beneath the
shared header.

Page title/content belongs to the page content area, not a duplicate
global header.

------------------------------------------------------------------------

# 14. Application Shell

Use:

``` text
AppLayout
├── Sidebar
├── Header
└── PageContent
```

This structure must be shared across all routes.

------------------------------------------------------------------------

# 15. Buttons

## Primary

``` text
background: #2563EB
text: white
radius: 8px
```

Use for primary actions.

## Secondary

``` text
background: white
border: 1px solid #E2E8F0
text: navy
radius: 8px
```

## Tertiary

Ghost/text-only.

No unnecessary background.

### Button rule

Do not add actions simply because a dashboard commonly has them.

A button must correspond to: - an approved UI element - or a
backend-supported workflow

------------------------------------------------------------------------

# 16. Inputs

Default:

``` text
border: 1px solid #E2E8F0
radius: 8px
```

Focus:

``` text
border: 2px solid #2563EB
```

Inputs should remain visually quiet until focused.

------------------------------------------------------------------------

# 17. Tables

Tables are high-density operational components.

Rules:

-   no vertical borders
-   subtle horizontal row dividers
-   clear header hierarchy
-   compact but readable row height
-   label styling for column headers
-   tabular numbers for numerical columns
-   consistent status badges

Optional: - extremely light zebra striping for very dense data

Do not introduce heavy boxed tables.

------------------------------------------------------------------------

# 18. Status Badges

Status badges are pills.

``` text
border-radius: 9999px
```

## Booking

``` text
PENDING     → warning/amber treatment
ASSIGNED    → blue treatment
ON_THE_WAY  → blue/in-progress treatment
COMPLETED   → green treatment
CANCELLED   → red treatment
```

## Mechanic

``` text
AVAILABLE → success/green treatment
BUSY      → blue/in-progress treatment
OFFLINE   → neutral/error treatment according to approved screen
```

Badge colors must remain semantically consistent throughout the
application.

------------------------------------------------------------------------

# 19. KPI Cards

A KPI card contains:

``` text
top label
central value
bottom trend/context
```

Example structure:

``` text
LABEL
Large Number
Trend / supporting context
```

Use: - `label-sm` for KPI labels - `headline-lg`-scale emphasis for
values - semantic coloring for trends/status

Cards should not become visually decorative.

------------------------------------------------------------------------

# 20. Charts

Use Recharts.

Time-series line:

``` text
2px stroke
```

Main line:

``` text
primary blue
```

Grid:

``` text
soft grey
```

Area fills:

``` text
maximum 10% opacity
```

Charts should emphasize: - readability - operational trends -
comparison - accurate backend data

Avoid: - 3D charts - gradients with strong visual weight - excessive
colors - decorative chart effects

------------------------------------------------------------------------

# 21. Dashboard

The dashboard is a live operations view.

Backend-supported overview metrics:

``` text
Total Bookings
Today's Bookings
Completed Bookings
Pending Bookings
Cancelled Bookings
Total Revenue
Active Mechanics
New Customers
```

Backend-supported analytics:

``` text
Bookings Over Time
Revenue Over Time
Booking Status
Service Breakdown
```

Do not display metrics that are not supplied by the backend unless they
are simple derived presentation values that can be accurately calculated
from available API data.

------------------------------------------------------------------------

# 22. Booking Screens

## Booking List

The list can use backend-supported:

``` text
search
status filter
pagination
sorting
```

Search covers: - booking ID - vehicle make/model - customer
name/email/phone - mechanic name/phone

The UI should not imply search fields that the backend cannot actually
search.

## Booking Detail

Use:

``` text
GET /bookings/:id
```

Display backend-supported: - booking ID - customer - mechanic -
vehicle - service - category - status - amount - scheduled time -
relevant timestamps

Do not invent unsupported booking actions.

------------------------------------------------------------------------

# 23. Mechanic Screens

Mechanic list supports:

``` text
search
status filter
pagination
sorting
```

Mechanic status:

``` text
AVAILABLE
BUSY
OFFLINE
```

Mechanic detail supports: - mechanic information - current booking -
last booking - jobs completed

Do not invent mechanic assignment/status-update controls.

------------------------------------------------------------------------

# 24. Customer Screen

The current backend supports the customer list.

Display: - name - email - phone - booking count - relevant creation
metadata if present in the approved design

Supported: - search - pagination - sorting

There is no supplied customer detail endpoint.

Therefore do not create customer detail functionality unless the backend
is extended.

------------------------------------------------------------------------

# 25. Responsive Rules

## Desktop

``` text
>= 1280px
```

-   full sidebar
-   12-column layout
-   24px page margin

## Tablet

``` text
768px–1279px
```

-   collapsed sidebar
-   8-column layout

## Mobile

``` text
<768px
```

-   one-column stack
-   mobile navigation
-   16px page margin

Tables may require controlled horizontal overflow rather than destroying
their information hierarchy.

------------------------------------------------------------------------

# 26. Motion

Motion must be subtle.

Use transitions primarily for: - hover - focus - active states -
opening/closing overlays

Do not use: - large entrance animations - distracting chart animations -
excessive page transitions

The product is an operations dashboard; speed and clarity matter more
than spectacle.

------------------------------------------------------------------------

# 27. Forbidden Visual Drift

Do not introduce:

-   glassmorphism
-   random gradients
-   excessive shadows
-   random border colors
-   unrelated accent colors
-   oversized logos
-   changing sidebar widths
-   changing navigation spacing
-   alternate header designs
-   duplicate LIVE badges
-   arbitrary separators
-   decorative dashboard illustrations
-   generic SaaS template styling

If an element is not present in the approved screen and is not required
by functionality, do not add it.

------------------------------------------------------------------------

# 28. Source-of-Truth Hierarchy

When visual decisions conflict:

``` text
Approved Stitch screens
        ↓
DESIGN_SYSTEM.md
        ↓
UI_RULES.md
        ↓
Reusable components
        ↓
Page implementation
```

Global consistency beats page-specific creativity.
