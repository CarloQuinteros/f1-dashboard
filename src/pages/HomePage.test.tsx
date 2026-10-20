import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { teams } from '../data/teams'
import { mockApi, renderApp } from '../test/renderApp'

describe('HomePage team list', () => {
  it('links to every team from the home page', () => {
    mockApi('pending', 'pending')
    renderApp('/')

    const nav = screen.getByRole('navigation', { name: 'Teams' })
    const links = within(nav).getAllByRole('link')

    expect(links).toHaveLength(teams.length)
    expect(links).toHaveLength(11)
    expect(within(nav).getByRole('link', { name: 'Audi' })).toHaveAttribute('href', '/teams/audi')
  })

  it('opens a team page without opening a driver first', () => {
    mockApi('pending', 'pending')
    renderApp('/')

    fireEvent.click(within(screen.getByRole('navigation', { name: 'Teams' })).getByRole('link', { name: 'Audi' }))

    expect(screen.getByRole('heading', { name: 'Audi', level: 1 })).toBeInTheDocument()
  })
})
