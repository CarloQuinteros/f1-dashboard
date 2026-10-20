import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FallbackImage } from './FallbackImage'

describe('FallbackImage', () => {
  it('shows the placeholder when no src is given', () => {
    render(<FallbackImage alt="Max Verstappen" label="VER" />)

    expect(screen.getByRole('img', { name: 'Max Verstappen' })).toHaveTextContent('VER')
    expect(screen.queryByRole('img', { name: 'Max Verstappen' })).not.toHaveAttribute('src')
  })

  it('shows the image when src loads', () => {
    render(<FallbackImage src="/photos/verstappen.png" alt="Max Verstappen" label="VER" />)

    expect(screen.getByRole('img', { name: 'Max Verstappen' })).toHaveAttribute('src', '/photos/verstappen.png')
  })

  it('switches to the placeholder when the image fails to load', () => {
    render(<FallbackImage src="/photos/missing.png" alt="Max Verstappen" label="VER" />)

    fireEvent.error(screen.getByRole('img', { name: 'Max Verstappen' }))

    expect(screen.getByRole('img', { name: 'Max Verstappen' })).toHaveTextContent('VER')
    expect(screen.getByRole('img', { name: 'Max Verstappen' })).not.toHaveAttribute('src')
  })
})
