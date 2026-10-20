import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

describe('test toolchain', () => {
  it('renders router and query client together', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/drivers/max_verstappen']}>
          <Routes>
            <Route path="/drivers/:driverId" element={<p>driver page</p>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(screen.getByText('driver page')).toBeInTheDocument()
  })
})
