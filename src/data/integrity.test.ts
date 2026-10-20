import { describe, expect, it } from 'vitest'
import { drivers } from './drivers'
import { teams } from './teams'

const teamIds = new Set(teams.map((t) => t.id))

describe('roster integrity', () => {
  it('every driver references an existing team', () => {
    const orphans = drivers.filter((d) => !teamIds.has(d.teamId)).map((d) => d.id)

    expect(orphans).toEqual([])
  })

  it('every driver has a Jolpica driverId', () => {
    const missing = drivers.filter((d) => !/^[a-z0-9_]+$/.test(d.id)).map((d) => d.id)

    expect(missing).toEqual([])
  })

  it('every team has a Jolpica constructorId', () => {
    const missing = teams.filter((t) => !/^[a-z0-9_]+$/.test(t.id)).map((t) => t.id)

    expect(missing).toEqual([])
  })
})
