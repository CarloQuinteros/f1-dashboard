import { queryOptions } from '@tanstack/react-query'
import { getCurrentStandings, getDriverWins } from './jolpica'

// Wins and standings change at most once per race weekend, so cached data stays fresh for hours.
const LIVE_STATS_STALE_TIME = 6 * 60 * 60 * 1000
const MAX_RETRIES = 2

export function driverWinsQuery(driverId: string) {
  return queryOptions({
    queryKey: ['driver-wins', driverId],
    queryFn: ({ signal }) => getDriverWins(driverId, signal),
    staleTime: LIVE_STATS_STALE_TIME,
    retry: MAX_RETRIES,
  })
}

// One shared query for every driver. Pick a driver with `select` in the component.
export const currentStandingsQuery = queryOptions({
  queryKey: ['current-standings'],
  queryFn: ({ signal }) => getCurrentStandings(signal),
  staleTime: LIVE_STATS_STALE_TIME,
  retry: MAX_RETRIES,
})
