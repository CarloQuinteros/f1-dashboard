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

  it('every photo is an https URL', () => {
    const insecure = drivers.filter((d) => d.photo && !d.photo.startsWith('https://')).map((d) => d.id)

    expect(insecure).toEqual([])
  })

  it('every photo requests the 4col size, so it stays sharp at card size', () => {
    const wrongSize = drivers.filter((d) => d.photo && !d.photo.includes('/4col/image.png')).map((d) => d.id)

    expect(wrongSize).toEqual([])
  })

  it('only the driver with no headshot in the OpenF1 feed is missing a photo', () => {
    const withoutPhoto = drivers.filter((d) => !d.photo).map((d) => d.id)

    expect(withoutPhoto).toEqual(['arvid_lindblad'])
  })
})
