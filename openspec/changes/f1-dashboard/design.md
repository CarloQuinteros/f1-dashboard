# Design

## Context

Greenfield project: the repository holds only OpenSpec scaffolding, with no app code, no `package.json` and no git repo. See proposal.md for motivation and scope.

Findings from probing the Jolpica F1 API (`https://api.jolpi.ca/ergast/f1`):
- `/current/drivers.json` returned 32 drivers for 2026, not 22. Eight are reserve/test drivers missing number, code, nationality and birth date. It has no team information, so it cannot define "current grid".
- `/drivers/{driverId}/results/1.json` returns a `total`, which is the career race win count (73 for `max_verstappen`). One request per driver; `limit=1` keeps the payload small.
- The response sends `access-control-allow-origin: *`, so browser calls from any origin work and no proxy is needed.
- Rate limits are not documented in the responses seen. The design assumes they exist and keeps request volume low.

## Goals / Non-Goals

**Goals:**
- Static single-page app deployable to Vercel from GitHub, with no server.
- Directory, search and filtering that work instantly and offline of the API.
- Live stats that never block or break the static profile.

**Non-Goals:**
- Server-side rendering, a backend or proxy, user accounts.
- Historical drivers, past seasons, race results, live timing.
- Automating the roster update; the grid is edited by hand in the data files.

## Decisions

**1. Static roster is the source of truth for the grid.**
Drivers and teams live in typed data modules in the repo (22 drivers, 10 teams: ids, names, number, nationality, birth date, team, photo, colors, bios, base, principal). The API is only used for numbers that change per race.
*Alternative:* derive the grid from `/current/drivers` or `/current/driverstandings`. Rejected: it includes reserves, has no team mapping, and would make the whole app depend on the network.

**2. Each static driver carries its Jolpica `driverId`.**
This is the join key between bundled data and API responses (`max_verstappen`, not display name). Avoids brittle name matching.

**3. Fetch live stats lazily on the driver page, not on the list.**
Career wins use `/drivers/{id}/results/1.json?limit=1` and read `total`. Season standing uses a single `/current/driverstandings.json` request, shared by all drivers through caching. The directory fetches nothing, so opening the home page costs zero API calls and a driver page costs at most two (one of them cached).
*Alternative:* fetch wins for all 22 drivers on the list page (22 requests, worse for rate limits) or bake stats in at build time (no runtime calls, but stale until each rebuild). Lazy fetch with caching is the middle path; build-time baking stays available later if rate limits bite.

**4. TanStack Query for fetching and caching.**
Provides loading and error states, retries, and a long `staleTime` (wins change at most once per race weekend) so revisiting a driver does not refetch. Query failures map to the "unavailable" state required by the specs; static content renders independently of query status.

**5. Routing with React Router.**
Routes: `/` (directory), `/drivers/:driverId`, `/teams/:teamId`, and a catch-all not-found. Unknown ids render the "not found" states from the specs. Team access without opening a driver: a teams list or nav entry on the home page.

**6. Search and filter are pure client-side functions over the bundled list.**
A single function takes the roster, search text and team filter and returns the visible drivers (case-insensitive name match, AND-combined with team). Kept separate from components so it is unit-testable with Vitest.

**7. Tailwind CSS, mobile-first.**
One column on phones, 2 on tablets, 4 on desktop via breakpoints. Team colors stored in the data and applied as accent styling. Filters stay in a single bar that wraps on small screens; no separate drawer in the first version.

**8. Vercel deployment as a Vite SPA.**
Vercel auto-detects Vite. A `vercel.json` catch-all rewrite sends every path to `index.html` so direct visits and refreshes on `/drivers/:id` do not 404.

**9. Repository setup is part of the change.**
`git init`, a `.gitignore`, and a first push to GitHub happen as tasks, since Vercel deploys from the GitHub repo.

## Risks / Trade-offs

- **Roster data goes stale when the grid changes** (driver swaps, team renames) → data lives in a small number of typed files with a documented update checklist; the `driverId` check in the API call makes wrong ids obvious as "unavailable" stats.
- **Undocumented API rate limits or downtime** → lazy fetching, caching, a retry limit and the graceful "unavailable" state; build-time baking is the fallback if limits are hit.
- **`results/1` total assumed to equal race wins** (the response did not label it) → verify against a driver with a known count during implementation, and add a test with a fixture response.
- **Photos and logos have licensing and sourcing concerns** → use images the owner has the right to use, with a placeholder fallback when an image is missing or fails to load.
- **Two sources can disagree on names or identity** → the static `driverId` mapping is checked by a test that every roster entry has an id and a valid team.
