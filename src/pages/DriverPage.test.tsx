import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import standingsFixture from '../api/fixtures/current-driverstandings.json'
import winsFixture from '../api/fixtures/verstappen-wins.json'
import { mockApi, renderApp } from '../test/renderApp'

const LONG = 10_000

describe('DriverPage static details', () => {
  it('shows the profile without waiting for the API', () => {
    mockApi('pending', 'pending')
    renderApp('/drivers/max_verstappen')

    expect(screen.getByRole('heading', { name: 'Max Verstappen' })).toBeInTheDocument()
    expect(screen.getByText('#3 · VER')).toBeInTheDocument()
    expect(screen.getByText('Dutch')).toBeInTheDocument()
    expect(screen.getByText('30 September 1997')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Red Bull' })).toHaveAttribute('href', '/teams/red_bull')
  })

  it('shows a not-found message for an unknown driver', () => {
    mockApi('pending', 'pending')
    renderApp('/drivers/nobody')

    expect(screen.getByRole('heading', { name: 'Driver not found' })).toBeInTheDocument()
  })

  it('opens the team page when the team name is clicked', () => {
    mockApi('pending', 'pending')
    renderApp('/drivers/max_verstappen')

    fireEvent.click(screen.getByRole('link', { name: 'Red Bull' }))

    expect(screen.getByRole('heading', { name: 'Red Bull', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Milton Keynes, UK')).toBeInTheDocument()
  })
})

describe('DriverPage live stats', () => {
  it('shows a loading state while the requests are in flight', () => {
    mockApi('pending', 'pending')
    renderApp('/drivers/max_verstappen')

    expect(screen.getByText('Career race wins').parentElement).toHaveTextContent('Loading…')
  })

  it('shows career race wins from the API', async () => {
    mockApi({ body: winsFixture }, { body: standingsFixture })
    renderApp('/drivers/max_verstappen')

    await waitFor(() =>
      expect(screen.getByText('Career race wins').parentElement).toHaveTextContent('73'),
    )
  })

  it('shows zero wins as 0 rather than a missing value', async () => {
    mockApi({ body: { MRData: { total: '0' } } }, { body: standingsFixture })
    renderApp('/drivers/max_verstappen')

    await waitFor(() =>
      expect(screen.getByText('Career race wins').parentElement).toHaveTextContent(/^Career race wins0$/),
    )
  })

  it('shows the current season position and points', async () => {
    mockApi({ body: winsFixture }, { body: standingsFixture })
    renderApp('/drivers/antonelli')

    await waitFor(() =>
      expect(screen.getByText('Current season').parentElement).toHaveTextContent('P1 · 340 pts'),
    )
  })

  it('says so when the driver has no standing yet', async () => {
    mockApi({ body: winsFixture }, { body: standingsFixture })
    renderApp('/drivers/bottas')

    await waitFor(() =>
      expect(screen.getByText('Current season').parentElement).toHaveTextContent('No standing yet'),
    )
  })

  it(
    'shows unavailable when the API fails, and keeps the static details',
    async () => {
      mockApi('network-error', 'network-error')
      renderApp('/drivers/max_verstappen')

      await waitFor(
        () => expect(screen.getByText('Career race wins').parentElement).toHaveTextContent('Unavailable'),
        { timeout: 6000 },
      )
      expect(screen.getByRole('heading', { name: 'Max Verstappen' })).toBeInTheDocument()
      expect(within(screen.getByRole('region', { name: 'Live stats' })).getAllByText('Unavailable')).toHaveLength(2)
    },
    LONG,
  )
})
