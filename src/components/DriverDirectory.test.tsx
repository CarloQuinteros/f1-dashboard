import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DriverDirectory } from './DriverDirectory'

function renderDirectory() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<DriverDirectory />} />
        <Route path="/drivers/:driverId" element={<p>driver profile page</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

const cards = () => within(screen.getByRole('list')).getAllByRole('listitem')
const searchBox = () => screen.getByRole('searchbox', { name: 'Search drivers' })
const teamFilter = () => screen.getByRole('combobox', { name: 'Filter by team' })

describe('DriverDirectory', () => {
  it('renders a card for each of the 22 drivers in a responsive grid', () => {
    renderDirectory()

    expect(cards()).toHaveLength(22)
    expect(screen.getByRole('list')).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
  })

  it('filters by search text as the user types', () => {
    renderDirectory()

    fireEvent.change(searchBox(), { target: { value: 'verst' } })

    expect(cards()).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Max Verstappen' })).toBeInTheDocument()
  })

  it('filters by team', () => {
    renderDirectory()

    fireEvent.change(teamFilter(), { target: { value: 'ferrari' } })

    expect(cards()).toHaveLength(2)
  })

  it('combines search and team filter', () => {
    renderDirectory()

    fireEvent.change(teamFilter(), { target: { value: 'ferrari' } })
    fireEvent.change(searchBox(), { target: { value: 'lawson' } })

    expect(screen.getByRole('status')).toHaveTextContent('No drivers found.')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('shows the empty state when nothing matches', () => {
    renderDirectory()

    fireEvent.change(searchBox(), { target: { value: 'zzz' } })

    expect(screen.getByRole('status')).toHaveTextContent('No drivers found.')
  })

  it('shows every driver again when the search and team are cleared', () => {
    renderDirectory()

    fireEvent.change(teamFilter(), { target: { value: 'ferrari' } })
    fireEvent.change(searchBox(), { target: { value: 'zzz' } })
    fireEvent.change(searchBox(), { target: { value: '' } })
    fireEvent.change(teamFilter(), { target: { value: '' } })

    expect(cards()).toHaveLength(22)
  })

  it('opens the driver page when a card is clicked', () => {
    renderDirectory()

    fireEvent.click(screen.getByRole('link', { name: /Max Verstappen/ }))

    expect(screen.getByText('driver profile page')).toBeInTheDocument()
  })
})
