# Tasks

## 1. Project setup

- [x] 1.1 Scaffold a Vite + React + TypeScript app in the repo root without disturbing `openspec/` and `.claude/`, and verify `npm run dev` serves a page and `npm run build` succeeds
- [x] 1.2 Add React Router, TanStack Query, Tailwind CSS, Vitest and Testing Library, and verify `npm test` runs an empty or smoke test successfully
- [x] 1.3 Run `git init`, add a `.gitignore` (node_modules, dist, env files), and verify `git status` shows no ignored build output
- [x] 1.4 Add `vercel.json` with a catch-all rewrite to `index.html`, and verify the file is valid JSON and a production preview serves a deep path

## 2. Static data and domain model

- [ ] 2.1 Define TypeScript types for Driver and Team (including the Jolpica `driverId` and team color) and verify `tsc` compiles
- [ ] 2.2 Add bundled data for the 22 race drivers and 10 teams (names, numbers, nationality, birth date, team, colors, bios, base, principal) and verify the count and ids by a unit test
- [ ] 2.3 Add image assets or placeholders for drivers and teams with a fallback for missing images, and verify the fallback renders in a component test
- [ ] 2.4 Add a data integrity test that every driver references an existing team and has a `driverId`, and verify it passes
- [ ] 2.5 Write a short README section on updating the roster when the grid changes, and verify the steps match the data file structure

## 3. Live data client

- [ ] 3.1 Implement an API client for career wins using `/drivers/{id}/results/1.json?limit=1` and reading `total`, and verify with a unit test against a fixture response
- [ ] 3.2 Implement an API client for the current-season standings and a lookup of a driver's position and points, and verify with a unit test against a fixture response
- [ ] 3.3 Wire both through TanStack Query with long stale time, limited retries and an error state, and verify cached revisits do not refetch
- [ ] 3.4 Confirm that `total` equals the known career wins for a driver with a documented count, and note the result in the test fixture comment

## 4. Driver directory

- [ ] 4.1 Implement a pure filter function (case-insensitive name search AND team filter) and verify unit tests for partial match, no match, combined and cleared filters
- [ ] 4.2 Build the driver card and responsive grid (1/2/4 columns) and verify it renders all 22 drivers with no horizontal scroll at phone width
- [ ] 4.3 Build the search bar and team filter with the empty-state message, and verify component tests for typing, filtering and clearing
- [ ] 4.4 Make cards navigate to `/drivers/:driverId`, and verify a click test reaches the profile route

## 5. Driver profile

- [ ] 5.1 Build the profile page with static details and a not-found state for unknown ids, and verify component tests for both
- [ ] 5.2 Add career wins and season standing sections with loading, success and unavailable states, and verify tests for each state including zero wins
- [ ] 5.3 Link the team name to the team page, and verify navigation in a component test

## 6. Team pages

- [ ] 6.1 Build the team page with team info and its driver list linking to profiles, plus a not-found state, and verify component tests
- [ ] 6.2 Add a teams list or navigation entry reachable from the home page, and verify all 10 teams are reachable without opening a driver
- [ ] 6.3 Verify the team page renders fully with the API mocked as failing

## 7. Layout and integration

- [ ] 7.1 Add the app shell (header, navigation, routes, catch-all not-found), and verify routing tests for every route
- [ ] 7.2 Manually check phone, tablet and desktop widths in browser dev tools and verify no horizontal scroll and usable touch targets
- [ ] 7.3 Run `npm run build` and `npm test` together and verify both pass cleanly

## 8. Deployment

- [ ] 8.1 Create the GitHub repository and push, and verify the code is visible on GitHub
- [ ] 8.2 Import the repo into Vercel and deploy, and verify the production URL loads and a direct visit to `/drivers/<id>` does not 404
- [ ] 8.3 Verify on a real phone that the deployed app loads, searches and opens a driver and team page

## Workflow follow-up

- Archive the change after implementation and review are complete.
