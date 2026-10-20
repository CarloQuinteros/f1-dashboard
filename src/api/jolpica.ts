const BASE_URL = 'https://api.jolpi.ca/ergast/f1'
const TIMEOUT_MS = 8000

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

/**
 * GET from Jolpica. Aborts when the caller's signal fires or after TIMEOUT_MS,
 * so a stalled request ends in an error the UI can show as unavailable.
 */
export async function fetchJolpica<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  if (signal?.aborted) {
    controller.abort()
  }
  signal?.addEventListener('abort', () => controller.abort(), { once: true })

  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal })

    if (!response.ok) {
      throw new Error(`Jolpica request failed with status ${response.status}`)
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timer)
  }
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
