import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import standingsFixture from './fixtures/current-driverstandings.json'
import winsFixture from './fixtures/verstappen-wins.json'
import { currentStandingsQuery, driverWinsQuery } from './queries'

function stubFetch(body: unknown, status = 200) {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify(body), { status }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function makeWrapper(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('driverWinsQuery', () => {
  it('uses a long stale time and limited retries', () => {
    const options = driverWinsQuery('max_verstappen')

    expect(options.staleTime).toBe(6 * 60 * 60 * 1000)
    expect(options.retry).toBe(2)
  })

  it('does not refetch when a cached driver page is revisited', async () => {
    const fetchMock = stubFetch(winsFixture)
    const client = new QueryClient()
    const wrapper = makeWrapper(client)

    const first = renderHook(() => useQuery(driverWinsQuery('max_verstappen')), { wrapper })
    await waitFor(() => expect(first.result.current.isSuccess).toBe(true))
    first.unmount()

    const second = renderHook(() => useQuery(driverWinsQuery('max_verstappen')), { wrapper })

    expect(second.result.current.data).toBe(73)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('exposes an error state when the request fails', async () => {
    stubFetch({}, 503)
    const client = new QueryClient()
    // Retries are turned off here so the test does not wait out the backoff delays.
    const options = { ...driverWinsQuery('max_verstappen'), retry: false }

    const { result } = renderHook(() => useQuery(options), { wrapper: makeWrapper(client) })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})

describe('currentStandingsQuery', () => {
  it('fetches the standings once for every driver that reads them', async () => {
    const fetchMock = stubFetch(standingsFixture)
    const client = new QueryClient()
    const wrapper = makeWrapper(client)

    const leader = renderHook(
      () => useQuery({ ...currentStandingsQuery, select: (s) => s['antonelli'] }),
      { wrapper },
    )
    await waitFor(() => expect(leader.result.current.isSuccess).toBe(true))

    const second = renderHook(
      () => useQuery({ ...currentStandingsQuery, select: (s) => s['russell'] }),
      { wrapper },
    )
    await waitFor(() => expect(second.result.current.isSuccess).toBe(true))

    expect(leader.result.current.data).toEqual({ position: 1, points: 340 })
    expect(second.result.current.data).toEqual({ position: 2, points: 238 })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
