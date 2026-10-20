import { describe, expect, it } from 'vitest'
import { drivers } from './drivers'
import { teams } from './teams'

describe('bundled roster', () => {
  it('contains the 22 current race drivers', () => {
    expect(drivers).toHaveLength(22)
  })

  it('contains the 11 teams on the 2026 grid', () => {
    expect(teams).toHaveLength(11)
  })

  it('has unique driver ids and numbers', () => {
    expect(new Set(drivers.map((d) => d.id)).size).toBe(drivers.length)
    expect(new Set(drivers.map((d) => d.number)).size).toBe(drivers.length)
  })

  it('has unique team ids', () => {
    expect(new Set(teams.map((t) => t.id)).size).toBe(teams.length)
  })

  it('uses the Jolpica driver ids for the ids that were checked', () => {
    const ids = drivers.map((d) => d.id)
    expect(ids).toContain('max_verstappen')
    expect(ids).toContain('leclerc')
    expect(ids).toContain('hulkenberg')
  })
})
