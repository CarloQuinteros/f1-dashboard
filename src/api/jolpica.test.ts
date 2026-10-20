import { afterEach, describe, expect, it, vi } from 'vitest'
import standingsFixture from './fixtures/current-driverstandings.json'
// verstappen-wins.json: total 73 matches the Wikipedia infobox (73 race wins as of the
// 2026 Singapore Grand Prix), checked 2026-10-20.
import winsFixture from './fixtures/verstappen-wins.json'
import { getCurrentStandings, getDriverWins } from './jolpica'

function stubFetch(body: unknown, status = 200) {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify(body), { status }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('getDriverWins', () => {
  it('returns the total from the driver results endpoint', async () => {
    const fetchMock = stubFetch(winsFixture)

    await expect(getDriverWins('max_verstappen')).resolves.toBe(73)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.jolpi.ca/ergast/f1/drivers/max_verstappen/results/1.json?limit=1',
      expect.anything(),
    )
  })

  it('throws when the API responds with an error status', async () => {
    stubFetch({}, 503)

    await expect(getDriverWins('max_verstappen')).rejects.toThrow('status 503')
  })

  it('throws when the total is not a whole number', async () => {
    stubFetch({ MRData: { total: 'many' } })

    await expect(getDriverWins('max_verstappen')).rejects.toThrow('Unexpected win total')
  })

  it('gives up on a request that never answers', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
          }),
      ),
    )

    const outcome = expect(getDriverWins('max_verstappen')).rejects.toThrow()
    vi.advanceTimersByTime(8000)

    await outcome
  })
})

describe('getCurrentStandings', () => {
  it('returns position and points for every driver in the standings', async () => {
    stubFetch(standingsFixture)

    const standings = await getCurrentStandings()

    expect(standings['antonelli']).toEqual({ position: 1, points: 340 })
    expect(standings['russell']).toEqual({ position: 2, points: 238 })
  })

  it('leaves out a driver who is not in the standings', async () => {
    stubFetch(standingsFixture)

    const standings = await getCurrentStandings()

    expect(standings['bottas']).toBeUndefined()
  })

  it('returns an empty map before any standings exist', async () => {
    stubFetch({ MRData: { StandingsTable: { StandingsLists: [] } } })

    await expect(getCurrentStandings()).resolves.toEqual({})
  })
})
