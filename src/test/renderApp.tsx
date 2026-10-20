import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AppRoutes } from '../AppRoutes'

/** Renders the real route table at `path`, with a fresh query cache. */
export function renderApp(path: string) {
  const client = new QueryClient()

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

export type Reply = { body: unknown; status?: number } | 'pending' | 'network-error'

/** Replies to the wins and standings requests. Other URLs fail the test. */
export function mockApi(wins: Reply, standings: Reply) {
  const fetchMock = vi.fn(async (url: string) => {
    const reply = url.includes('/results/1.json') ? wins : standings

    if (reply === 'pending') {
      return new Promise<Response>(() => {})
    }
    if (reply === 'network-error') {
      throw new TypeError('Failed to fetch')
    }
    if (!url.includes('/results/1.json') && !url.includes('/driverstandings.json')) {
      throw new Error(`Unexpected request: ${url}`)
    }

    return new Response(JSON.stringify(reply.body), { status: reply.status ?? 200 })
  })

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}
