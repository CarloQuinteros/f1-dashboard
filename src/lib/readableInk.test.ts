import { describe, expect, it } from 'vitest'
import { teams } from '../data/teams'
import { contrastRatio, readableInk } from './readableInk'

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1)
  })
})

describe('readableInk', () => {
  it('picks asphalt text on a light fill and white on a dark one', () => {
    expect(readableInk('#ffffff')).toBe('#15151e')
    expect(readableInk('#000000')).toBe('#ffffff')
  })

  it.each(teams.map((t) => [t.name, t.color]))('gives %s at least 4.5:1 contrast', (_name, color) => {
    const ink = readableInk(color)

    expect(contrastRatio(color, ink)).toBeGreaterThanOrEqual(4.5)
  })
})
