# F1 Dashboard

A responsive web app for the current F1 grid: every driver and team, with search, filters, and detail pages. Built with Vite, React and TypeScript.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:5173
npm test         # run the test suite
npm run build    # type-check and build for production
```

## Updating the roster

The grid is bundled in two files, and you update them by hand when drivers or teams change.

1. **Teams:** edit `src/data/teams.ts`. Each team's `id` is its Jolpica `constructorId`, for example `red_bull`.
2. **Drivers:** edit `src/data/drivers.ts`. Each driver's `id` is its Jolpica `driverId`, for example `max_verstappen`. Set `teamId` to a team `id` from step 1.
3. **Check the ids:** list a team's drivers at `https://api.jolpi.ca/ergast/f1/2026/constructors/<constructorId>/drivers.json` and compare the `driverId` values.
4. **Update the counts:** `src/data/roster.test.ts` expects 22 drivers and 11 teams. If the grid changes size, update those numbers.
5. **Run `npm test`.** `integrity.test.ts` fails if a driver points at a team that doesn't exist, or if an id is malformed.

Optional fields: `photo` on a driver and `logo` on a team. When one is missing or fails to load, the shared `FallbackImage` component shows a placeholder with the label it's given.

Driver photos are the `headshot_url` values from OpenF1 (`https://api.openf1.org/v1/drivers?session_key=latest`), matched by driver number. The images are hosted by Formula 1, so check the terms before using them outside this personal project. Arvid Lindblad has no photo in OpenF1 yet, so he shows the placeholder.
