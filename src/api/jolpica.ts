const BASE_URL = 'https://api.jolpi.ca/ergast/f1'

interface WinsResponse {
  MRData: { total: string }
}

interface StandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: {
        DriverStandings: {
          position: string
          points: string
          Driver: { driverId: string }
        }[]
      }[]
    }
  }
}

export interface DriverStanding {
  position: number
  points: number
}

export async function fetchJolpica<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Jolpica request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

/** Career race wins, from the `total` of a driver's first-place results. */
export async function getDriverWins(driverId: string, signal?: AbortSignal): Promise<number> {
  const data = await fetchJolpica<WinsResponse>(`/drivers/${driverId}/results/1.json?limit=1`, signal)
  const wins = Number(data.MRData.total)

  if (!Number.isInteger(wins)) {
    throw new Error(`Unexpected win total for ${driverId}: ${data.MRData.total}`)
  }

  return wins
}

/** Current-season standings for every driver, keyed by driverId. */
export async function getCurrentStandings(signal?: AbortSignal): Promise<Record<string, DriverStanding>> {
  const data = await fetchJolpica<StandingsResponse>('/current/driverstandings.json', signal)
  const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []

  return Object.fromEntries(
    standings.map((s) => [s.Driver.driverId, { position: Number(s.position), points: Number(s.points) }]),
  )
}

/** Current-season standing, or null when the driver is not in the standings. */
export async function getDriverStanding(
  driverId: string,
  signal?: AbortSignal,
): Promise<DriverStanding | null> {
  const standings = await getCurrentStandings(signal)

  return standings[driverId] ?? null
}
