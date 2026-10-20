# Proposal

## Why

There is no F1 app yet. The goal is a quick, phone-friendly way to look up every driver on the current grid, find one by name or team, and see their details and career race wins, plus details about each team. Profile data (who drives for whom, photos, team colors) is stable and should be instant and always available, while performance numbers (career wins, season standings) change every race and should come from a live source.

## What Changes

- New responsive web app (phone, tablet, desktop) built as a static single-page app with no backend.
- Driver directory showing all current-grid drivers, with a search bar and filters (at least by team).
- Driver detail page reached by clicking a driver, showing profile info, career race wins and current-season standing.
- Team detail page showing team information and its drivers, linked both ways with the driver pages.
- Hybrid data model: a bundled static dataset defines the current grid (drivers, teams, photos, colors, bios); the Jolpica F1 API supplies career race wins and season standings.
- If the API is unavailable, profiles still render fully and live stats show an unavailable state instead of breaking the page.
- Deployable as a static site from a GitHub repository to Vercel, including deep-link routing for direct URLs.

## Capabilities

### New Capabilities
- `driver-directory`: Listing all current-grid drivers with text search and filters, responsive across screen sizes.
- `driver-profile`: Driver detail page with profile info, career race wins, current-season standing, and graceful handling of live-data failure.
- `team-profile`: Team detail page with team information and its drivers, plus navigation between teams and drivers.

### Modified Capabilities
<!-- None: the project has no existing specs. -->

## Impact

- New application code: the project currently contains only OpenSpec scaffolding, so this introduces the whole app (Vite, React, TypeScript, React Router, TanStack Query, Tailwind CSS, Vitest).
- New bundled data files for the 22 race seats and 10 teams that must be maintained by hand when the grid changes.
- External dependency on the Jolpica F1 API (read-only, client-side). CORS behavior and rate limits are unverified and are addressed in the design.
- New repository setup (git, GitHub) and Vercel deployment configuration.
- Out of scope: reserve/test drivers, historical drivers and seasons, race results, live timing, accounts, and any backend.
