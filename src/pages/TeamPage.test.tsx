import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockApi, renderApp } from '../test/renderApp'

describe('TeamPage', () => {
  it('shows team info and the current drivers', () => {
    mockApi('pending', 'pending')
    renderApp('/teams/red_bull')

    expect(screen.getByRole('heading', { name: 'Red Bull', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Milton Keynes, UK')).toBeInTheDocument()
    expect(screen.getByText('Laurent Mekies')).toBeInTheDocument()

    const roster = within(screen.getByRole('region', { name: 'Drivers' }))
    expect(roster.getByRole('link', { name: /Max Verstappen/ })).toHaveAttribute('href', '/drivers/max_verstappen')
    expect(roster.getByRole('link', { name: /Isack Hadjar/ })).toHaveAttribute('href', '/drivers/hadjar')
    expect(roster.getAllByRole('link')).toHaveLength(2)
  })

  it('says when the team principal has not been published', () => {
    mockApi('pending', 'pending')
    renderApp('/teams/rb')

    expect(screen.getByText('Not yet published')).toBeInTheDocument()
  })

  it('shows a not-found message for an unknown team', () => {
    mockApi('pending', 'pending')
    renderApp('/teams/nope')

    expect(screen.getByRole('heading', { name: 'Team not found' })).toBeInTheDocument()
  })

  it('opens a driver profile from the roster', () => {
    mockApi('pending', 'pending')
    renderApp('/teams/red_bull')

    fireEvent.click(screen.getByRole('link', { name: /Max Verstappen/ }))

    expect(screen.getByRole('heading', { name: 'Max Verstappen', level: 1 })).toBeInTheDocument()
  })

  it('renders fully when the API is down', () => {
    mockApi('network-error', 'network-error')
    renderApp('/teams/red_bull')

    expect(screen.getByRole('heading', { name: 'Red Bull', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Drivers' })).toBeInTheDocument()
    expect(screen.getByText('Milton Keynes, UK')).toBeInTheDocument()
  })
})
