import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockApi, renderApp } from './test/renderApp'

function header() {
  return screen.getByRole('link', { name: 'F1 Dashboard' })
}

describe('app shell', () => {
  it('shows the header and main navigation on every page', () => {
    mockApi('pending', 'pending')
    renderApp('/')

    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'Drivers' })).toHaveAttribute('href', '/')
    expect(within(nav).getByRole('link', { name: 'Teams' })).toHaveAttribute('href', '/#teams')
    expect(header()).toHaveAttribute('href', '/')
  })
})

describe('routes', () => {
  it('renders the driver directory at /', () => {
    mockApi('pending', 'pending')
    renderApp('/')

    expect(screen.getByRole('searchbox', { name: 'Search drivers' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Teams' })).toBeInTheDocument()
  })

  it('renders a driver profile at /drivers/:driverId', () => {
    mockApi('pending', 'pending')
    renderApp('/drivers/max_verstappen')

    expect(screen.getByRole('heading', { name: 'Max Verstappen', level: 1 })).toBeInTheDocument()
    expect(header()).toBeInTheDocument()
  })

  it('renders a team page at /teams/:teamId', () => {
    mockApi('pending', 'pending')
    renderApp('/teams/red_bull')

    expect(screen.getByRole('heading', { name: 'Red Bull', level: 1 })).toBeInTheDocument()
    expect(header()).toBeInTheDocument()
  })

  it('shows the catch-all page with the header for an unknown path', () => {
    mockApi('pending', 'pending')
    renderApp('/does-not-exist')

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(header()).toBeInTheDocument()
  })
})
